/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  KuramaSerp — Google Ads SERP Scraper                                      ║
 * ║                                                                            ║
 * ║  Built by Kuda Chinhara | Agentic PPC Ads                                  ║
 * ║  https://agenticppcads.com                                                 ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 *
 * Why this exists:
 *   SERP APIs (SerpAPI, ValueSERP, DataForSEO, etc.) can scrape ads — but
 *   ad scraping is typically a premium feature. ValueSERP charges 4 credits
 *   per scrape instead of 1 when ads are included. On free or basic tiers,
 *   ad results are limited or unavailable entirely.
 *   KuramaSerp uses a real Chromium browser on your machine — zero per-scrape
 *   cost, and you see exactly what a real searcher sees, including all paid ads.
 *
 * Features:
 *   - Real browser scraping via Playwright (not API-based)
 *   - Persistent Chrome profile to avoid CAPTCHAs
 *   - UULE geo-targeting using Google's 228K+ canonical locations
 *   - Multi-market support (US, UK, AU, CA — extensible)
 *   - Extracts: titles, descriptions, domains, positions, sitelinks
 *   - Outputs: raw JSON, structured data, markdown summary with messaging patterns
 *
 * Usage:
 *   node scrape-ads-playwright.cjs <client-name> [options]
 *
 * Options:
 *   --keywords "kw1,kw2"                  Override preset keywords
 *   --location "City,State,Country"       Set geo (overrides preset)
 *   --project <project_id>               Load keywords + location from projects_list.json
 *   --root <path>                        Project root for output (default: cwd)
 *   --dry-run                            Show config without launching browser
 *
 * Examples:
 *   node scrape-ads-playwright.cjs acme-corp --keywords "plumber near me" --location "London,England,United Kingdom"
 *   node scrape-ads-playwright.cjs acme-corp --project proj_abc123
 *   node scrape-ads-playwright.cjs acme-corp --dry-run
 *
 * Geo is resolved from: --location flag > --project > preset > default (UK)
 *
 * Requirements:
 *   - Node.js 18+
 *   - Playwright (`npm install playwright`)
 */

const fs = require('fs');
const path = require('path');

// ROOT = project root for outputs and config
// Priority: --root flag > current working directory
const ROOT = (() => {
  const idx = process.argv.indexOf('--root');
  return (idx !== -1 && process.argv[idx + 1]) ? path.resolve(process.argv[idx + 1]) : process.cwd();
})();

// ── Geo Profiles ────────────────────────────────────────────────────────────

const COUNTRY_PROFILES = {
  'United Kingdom': { domain: 'google.co.uk', gl: 'uk', locale: 'en-GB', timezoneId: 'Europe/London' },
  'United States': { domain: 'google.com', gl: 'us', locale: 'en-US', timezoneId: 'America/New_York' },
  'Australia':     { domain: 'google.com.au', gl: 'au', locale: 'en-AU', timezoneId: 'Australia/Sydney' },
  'Canada':        { domain: 'google.ca', gl: 'ca', locale: 'en-CA', timezoneId: 'America/Toronto' },
};

// US state → timezone (covers states from projects_list.json)
const US_TIMEZONES = {
  'California': 'America/Los_Angeles', 'Oregon': 'America/Los_Angeles',
  'New York': 'America/New_York', 'Florida': 'America/New_York',
  'North Carolina': 'America/New_York', 'Ohio': 'America/New_York',
  'Pennsylvania': 'America/New_York', 'Maryland': 'America/New_York',
  'Texas': 'America/Chicago',
};

// UK region → timezone (all the same, but keeps the pattern extensible)
const UK_TIMEZONES = {
  'England': 'Europe/London', 'Scotland': 'Europe/London', 'Wales': 'Europe/London',
};

// Common locations in Google canonical format — used as quick-select presets
const COMMON_LOCATIONS = [
  // UK
  'London,England,United Kingdom',
  'Manchester,England,United Kingdom',
  'Birmingham,England,United Kingdom',
  'Edinburgh,Scotland,United Kingdom',
  // US
  'New York,New York,United States',
  'Los Angeles,California,United States',
  'Chicago,Illinois,United States',
  'Houston,Texas,United States',
  // AU
  'Sydney,New South Wales,Australia',
  'Melbourne,Victoria,Australia',
  // CA
  'Toronto,Ontario,Canada',
  'Vancouver,British Columbia,Canada',
];

/**
 * Encode a Google canonical location name into a UULE parameter.
 * UULE tells Google to serve results as if searching from that exact location.
 * Format: w+CAIQICI + base64url_char(length) + canonical_name
 *
 * The canonical names come from Google's geo targets list (228K locations).
 * Same format used in projects_list.json (e.g., "Raleigh,North Carolina,United States").
 */
function encodeUULE(canonicalName) {
  const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  const lengthChar = B64[canonicalName.length] || B64[B64.length - 1];
  return 'w+CAIQICI' + lengthChar + canonicalName;
}

/**
 * Parse a location string like "Raleigh,North Carolina,United States" into geo config.
 * Returns { domain, gl, locale, timezoneId, uule, locationStr } or null if unparseable.
 *
 * Location strings should match Google's canonical names from the geo targets list.
 */
function resolveGeo(locationStr) {
  if (!locationStr) return null;

  const parts = locationStr.split(',').map(s => s.trim());
  // Expected: "City,State/Region,Country" or "State,Country" or "Country"
  const country = parts[parts.length - 1];
  const stateOrRegion = parts.length >= 2 ? parts[parts.length - 2] : null;

  const profile = COUNTRY_PROFILES[country];
  if (!profile) return null;

  const geo = { ...profile };

  // Refine timezone for US states
  if (country === 'United States' && stateOrRegion && US_TIMEZONES[stateOrRegion]) {
    geo.timezoneId = US_TIMEZONES[stateOrRegion];
  }

  // Generate UULE for precise geo-targeting (uses Google's canonical name format)
  geo.uule = encodeUULE(locationStr);
  geo.locationStr = locationStr;
  return geo;
}

// ── Client Presets ──────────────────────────────────────────────────────────

const KEYWORD_PRESETS = {
  // Add your client presets here:
  // 'client-name': {
  //   keywords: ['keyword 1', 'keyword 2', 'keyword 3 london'],
  //   location: 'London,England,United Kingdom',
  // },
};

// ── Arg parsing ─────────────────────────────────────────────────────────────

function parseArgs(args) {
  const parsed = { client: null, keywords: null, location: null, project: null, proxy: null, dryRun: false };
  let i = 0;
  while (i < args.length) {
    if (args[i] === '--keywords') {
      parsed.keywords = args[++i].split(',').map(k => k.trim());
    } else if (args[i] === '--location') {
      parsed.location = args[++i];
    } else if (args[i] === '--project') {
      parsed.project = args[++i];
    } else if (args[i] === '--proxy') {
      parsed.proxy = args[++i];
    } else if (args[i] === '--root') {
      i++; // skip value — already handled at module level
    } else if (args[i] === '--dry-run') {
      parsed.dryRun = true;
    } else if (!args[i].startsWith('--')) {
      parsed.client = args[i];
    }
    i++;
  }
  return parsed;
}

/**
 * Load a project from projects_list.json by ID.
 * Returns { keywords, location } or null.
 */
function loadProject(projectId) {
  const projectsPath = path.join(ROOT, 'projects_list.json');
  if (!fs.existsSync(projectsPath)) return null;
  const data = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
  return data.projects.find(p => p.id === projectId) || null;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── Ad extraction ───────────────────────────────────────────────────────────

async function extractAds(page, keyword) {
  const now = new Date().toISOString();

  // Google Ads extraction — Feb 2026 structure:
  //   Each ad lives in a [data-text-ad] element.
  //   Titles are in div[role="heading"] (NOT h3 — Google changed this).
  //   Links use <a> with data-pcu (destination) and data-rw (click tracking).
  //   We find all [data-text-ad] elements and extract structured data from each.
  const ads = await page.evaluate(() => {
    const results = [];
    const seenTitles = new Set();
    const skipLabels = ['', 'ads', 'sponsored', 'sponsored results',
      'sponsored result', 'hide sponsored results', 'hide sponsored result'];

    const adElements = document.querySelectorAll('[data-text-ad]');

    adElements.forEach((adEl, idx) => {
      // ── Title: div[role="heading"] or h3 (fallback for older layouts) ──
      const headingEl = adEl.querySelector('[role="heading"], h3');
      if (!headingEl) return;
      const title = headingEl.textContent.trim();
      if (skipLabels.includes(title.toLowerCase()) || seenTitles.has(title)) return;
      seenTitles.add(title);

      // ── Position: top vs bottom ──
      // Check if this ad is inside #tads (top) or #bottomads (bottom)
      let blockPos = 'top';
      if (adEl.closest('#bottomads')) {
        blockPos = 'bottom';
      } else if (!adEl.closest('#tads')) {
        // Fallback: use vertical position on page
        blockPos = adEl.getBoundingClientRect().top > 600 ? 'bottom' : 'top';
      }

      // ── Link: <a> with data-pcu or data-rw (Google's ad link attributes) ──
      let link = '';
      const adLink = adEl.querySelector('a[data-pcu]') || adEl.querySelector('a[data-rw]') ||
                     headingEl.closest('a[href]') || adEl.querySelector('a[href*="aclk"]') ||
                     adEl.querySelector('a[href^="http"]');
      if (adLink) {
        // data-pcu = clean destination URL, href = may be clean or tracking
        link = adLink.getAttribute('data-pcu') || adLink.href;
      }

      // ── Displayed link: the visible URL shown in the ad ──
      let displayedLink = '';
      // Google shows the URL in spans near the heading, often with cite elements
      const citeEl = adEl.querySelector('cite');
      if (citeEl) {
        displayedLink = citeEl.textContent.trim();
      } else {
        // Fallback: find span containing a URL-like string
        adEl.querySelectorAll('span').forEach(s => {
          if (displayedLink) return;
          const t = s.textContent.trim();
          if ((t.startsWith('https://') || t.startsWith('http://') || t.startsWith('www.')) &&
              t.length < 120 && !t.includes(' ')) {
            displayedLink = t;
          }
        });
      }

      // ── Description: longest text block that isn't the title or URL ──
      let description = '';
      const descCandidates = [];
      adEl.querySelectorAll('div, span').forEach(n => {
        const t = n.textContent.trim();
        if (t.length > 40 && t !== title && !t.startsWith('http') &&
            !t.includes('Why this ad') && !t.includes('Hide sponsored') &&
            !n.closest('[role="heading"]') && !n.querySelector('[role="heading"]')) {
          descCandidates.push(t);
        }
      });
      if (descCandidates.length > 0) {
        // Prefer medium-length candidates (pure description, not parent container text)
        // Sort by length descending, then pick the first one under 500 chars
        // (very long ones are usually parent containers that include everything)
        descCandidates.sort((a, b) => b.length - a.length);
        description = descCandidates.find(d => d.length < 500) || descCandidates[0];
      }

      // ── Sitelinks: list items or link groups within the ad ──
      const sitelinks = [];
      // Look for sitelink containers (usually a grid/list of links below the ad)
      const sitelinkContainer = adEl.querySelector('ul, [role="list"]');
      if (sitelinkContainer) {
        sitelinkContainer.querySelectorAll('li, a').forEach(el => {
          const text = el.textContent.trim();
          if (text && text.length < 60 && text !== title) {
            const slLink = el.tagName === 'A' ? el.href : (el.querySelector('a')?.href || '');
            sitelinks.push({ title: text, link: slLink });
          }
        });
      }
      // Fallback: look for sitelink-like groups (multiple short links)
      if (sitelinks.length === 0) {
        const allLinks = adEl.querySelectorAll('a[href]');
        allLinks.forEach(a => {
          const text = a.textContent.trim();
          // Sitelinks: short text, not the main title, not the displayed URL
          if (text && text.length > 3 && text.length < 50 &&
              text !== title && !text.startsWith('http') && a !== adLink) {
            sitelinks.push({ title: text, link: a.href });
          }
        });
      }

      // ── Extensions: callout/structured snippets text ──
      const extensions = [];
      // Extensions often appear as short inline text segments
      adEl.querySelectorAll('[role="listitem"], .YhemCb').forEach(ext => {
        const t = ext.textContent.trim();
        if (t && t.length < 80 && t !== title) extensions.push(t);
      });

      results.push({
        title,
        link,
        displayed_link: displayedLink,
        description,
        sitelinks,
        extensions,
        position: idx + 1,
        block_position: blockPos,
      });
    });

    return results;
  });

  // Normalize into our standard format
  return ads.map(ad => {
    let domain = '';
    try { domain = new URL(ad.link).hostname; } catch {}
    return {
      keyword,
      position: ad.position,
      block_position: ad.block_position,
      relative_block_position: ad.block_position,
      title: ad.title,
      link: ad.link,
      domain,
      displayed_link: ad.displayed_link,
      description: ad.description,
      sitelinks: ad.sitelinks,
      extensions: ad.extensions,
      scraped_at: now,
      source: 'playwright',
    };
  });
}

// ── Transform + Summary ─────────────────────────────────────────────────────

function buildTransformedData(allAds) {
  const competitors = {};
  const keywords = {};

  allAds.forEach(ad => {
    if (!competitors[ad.domain]) competitors[ad.domain] = [];
    competitors[ad.domain].push(ad);
    if (!keywords[ad.keyword]) keywords[ad.keyword] = [];
    keywords[ad.keyword].push(ad);
  });

  const stats = {};
  for (const [domain, domainAds] of Object.entries(competitors)) {
    const positions = domainAds.map(a => a.position);
    stats[domain] = {
      total_ads: domainAds.length,
      keywords_targeted: new Set(domainAds.map(a => a.keyword)).size,
      avg_position: Math.round((positions.reduce((a, b) => a + b, 0) / positions.length) * 10) / 10,
      titles: domainAds.map(a => a.title),
      descriptions: domainAds.map(a => a.description).filter(Boolean),
    };
  }

  return {
    metadata: {
      generated_at: new Date().toISOString(),
      source: 'playwright',
      total_ads: allAds.length,
      unique_domains: Object.keys(competitors).length,
      unique_keywords: Object.keys(keywords).length,
    },
    competitors,
    keywords,
    statistics: {
      total_ads: allAds.length,
      unique_domains: Object.keys(competitors).length,
      unique_keywords: Object.keys(keywords).length,
      competitors: stats,
    },
  };
}

function buildSummary(transformed, clientName, keywordList, geoInfo) {
  const { metadata, statistics } = transformed;
  const date = metadata.generated_at.split('T')[0];

  let md = `# ${clientName} — Google Ads Scrape (KuramaSerp)\n\n`;
  md += `**Date:** ${date}\n`;
  md += `**Source:** KuramaSerp (Playwright, ${geoInfo.domain})\n`;
  md += `**Location:** ${geoInfo.locationStr || 'default'}\n`;
  md += `**Keywords:** ${keywordList.join(', ')}\n\n`;
  md += `---\n\n`;
  md += `## Summary\n\n`;
  md += `| Metric | Value |\n|---|---|\n`;
  md += `| Total ads scraped | ${metadata.total_ads} |\n`;
  md += `| Unique competitors | ${metadata.unique_domains} |\n`;
  md += `| Keywords scraped | ${metadata.unique_keywords} |\n\n`;

  md += `## Competitors by Presence\n\n`;
  md += `| Domain | Ads | Keywords | Avg Position |\n|---|---|---|---|\n`;

  const sorted = Object.entries(statistics.competitors)
    .sort((a, b) => b[1].total_ads - a[1].total_ads);

  for (const [domain, s] of sorted) {
    md += `| ${domain} | ${s.total_ads} | ${s.keywords_targeted} | ${s.avg_position} |\n`;
  }

  md += `\n## Ads by Keyword\n\n`;

  for (const [kw, kwAds] of Object.entries(transformed.keywords)) {
    md += `### "${kw}" (${kwAds.length} ads)\n\n`;
    for (const ad of kwAds) {
      md += `**${ad.position}. ${ad.domain}**\n`;
      md += `> **${ad.title}**\n`;
      md += `> ${ad.description}\n`;
      if (ad.extensions.length > 0) {
        md += `> Extensions: ${ad.extensions.join(' | ')}\n`;
      }
      if (ad.sitelinks.length > 0) {
        md += `> Sitelinks: ${ad.sitelinks.map(s => s.title).join(' | ')}\n`;
      }
      md += `\n`;
    }
  }

  // Messaging patterns
  md += `## Messaging Patterns\n\n`;
  md += `| Pattern | Examples | Who |\n|---|---|---|\n`;

  const allText = [];
  for (const [domain, s] of sorted) {
    s.titles.forEach(t => allText.push({ domain, text: t }));
    s.descriptions.forEach(d => allText.push({ domain, text: d }));
  }

  const patterns = [
    { name: 'Pricing/cost', regex: /£|\$|\bfrom\b.*\d|price|cost|free/i },
    { name: 'Urgency/speed', regex: /urgent|emergency|immediate|24.?h|today|quick|fast/i },
    { name: 'Social proof', regex: /\d+\+?\s*(carer|year|review|client|star|rated|award|trust)/i },
    { name: 'CQC/regulation', regex: /cqc|regulat|registered|inspected|verified/i },
    { name: 'Local/geographic', regex: /\blocal\b|near me|\bnearby\b/i },
  ];

  for (const p of patterns) {
    const matches = allText.filter(t => p.regex.test(t.text));
    if (matches.length > 0) {
      const examples = matches.slice(0, 2).map(a => `"${a.text.slice(0, 60)}"`).join(', ');
      const who = [...new Set(matches.map(a => a.domain))].join(', ');
      md += `| ${p.name} | ${examples} | ${who} |\n`;
    }
  }

  md += `\n---\n\n`;
  md += `*Generated by KuramaSerp — https://agenticppcads.com*\n`;

  return md;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.client) {
    console.error('Usage: node scrape-ads-playwright.cjs <client-name> [options]');
    console.error('\nOptions:');
    console.error('  --keywords "kw1,kw2"                  Override keywords');
    console.error('  --location "City,State,Country"       Set geo target');
    console.error('  --project <project_id>               Load from projects_list.json');
    console.error('  --proxy <url>                        Route through proxy (e.g. socks5://host:port)');
    console.error('  --root <path>                        Project root (default: cwd)');
    console.error('  --dry-run                            Preview without browser');
    console.error('\nPresets:', Object.keys(KEYWORD_PRESETS).join(', ') || '(none)');
    process.exit(1);
  }

  // Resolve keywords and location from: CLI flags > project > preset
  const preset = KEYWORD_PRESETS[args.client] || {};
  let keywords = args.keywords;
  let locationStr = args.location;

  // Load from project if specified
  if (args.project) {
    const project = loadProject(args.project);
    if (!project) {
      console.error(`Project "${args.project}" not found in projects_list.json`);
      process.exit(1);
    }
    if (!keywords) keywords = project.keywords;
    if (!locationStr) locationStr = project.location;
    console.log(`   Loaded project: ${project.name}`);
  }

  // Fall back to preset
  if (!keywords) keywords = preset.keywords;
  if (!locationStr) locationStr = preset.location;

  if (!keywords || keywords.length === 0) {
    console.error(`No keywords — pass --keywords "kw1,kw2", --project <id>, or add a preset for "${args.client}"`);
    process.exit(1);
  }

  // Resolve geo from location string
  const geo = resolveGeo(locationStr) || COUNTRY_PROFILES['United Kingdom'];
  const domain = geo.domain;

  console.log(`\n🔍 KuramaSerp — Google Ads Scraper`);
  console.log(`   Client:   ${args.client}`);
  console.log(`   Keywords: ${keywords.join(', ')}`);
  console.log(`   Location: ${locationStr || 'default (UK)'}`);
  console.log(`   Domain:   ${domain}`);
  console.log(`   Locale:   ${geo.locale} | TZ: ${geo.timezoneId} | gl=${geo.gl}`);
  if (geo.uule) console.log(`   UULE:     ${geo.uule.slice(0, 30)}...`);
  console.log(`   Proxy:    ${args.proxy || 'none (using direct IP)'}`);
  console.log(`   Root:     ${ROOT}`);
  console.log(`   Searches: ${keywords.length}\n`);

  if (args.dryRun) {
    console.log('🏁 Dry run — no browser launched.');
    return;
  }

  const { chromium } = require('playwright');

  // Use persistent Chrome profile so Google trusts us (no CAPTCHA)
  const profileDir = path.join(ROOT, '.playwright-profile');
  const launchOptions = {
    headless: false,
    locale: geo.locale,
    timezoneId: geo.timezoneId,
    args: ['--disable-blink-features=AutomationControlled'],
  };

  // Proxy support — route browser traffic through a proxy server
  // so Google sees the proxy's IP (e.g. UK) instead of your real IP.
  // This is critical for ad serving: Google Ads targets by physical IP,
  // and UULE alone won't override it for "People IN this location" targeting.
  //
  // Formats:  --proxy "socks5://host:port"
  //           --proxy "http://host:port"
  //           --proxy "http://user:pass@host:port"
  if (args.proxy) {
    const proxyConfig = { server: args.proxy };
    // Extract credentials if embedded in URL (user:pass@host)
    try {
      const parsed = new URL(args.proxy);
      if (parsed.username) {
        proxyConfig.server = `${parsed.protocol}//${parsed.host}`;
        proxyConfig.username = decodeURIComponent(parsed.username);
        proxyConfig.password = decodeURIComponent(parsed.password);
      }
    } catch {
      // Not a parseable URL — pass server string as-is to Playwright
    }
    launchOptions.proxy = proxyConfig;
    console.log(`   🔒 Proxy configured: ${proxyConfig.server}${proxyConfig.username ? ' (with auth)' : ''}`);
  }

  const context = await chromium.launchPersistentContext(profileDir, launchOptions);

  const page = context.pages()[0] || await context.newPage();

  const allAds = [];
  const errors = [];

  try {
    // Navigate to Google and handle cookie consent
    console.log('   Launching browser...');
    await page.goto(`https://${domain}`, { waitUntil: 'domcontentloaded' });

    // Accept cookies if dialog appears
    try {
      const acceptBtn = page.locator('button:has-text("Accept all"), button:has-text("Accept")').first();
      await acceptBtn.click({ timeout: 3000 });
      console.log('   Cookie consent accepted');
      await sleep(1000);
    } catch {
      // No cookie dialog, continue
    }

    for (let i = 0; i < keywords.length; i++) {
      const kw = keywords[i];
      process.stdout.write(`   [${i + 1}/${keywords.length}] "${kw}" ... `);

      try {
        // Build search URL with geo params
        // UULE = Google's canonical location encoding for precise geo-targeting
        let searchUrl = `https://${domain}/search?q=${encodeURIComponent(kw)}&gl=${geo.gl}&hl=en`;
        if (geo.uule) searchUrl += `&uule=${encodeURIComponent(geo.uule)}`;

        await page.goto(searchUrl, {
          waitUntil: 'domcontentloaded',
          timeout: 20000,
        });

        // Wait for results — use multiple fallback selectors
        await page.waitForSelector('main, #search, #rso, #center_col, h1', { timeout: 15000 });
        await sleep(2000); // Let ads render fully

        const ads = await extractAds(page, kw);
        allAds.push(...ads);
        console.log(`${ads.length} ads found`);

        // Debug: save screenshot and log page structure when no ads found
        if (ads.length === 0) {
          const debugDir = path.join(ROOT, 'clients', args.client, 'ads', 'debug');
          fs.mkdirSync(debugDir, { recursive: true });
          const safeName = kw.replace(/[^a-z0-9]/gi, '_').slice(0, 50);
          await page.screenshot({
            path: path.join(debugDir, `${safeName}.png`),
            fullPage: false,
          });

          // Also take full-page screenshot to catch ads below fold
          await page.screenshot({
            path: path.join(debugDir, `${safeName}_full.png`),
            fullPage: true,
          });

          const pageInfo = await page.evaluate(() => {
            const regions = document.querySelectorAll('[role="region"]');
            const regionList = [];
            regions.forEach(r => {
              const h = r.querySelector('h1, h2');
              regionList.push(h ? h.textContent.trim() : '(no heading)');
            });

            // Deep inspect #tads and #bottomads
            const tads = document.querySelector('#tads');
            const bads = document.querySelector('#bottomads');
            const tadsInfo = tads ? {
              childCount: tads.children.length,
              innerHTML: tads.innerHTML.slice(0, 800),
              innerText: tads.innerText.slice(0, 400),
              h3Count: tads.querySelectorAll('h3').length,
              linkCount: tads.querySelectorAll('a').length,
              divCount: tads.querySelectorAll('div').length,
            } : null;
            const badsInfo = bads ? {
              childCount: bads.children.length,
              innerHTML: bads.innerHTML.slice(0, 800),
              innerText: bads.innerText.slice(0, 400),
              h3Count: bads.querySelectorAll('h3').length,
            } : null;

            // Dump first [data-text-ad] element
            const firstAd = document.querySelector('[data-text-ad]');
            const firstAdHtml = firstAd ? firstAd.outerHTML.slice(0, 2000) : null;

            // Look for any "Sponsored" or "Ad" labels anywhere
            const allText = document.body?.innerText || '';
            const sponsoredIdx = allText.toLowerCase().indexOf('sponsored');
            const adLabelIdx = allText.match(/\bAd\b·|\bAd\b •/);

            return {
              firstAdHtml,
              title: document.title,
              url: location.href,
              regions: regionList,
              hasTads: !!tads,
              hasBottomAds: !!bads,
              hasDataTextAd: document.querySelectorAll('[data-text-ad]').length,
              hasSponsored: sponsoredIdx !== -1,
              sponsoredContext: sponsoredIdx !== -1 ? allText.slice(Math.max(0, sponsoredIdx - 20), sponsoredIdx + 60) : null,
              adLabel: adLabelIdx ? adLabelIdx[0] : null,
              tadsInfo,
              badsInfo,
            };
          });
          console.log(`      ↳ DEBUG: "${pageInfo.title}"`);
          console.log(`        regions: [${pageInfo.regions.join(', ')}]`);
          console.log(`        #tads: ${pageInfo.hasTads} | #bottomads: ${pageInfo.hasBottomAds} | [data-text-ad]: ${pageInfo.hasDataTextAd}`);
          console.log(`        "Sponsored" found: ${pageInfo.hasSponsored}${pageInfo.sponsoredContext ? ' → "' + pageInfo.sponsoredContext + '"' : ''}`);
          console.log(`        "Ad" label: ${pageInfo.adLabel || 'none'}`);
          if (pageInfo.tadsInfo) {
            console.log(`        #tads content: ${pageInfo.tadsInfo.childCount} children, ${pageInfo.tadsInfo.h3Count} h3s, ${pageInfo.tadsInfo.linkCount} links, ${pageInfo.tadsInfo.divCount} divs`);
            console.log(`        #tads text: "${pageInfo.tadsInfo.innerText.slice(0, 200)}"`);
            if (pageInfo.tadsInfo.h3Count === 0) console.log(`        #tads HTML (first 500): ${pageInfo.tadsInfo.innerHTML.slice(0, 500)}`);
          }
          if (pageInfo.badsInfo) {
            console.log(`        #bottomads: ${pageInfo.badsInfo.childCount} children, ${pageInfo.badsInfo.h3Count} h3s`);
            console.log(`        #bottomads text: "${pageInfo.badsInfo.innerText.slice(0, 200)}"`);
          }
          // Dump first [data-text-ad] element HTML for structure analysis
          if (pageInfo.firstAdHtml) {
            console.log(`        ── first [data-text-ad] HTML (${pageInfo.firstAdHtml.length} chars) ──`);
            console.log(pageInfo.firstAdHtml);
            console.log(`        ── end ──`);
          }
          console.log(`        screenshots: debug/${safeName}.png + debug/${safeName}_full.png`);
        }

        // Respectful delay between searches
        if (i < keywords.length - 1) await sleep(3000 + Math.random() * 2000);
      } catch (err) {
        console.log(`ERROR: ${err.message}`);
        errors.push({ keyword: kw, error: err.message });
      }
    }
  } finally {
    await context.close();
    console.log('   Browser closed.');
  }

  if (allAds.length === 0) {
    console.log('\n⚠️  No ads found. This could mean:');
    console.log('   - Competitors aren\'t running ads on these terms right now');
    console.log('   - Ads budgets are exhausted for today');
    console.log('   - Google detected headless browser (try running at different time)');
    console.log('\n   Files saved anyway (empty) for the record.\n');
  }

  // Build outputs
  const transformed = buildTransformedData(allAds);
  const summary = buildSummary(transformed, args.client, keywords, geo);
  const date = new Date().toISOString().split('T')[0];

  // Save files
  const adsDir = path.join(ROOT, 'clients', args.client, 'ads');
  fs.mkdirSync(adsDir, { recursive: true });

  const rawPath = path.join(adsDir, `raw_ads_${date}.json`);
  const dataPath = path.join(adsDir, `ads_data_${date}.json`);
  const summaryPath = path.join(adsDir, `ads_summary_${date}.md`);

  fs.writeFileSync(rawPath, JSON.stringify(allAds, null, 2));
  fs.writeFileSync(dataPath, JSON.stringify(transformed, null, 2));
  fs.writeFileSync(summaryPath, summary);

  console.log(`\n✅ Done — ${allAds.length} ads from ${transformed.metadata.unique_domains} competitors\n`);
  console.log(`📁 Saved to clients/${args.client}/ads/`);
  console.log(`   raw_ads_${date}.json        — raw ad data`);
  console.log(`   ads_data_${date}.json       — transformed + stats`);
  console.log(`   ads_summary_${date}.md      — readable report`);

  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} keyword(s) failed:`);
    errors.forEach(e => console.log(`   - "${e.keyword}": ${e.error}`));
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  KuramaSerp — Built by Kuda Chinhara | Agentic PPC Ads                    ║
 * ║                                                                            ║
 * ║  We build AI-powered Google Ads tools for agencies and in-house teams.     ║
 * ║  If you found this useful, let's connect:                                  ║
 * ║                                                                            ║
 * ║  Web:      https://agenticppcads.com                                       ║
 * ║  LinkedIn: https://linkedin.com/in/kudachinhara                            ║
 * ║  X:        https://x.com/kudachinhara                                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */
