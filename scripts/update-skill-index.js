#!/usr/bin/env node
/**
 * Expert Skill Index Updater
 * 为每个顶层专家 SKILL.md 自动生成子技能索引，回写子 SKILL.md 的
 * name、description 和项目根相对路径，方便模型在加载专家后继续定位子能力。
 * 同时为子技能 SKILL.md 注入资源路径映射表，实现零推理文件定位。
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(PROJECT_ROOT, '.claude', 'skills');
const START_MARKER = '<!-- AUTO-GENERATED-SKILL-INDEX:START -->';
const END_MARKER = '<!-- AUTO-GENERATED-SKILL-INDEX:END -->';
const SECTION_TITLE = '## Skill Index';
const RESOURCE_MAP_START = '<!-- AUTO-GENERATED-RESOURCE-MAP:START -->';
const RESOURCE_MAP_END = '<!-- AUTO-GENERATED-RESOURCE-MAP:END -->';

function toPosixPath(value) {
  return value.split(path.sep).join('/');
}

function stripWrappingQuotes(value) {
  if (!value) {
    return '';
  }

  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith('\'') && trimmed.endsWith('\''))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return null;
  }

  const yaml = match[1];
  const result = {};
  const lines = yaml.split(/\r?\n/);
  let currentKey = null;
  let currentValue = '';

  for (const line of lines) {
    const keyMatch = line.match(/^(\w[\w-]*)\s*:\s*(.*)$/);
    if (keyMatch) {
      if (currentKey) {
        result[currentKey] = stripWrappingQuotes(currentValue);
      }
      currentKey = keyMatch[1];
      currentValue = keyMatch[2];
      continue;
    }

    if (currentKey && line.startsWith('  ')) {
      currentValue += ` ${line.trim()}`;
    }
  }

  if (currentKey) {
    result[currentKey] = stripWrappingQuotes(currentValue);
  }

  return result;
}

function collectSkillFiles(dirPath, files = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      collectSkillFiles(entryPath, files);
      continue;
    }

    if (entry.isFile() && entry.name === 'SKILL.md') {
      files.push(entryPath);
    }
  }

  return files;
}

function getTopLevelSkillDirs(selectedSkills) {
  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
    .filter((entry) => !selectedSkills.size || selectedSkills.has(entry.name))
    .map((entry) => ({
      name: entry.name,
      dirPath: path.join(SKILLS_DIR, entry.name),
      skillMdPath: path.join(SKILLS_DIR, entry.name, 'SKILL.md'),
    }))
    .filter((entry) => fs.existsSync(entry.skillMdPath))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function getCategoryLabel(relativeSkillPath) {
  const parts = relativeSkillPath.split('/');
  const referencesIdx = parts.indexOf('references');
  const domainsIdx = parts.indexOf('domains');

  if (referencesIdx !== -1 && domainsIdx !== -1 && domainsIdx === referencesIdx + 1) {
    const domainParts = parts.slice(domainsIdx + 1, -1);
    if (domainParts.length <= 1) {
      return domainParts[0] || 'root';
    }
    return domainParts.slice(0, -1).join('/');
  }

  const fallbackDir = path.posix.dirname(relativeSkillPath);
  return fallbackDir === '.' ? 'root' : fallbackDir;
}

function getNestedSkillEntries(skillDirPath) {
  const rootSkillMdPath = path.join(skillDirPath, 'SKILL.md');
  const skillFiles = collectSkillFiles(skillDirPath);

  return skillFiles
    .filter((filePath) => filePath !== rootSkillMdPath)
    .map((filePath) => {
      const content = fs.readFileSync(filePath, 'utf-8');
      const frontmatter = parseFrontmatter(content) || {};
      const relativeSkillPath = toPosixPath(path.relative(PROJECT_ROOT, filePath));
      const description = (frontmatter.description || '')
        .replace(/\s+/g, ' ')
        .trim();

      return {
        name: frontmatter.name || path.basename(path.dirname(filePath)),
        description: description || 'No description provided.',
        relativeSkillPath,
        category: getCategoryLabel(relativeSkillPath),
      };
    })
    .sort((a, b) => a.relativeSkillPath.localeCompare(b.relativeSkillPath));
}

function renderSkillIndexSection(entries) {
  const lines = [
    SECTION_TITLE,
    '',
    START_MARKER,
    '以下索引由 `node scripts/update-skill-index.js` 自动生成，用于让 Claude 在顶层专家触发后继续路由到最相关的子技能。',
    '',
    '### Claude 使用说明',
    '',
    '1. 先将用户当前任务与每个子技能的 `触发语义` 进行语义匹配，不要只看目录名。',
    '2. 一旦找到最相关的子技能，立即打开其 `入口文件` 指向的 `SKILL.md`，把它作为下一层入口。',
    '3. 进入子技能后，再根据该子技能自己的说明按需加载同目录下的 `references/`、`scripts/`、`assets/`，不要在顶层专家中预先展开大段细节。',
    '4. 如果多个子技能都相关，先加载最贴近主目标的那个，再按需补充其他子技能，避免一次性加载过多上下文。',
    '5. 下方 `入口文件` 路径相对于项目根目录，可直接用于 `Read` 操作。',
    '',
    '### 子技能索引',
    '',
  ];

  if (!entries.length) {
    lines.push('- 暂无子技能 `SKILL.md` 索引。');
  } else {
    const groupedEntries = new Map();

    for (const entry of entries) {
      if (!groupedEntries.has(entry.category)) {
        groupedEntries.set(entry.category, []);
      }
      groupedEntries.get(entry.category).push(entry);
    }

    for (const category of Array.from(groupedEntries.keys()).sort((a, b) => a.localeCompare(b))) {
      const categoryEntries = groupedEntries.get(category);
      lines.push(`#### ${category} (${categoryEntries.length})`);

      for (const entry of categoryEntries) {
        lines.push(`- \`${entry.name}\``);
        lines.push(`  - 触发语义: ${entry.description}`);
        lines.push(`  - 入口文件: \`${entry.relativeSkillPath}\``);
      }

      lines.push('');
    }
  }

  lines.push(END_MARKER);

  return `${lines.join('\n').trimEnd()}\n`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function upsertSkillIndexSection(content, section) {
  const sectionPattern = new RegExp(
    `${escapeRegExp(SECTION_TITLE)}\\n\\n${escapeRegExp(START_MARKER)}[\\s\\S]*?${escapeRegExp(END_MARKER)}\\n*`,
    'm'
  );

  if (sectionPattern.test(content)) {
    return content.replace(sectionPattern, `${section}\n`);
  }

  const notesHeading = '\n## Notes';
  const notesIndex = content.indexOf(notesHeading);
  if (notesIndex !== -1) {
    return `${content.slice(0, notesIndex).trimEnd()}\n\n${section}\n${content.slice(notesIndex + 1)}`;
  }

  return `${content.trimEnd()}\n\n${section}\n`;
}

// --- 改造 2：自动移除 Domain Index 段落 ---

function stripDomainIndexSection(content) {
  const pattern = /## Domain Index\r?\n[\s\S]*?(?=\n## |\n$|$)/;
  return content.replace(pattern, '').replace(/\n{3,}/g, '\n\n');
}

// --- 改造 3：子技能资源路径映射 ---

function collectDirectoryTree(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const items = [];

  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') {
      continue;
    }

    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      items.push({
        name: entry.name,
        type: 'directory',
        children: collectDirectoryTree(entryPath),
      });
    } else if (entry.isFile()) {
      items.push({
        name: entry.name,
        type: 'file',
      });
    }
  }

  items.sort((a, b) => {
    if (a.type === 'directory' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'directory') return 1;
    return a.name.localeCompare(b.name);
  });

  return items;
}

function hasResourcesOtherThanSkillMd(items) {
  for (const item of items) {
    if (item.type === 'file' && item.name !== 'SKILL.md') {
      return true;
    }
    if (item.type === 'directory' && item.children && item.children.length > 0) {
      return true;
    }
  }
  return false;
}

function renderTreeLines(items, prefix) {
  const lines = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const isLast = i === items.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const childPrefix = isLast ? '    ' : '│   ';

    if (item.type === 'directory') {
      lines.push(`${prefix}${connector}${item.name}/`);
      if (item.children && item.children.length > 0) {
        lines.push(...renderTreeLines(item.children, `${prefix}${childPrefix}`));
      }
    } else {
      lines.push(`${prefix}${connector}${item.name}`);
    }
  }

  return lines;
}

function renderResourceMapSection(skillDir, projectRoot) {
  const items = collectDirectoryTree(skillDir);

  if (!hasResourcesOtherThanSkillMd(items)) {
    return null;
  }

  const dirName = path.basename(skillDir);
  const relativeDirPath = toPosixPath(path.relative(projectRoot, skillDir));
  const treeLines = renderTreeLines(items, '');

  const lines = [
    RESOURCE_MAP_START,
    '',
    '### Resource Map',
    '',
    `> 基准路径: \`${relativeDirPath}/\``,
    '',
    '```',
    `${dirName}/`,
    ...treeLines,
    '```',
    '',
    RESOURCE_MAP_END,
  ];

  return lines.join('\n');
}

function upsertResourceMapSection(content, resourceMap) {
  const existingPattern = new RegExp(
    `${escapeRegExp(RESOURCE_MAP_START)}[\\s\\S]*?${escapeRegExp(RESOURCE_MAP_END)}\\n*`
  );

  if (existingPattern.test(content)) {
    if (!resourceMap) {
      return content.replace(existingPattern, '').replace(/\n{3,}/g, '\n\n');
    }
    return content.replace(existingPattern, `${resourceMap}\n\n`);
  }

  if (!resourceMap) {
    return content;
  }

  const frontmatterEnd = content.match(/^---\r?\n[\s\S]*?\r?\n---/);
  if (frontmatterEnd) {
    const endIdx = frontmatterEnd[0].length;
    const after = content.slice(endIdx);
    return `${content.slice(0, endIdx)}\n\n${resourceMap}\n${after.replace(/^\n+/, '\n')}`;
  }

  return `${resourceMap}\n\n${content}`;
}

function updateSubSkillResourceMaps(skillDirPath, projectRoot) {
  const rootSkillMdPath = path.join(skillDirPath, 'SKILL.md');
  const skillFiles = collectSkillFiles(skillDirPath);
  let updatedCount = 0;

  for (const filePath of skillFiles) {
    if (filePath === rootSkillMdPath) {
      continue;
    }

    const skillDir = path.dirname(filePath);
    const originalContent = fs.readFileSync(filePath, 'utf-8');
    const resourceMap = renderResourceMapSection(skillDir, projectRoot);
    const nextContent = upsertResourceMapSection(originalContent, resourceMap);

    if (nextContent !== originalContent) {
      fs.writeFileSync(filePath, nextContent, 'utf-8');
      updatedCount += 1;
      console.log(`  Resource map: ${toPosixPath(path.relative(process.cwd(), filePath))}`);
    }
  }

  return updatedCount;
}

// --- CLI ---

function parseArgs(argv) {
  const selectedSkills = new Set();

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--skill') {
      const value = argv[index + 1];
      if (!value) {
        throw new Error('Missing value for --skill');
      }
      selectedSkills.add(value);
      index += 1;
    }
  }

  return selectedSkills;
}

function main() {
  const selectedSkills = parseArgs(process.argv.slice(2));
  const topLevelSkills = getTopLevelSkillDirs(selectedSkills);

  if (!topLevelSkills.length) {
    console.log('No matching top-level skills found.');
    return;
  }

  let updatedCount = 0;
  let resourceMapCount = 0;

  for (const skill of topLevelSkills) {
    let content = fs.readFileSync(skill.skillMdPath, 'utf-8');
    const originalContent = content;

    // Step 1: strip Domain Index
    content = stripDomainIndexSection(content);

    // Step 2-3: collect entries with project-root-relative paths & render index
    const nestedEntries = getNestedSkillEntries(skill.dirPath);
    const section = renderSkillIndexSection(nestedEntries);

    // Step 4: upsert skill index
    content = upsertSkillIndexSection(content, section);

    if (content !== originalContent) {
      fs.writeFileSync(skill.skillMdPath, content, 'utf-8');
      updatedCount += 1;
      console.log(`Updated ${toPosixPath(path.relative(process.cwd(), skill.skillMdPath))} (${nestedEntries.length} entries)`);
    } else {
      console.log(`Unchanged ${toPosixPath(path.relative(process.cwd(), skill.skillMdPath))} (${nestedEntries.length} entries)`);
    }

    // Step 5: update sub-skill resource maps
    resourceMapCount += updateSubSkillResourceMaps(skill.dirPath, PROJECT_ROOT);
  }

  console.log(`Skill index update complete. ${updatedCount}/${topLevelSkills.length} top-level files changed, ${resourceMapCount} resource maps updated.`);
}

main();
