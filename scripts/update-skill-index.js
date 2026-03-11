#!/usr/bin/env node
/**
 * Expert Skill Index Updater
 * 为每个顶层专家 SKILL.md 自动生成子技能索引，回写子 SKILL.md 的
 * name、description 和相对路径，方便模型在加载专家后继续定位子能力。
 */

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '..', '.claude', 'skills');
const START_MARKER = '<!-- AUTO-GENERATED-SKILL-INDEX:START -->';
const END_MARKER = '<!-- AUTO-GENERATED-SKILL-INDEX:END -->';
const SECTION_TITLE = '## Skill Index';

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

  if (parts[0] === 'references' && parts[1] === 'domains') {
    const domainParts = parts.slice(2, -1);
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
      const relativeSkillPath = toPosixPath(path.relative(skillDirPath, filePath));
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
    '2. 一旦找到最相关的子技能，立即打开其 `相对路径` 指向的 `SKILL.md`，把它作为下一层入口文件。',
    '3. 进入子技能后，再根据该子技能自己的说明按需加载同目录下的 `references/`、`scripts/`、`assets/`，不要在顶层专家中预先展开大段细节。',
    '4. 如果多个子技能都相关，先加载最贴近主目标的那个，再按需补充其他子技能，避免一次性加载过多上下文。',
    '5. 下方 `相对路径` 均相对于当前顶层专家目录。',
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
        lines.push(`  - 相对路径: \`${entry.relativeSkillPath}\``);
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

  for (const skill of topLevelSkills) {
    const originalContent = fs.readFileSync(skill.skillMdPath, 'utf-8');
    const nestedEntries = getNestedSkillEntries(skill.dirPath);
    const section = renderSkillIndexSection(nestedEntries);
    const nextContent = upsertSkillIndexSection(originalContent, section);

    if (nextContent !== originalContent) {
      fs.writeFileSync(skill.skillMdPath, nextContent, 'utf-8');
      updatedCount += 1;
      console.log(`Updated ${toPosixPath(path.relative(process.cwd(), skill.skillMdPath))} (${nestedEntries.length} entries)`);
    } else {
      console.log(`Unchanged ${toPosixPath(path.relative(process.cwd(), skill.skillMdPath))} (${nestedEntries.length} entries)`);
    }
  }

  console.log(`Skill index update complete. ${updatedCount}/${topLevelSkills.length} files changed.`);
}

main();
