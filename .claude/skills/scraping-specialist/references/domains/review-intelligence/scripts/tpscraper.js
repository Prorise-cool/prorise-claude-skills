/**
 * Trustpilot Review Scraper
 * A modern web scraper for extracting reviews from Trustpilot
 * 
 * Usage: node tpscraper.js [companyURL] [searchTerm] [pages] [proxy]
 * Example: node tpscraper.js "example.com" "shipping" 3 "http://user:pass@proxyhost:port"
 */

// Import required modules
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
let options = {
  domain: null,
  searchTerm: '',
  maxpages: 0,  // Changed from 5 to 0 (no page limit)
  maxreviews: 0,  // 0 means no limit
  proxy: null,
  screenshot: false,
  debug: false,
  useragent: 'desktop'
};

// Parse named arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  
  if (arg.startsWith('--')) {
    const option = arg.substring(2);
    
    if (option === 'help' || option === 'h') {
      displayHelp();
      process.exit(0);
    } else if (option === 'screenshot' || option === 'debug') {
      options[option] = true;
    } else if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
      options[option] = args[i + 1];
      i++;
    } else {
      options[option] = true;
    }
  } else if (!options.domain) {
    // First positional argument is domain
    options.domain = arg;
  } else if (options.domain && !isNaN(arg) && !options.maxreviews) {
    // Second numeric positional argument is now maxreviews instead of maxpages
    options.maxreviews = parseInt(arg, 10);
  }
}

// Configuration options for the scraper
const config = {
  companyURL: options.domain || 'example.com', // Default company URL if not provided
  searchTerm: options.searchTerm || '', // Optional search term to filter reviews
  outputFilePrefix: '', // Will be set dynamically based on companyURL and searchTerm
  maxPages: options.maxpages ? parseInt(options.maxpages, 10) : 0, // Changed from 5 to 0 (no page limit)
  maxReviews: options.maxreviews ? parseInt(options.maxreviews, 10) : 0, // Default to 0 (no limit)
  maxRetries: 3, // Maximum number of retries for failed requests
  randomDelay: { min: 2000, max: 5000 }, // Random delay between requests in milliseconds
  proxy: options.proxy || '', // Optional proxy server
  screenshot: options.screenshot || false,
  debug: options.debug || false,
  userAgent: options.useragent || 'desktop',
  userAgents: {
    desktop: [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/121.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15'
    ],
    mobile: [
      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (Linux; Android 10; SM-G975U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.43 Mobile Safari/537.36',
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.43 Mobile/15E148 Safari/604.1',
      'Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.43 Mobile Safari/537.36'
    ]
  }
};

// Set the output file prefix based on the company URL
// Helper logic for outputFilePrefix to sanitize company name and search term
let urlForPrefix = config.companyURL;
let hostnameForPrefix = '';

// Ensure companyURL is a string and extract hostname part
if (typeof urlForPrefix === 'string') {
    hostnameForPrefix = urlForPrefix.split('?')[0].split('/')[0]; // Get domain, remove query/path
} else {
    hostnameForPrefix = 'unknown_domain'; // Fallback if companyURL is not a string or undefined
}

const tldPatternsForFileNaming = [
    // More specific TLDs/SLDs first (e.g., .co.uk before .uk)
    /\.co\.uk$/i, /\.com\.au$/i, /\.co\.nz$/i, /\.co\.za$/i, /\.co\.jp$/i, /\.co\.il$/i,
    /\.org\.uk$/i, /\.ac\.uk$/i, /\.gov\.uk$/i,
    // Common TLDs
    /\.com$/i, /\.org$/i, /\.net$/i, /\.info$/i, /\.biz$/i,
    // Common country codes if not part of a .co.xxx or similar
    /\.uk$/i, /\.us$/i, /\.ca$/i, /\.au$/i, /\.de$/i, /\.fr$/i, /\.jp$/i, /\.nz$/i
];

let baseNameForFile = hostnameForPrefix;
for (const pattern of tldPatternsForFileNaming) {
    if (pattern.test(baseNameForFile)) {
        baseNameForFile = baseNameForFile.replace(pattern, '');
        break; // Found the most specific TLD/SLD, removed it.
    }
}

// Replace any remaining dots (e.g. in subdomains like 'my.company') with underscores
// And sanitize for any other invalid filename characters.
let sanitizedCompanyName = baseNameForFile.replace(/\./g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
if (!sanitizedCompanyName) {
    sanitizedCompanyName = "domain"; // Fallback for empty or fully sanitized away names
}

let companyPrefixPart = `trustpilot_${sanitizedCompanyName}`;
let searchTermSuffixPart = "";

// Sanitize and append search term if present
if (config.searchTerm && typeof config.searchTerm === 'string') {
    let sanitizedTerm = config.searchTerm.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
    if (sanitizedTerm) { // only add if term is non-empty after sanitization
        searchTermSuffixPart = `_${sanitizedTerm}`;
    }
}

config.outputFilePrefix = `${companyPrefixPart}${searchTermSuffixPart}`;

/**
 * Display help information
 */
function displayHelp() {
  console.log('\nTrustpilot Review Scraper - Command Line Usage:');
  console.log('------------------------------------------------');
  console.log('node tpscraper.js --domain "example.com" [options]');
  console.log('\nOptions:');
  console.log('  --domain     : Required. Company domain as it appears in Trustpilot URL (e.g., "example.com")');
  console.log('  --searchTerm : (Optional) Term to filter reviews by (e.g., "shipping", "customer service")');
  console.log('  --maxpages   : (Optional) Maximum number of pages to scrape (default: 0, no limit)');
  console.log('  --maxreviews : (Optional) Maximum number of reviews to collect (default: 0, no limit)');
  console.log('  --proxy      : (Optional) Proxy number to use (1-10) or full proxy URL');
  console.log('  --screenshot : (Optional) Take screenshots during scraping');
  console.log('  --debug      : (Optional) Enable debug mode with extra logging');
  console.log('  --useragent  : (Optional) Set user agent type: "desktop" or "mobile" (default: desktop)');
  console.log('  --help, -h   : Display this help message');
  console.log('\nExamples:');
  console.log('  node tpscraper.js --domain "example.com"');
  console.log('  node tpscraper.js --domain "example.com" --maxreviews 50');
  console.log('  node tpscraper.js "example.com" 50               (Shorthand for 50 reviews)');
  console.log('  node tpscraper.js --domain "example.com" --searchTerm "shipping" --maxpages 10');
  console.log('  node tpscraper.js --domain "example.com" --proxy 3 --screenshot --debug');
}

/**
 * Get a random number between min and max
 * @param {number} min - Minimum number
 * @param {number} max - Maximum number
 * @returns {number} - Random number between min and max
 */
function getRandomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get a random user agent from the list
 * @returns {string} - Random user agent
 */
function getRandomUserAgent() {
  const agents = config.userAgents[config.userAgent] || config.userAgents.desktop;
  return agents[Math.floor(Math.random() * agents.length)];
}

/**
 * Wait for a random amount of time
 * @returns {Promise} - Promise that resolves after a random delay
 */
async function randomWait() {
  const delay = getRandomDelay(config.randomDelay.min, config.randomDelay.max);
  console.log(`Waiting for ${delay}ms...`);
  return new Promise(resolve => setTimeout(resolve, delay));
}

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {string} operation - Name of the operation for logging
 * @returns {Promise} - Promise that resolves with the result of the function
 */
async function retryWithBackoff(fn, maxRetries, operation) {
  let retries = 0;
  let lastError;
  
  while (retries < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      retries++;
      
      if (retries >= maxRetries) {
        console.log(`${operation} failed after ${maxRetries} retries`);
        break;
      }
      
      const delay = Math.pow(2, retries) * 1000 + Math.random() * 1000;
      console.log(`${operation} attempt ${retries} failed. Retrying in ${Math.round(delay/1000)} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

/**
 * Main function to scrape Trustpilot reviews
 */
async function scrapeTrustpilotReviews() {
  console.log(`Starting Trustpilot scraper for ${config.companyURL}${config.searchTerm ? ` with search term "${config.searchTerm}"` : ''}...`);
  console.log(`Results will be saved with prefix: ${config.outputFilePrefix}`);
  
  // Initialize Puppeteer with stealth plugin to avoid detection
  puppeteer.use(StealthPlugin());
  
  // Launch browser settings
  const browserOptions = {
    headless: !config.debug, // Set to false for debug mode
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1920,1080',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  };
  
  // Add proxy if provided
  if (config.proxy) {
    // Check if it's a numeric proxy index
    if (/^[0-9]+$/.test(config.proxy)) {
      console.log(`Using proxy: ${config.proxy}`);
      // This is just for logging, don't actually set the proxy here
      // The actual proxy server connection should be configured separately
    } else if (config.proxy.startsWith('http') || config.proxy.startsWith('socks')) {
      console.log(`Using custom proxy: ${config.proxy}`);
      browserOptions.args.push(`--proxy-server=${config.proxy}`);
    }
  }
  
  // Launch the browser with the configured options
  const browser = await puppeteer.launch(browserOptions);
  
  try {
    // Open a new page
    const page = await browser.newPage();
    
    // Set a random user agent
    const userAgent = getRandomUserAgent();
    console.log(`Using user agent (${config.userAgent}): ${userAgent.substring(0, 50)}...`);
    await page.setUserAgent(userAgent);
    
    // Set viewport to look like a regular browser
    if (config.userAgent === 'mobile') {
      await page.setViewport({ width: 375, height: 812, isMobile: true });
    } else {
      await page.setViewport({ width: 1920, height: 1080 });
    }
    
    // Set extra HTTP headers to appear more like a regular browser
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1'
    });
    
    // Construct the Trustpilot URL with optional search parameter
    let trustpilotURL = `https://www.trustpilot.com/review/${config.companyURL}`;
    if (config.searchTerm) {
      // Encode the search term properly for URLs
      const encodedSearch = encodeURIComponent(config.searchTerm);
      trustpilotURL += `?search=${encodedSearch}`;
    }
    
    // Navigate to the Trustpilot page with retry
    console.log(`Navigating to: ${trustpilotURL}`);
    
    const response = await retryWithBackoff(async () => {
      return await page.goto(trustpilotURL, {
        waitUntil: 'networkidle2',
        timeout: 60000 // Extended timeout of 60 seconds
      });
    }, config.maxRetries, 'Page navigation');
    
    // Check if the page loaded successfully
    const status = response.status();
    console.log(`HTTP Response Code: ${status}`);
    
    if (status !== 200) {
      throw new Error(`Failed to load page: ${status}`);
    }
    
    // Save debugging info
    const debugDir = './debug';
    if (!fs.existsSync(debugDir)) {
      fs.mkdirSync(debugDir);
    }
    
    // Array to store all reviews
    const allReviews = [];

    // Extract reviews from __NEXT_DATA__ embedded JSON (fast and reliable)
    const extractReviewsFromPageData = async () => {
      return await page.evaluate(() => {
        const nextDataEl = document.querySelector('#__NEXT_DATA__');
        if (!nextDataEl) return { reviews: [], totalPages: 0 };

        const data = JSON.parse(nextDataEl.textContent);
        const pageProps = data.props?.pageProps;
        if (!pageProps) return { reviews: [], totalPages: 0 };

        const totalPages = pageProps.filters?.pagination?.totalPages || 0;
        const rawReviews = pageProps.reviews || [];

        const reviews = rawReviews
          .filter(r => r.text && r.text.length >= 10)
          .map(r => {
            // Format the experience date
            let dateExperience = 'N/A';
            if (r.dates?.experiencedDate) {
              const d = new Date(r.dates.experiencedDate);
              dateExperience = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }

            return {
              reviewerName: r.consumer?.displayName?.trim() || 'N/A',
              dateExperience,
              rating: r.rating?.toString() || 'N/A',
              title: r.title || 'N/A',
              reviewText: r.text
            };
          });

        return { reviews, totalPages };
      });
    };

    // Process pages using direct URL navigation
    let currentPage = 1;
    let totalPages = 0;

    while (true) {
      // Build the page URL
      let pageURL = trustpilotURL;
      if (currentPage > 1) {
        pageURL += (pageURL.includes('?') ? '&' : '?') + `page=${currentPage}`;
      }

      // Navigate to the page (skip for page 1 since we're already there)
      if (currentPage > 1) {
        await retryWithBackoff(async () => {
          return await page.goto(pageURL, {
            waitUntil: 'networkidle2',
            timeout: 60000
          });
        }, config.maxRetries, `Page ${currentPage} navigation`);

        await randomWait();
      }

      // Handle cookie consent on first page
      if (currentPage === 1) {
        try {
          const cookieConsentSelector = 'button#onetrust-accept-btn-handler, button.cookie-consent-button, button[aria-label="Accept All Cookies"]';
          const cookieButton = await page.$(cookieConsentSelector);
          if (cookieButton) {
            console.log('Accepting cookies...');
            await cookieButton.click();
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } catch (error) {
          // No cookie consent dialog
        }
      }

      console.log(`Processing page ${currentPage}...`);

      // Take a screenshot
      if (config.screenshot || config.debug) {
        await page.screenshot({ path: path.join(debugDir, `${config.outputFilePrefix}_page${currentPage}.png`), fullPage: true });
      }

      // Extract reviews from page data
      try {
        const { reviews: pageReviews, totalPages: tp } = await extractReviewsFromPageData();

        if (currentPage === 1) {
          totalPages = tp;
          console.log(`Total pages available: ${totalPages}`);
        }

        if (pageReviews.length > 0) {
          allReviews.push(...pageReviews);
          console.log(`Found ${pageReviews.length} reviews on page ${currentPage} (${allReviews.length} total)`);

          // Check if we've reached the max number of reviews
          if (config.maxReviews > 0 && allReviews.length >= config.maxReviews) {
            console.log(`Reached the maximum number of reviews (${config.maxReviews})`);
            if (allReviews.length > config.maxReviews) {
              allReviews.length = config.maxReviews;
            }
            break;
          }

          // Check if we've reached the max number of pages
          if (config.maxPages > 0 && currentPage >= config.maxPages) {
            console.log(`Reached maximum number of pages (${config.maxPages})`);
            break;
          }

          // Check if there are more pages
          if (currentPage >= totalPages) {
            console.log('Reached last page');
            break;
          }

          currentPage++;
        } else {
          console.log('No reviews found on current page');
          break;
        }
      } catch (error) {
        console.error(`Error processing page ${currentPage}: ${error.message}`);
        console.error(error.stack);
        break;
      }
    }
    
    // Save the results
    if (allReviews.length > 0) {
      // Save as JSON
      fs.writeFileSync(`${config.outputFilePrefix}.json`, JSON.stringify(allReviews, null, 2));
      
      // Save as CSV
      const csvHeader = 'Reviewer Name,Date of Experience,Rating,Title,Review Text\n';
      const csvRows = allReviews.map(review => 
        `"${review.reviewerName.replace(/"/g, '""')}","${review.dateExperience.replace(/"/g, '""')}","${review.rating}","${review.title.replace(/"/g, '""')}","${review.reviewText.replace(/"/g, '""')}"`
      );
      fs.writeFileSync(`${config.outputFilePrefix}.csv`, csvHeader + csvRows.join('\n'));
      
      console.log(`Successfully extracted and saved ${allReviews.length} reviews for ${config.companyURL}`);
      console.log(`Output files: ${config.outputFilePrefix}.json and ${config.outputFilePrefix}.csv`);
      
      // Display sample of extracted data
      console.log('\nSample of extracted reviews:');
      allReviews.slice(0, 3).forEach((review, index) => {
        console.log(`\nReview #${index + 1}:`);
        console.log(`Reviewer: ${review.reviewerName}`);
        console.log(`Date: ${review.dateExperience}`);
        console.log(`Rating: ${review.rating}`);
        console.log(`Title: ${review.title}`);
        console.log(`Text: ${review.reviewText.substring(0, 100)}${review.reviewText.length > 100 ? '...' : ''}`);
      });
    } else {
      console.log('No reviews found');
    }
  } catch (error) {
    console.error(`Error during scraping: ${error.message}`);
    console.error(error.stack);
  } finally {
    // Close the browser
    await browser.close();
    console.log('Browser closed');
  }
}

/**
 * Main function
 */
async function main() {
  if (!options.domain && !options.help) {
    console.log('Error: No domain specified. Use --domain parameter to specify a company domain.');
    console.log('Use --help for more information.');
    return;
  }
  
  // Display configuration summary
  console.log(`\nTrustpilot Review Scraper Configuration:`);
  console.log(`--------------------------------------`);
  console.log(`Company domain: ${config.companyURL}`);
  if (config.searchTerm) console.log(`Search term: ${config.searchTerm}`);
  console.log(`Maximum pages: ${config.maxPages > 0 ? config.maxPages : 'No limit'}`);
  console.log(`Maximum reviews: ${config.maxReviews > 0 ? config.maxReviews : 'No limit'}`);
  console.log(`--------------------------------------\n`);
  
  try {
    await scrapeTrustpilotReviews();
    console.log('Scraping completed successfully!');
  } catch (error) {
    console.error('Fatal error:', error);
    console.error(error.stack);
  }
}

// Run the main function
main();
