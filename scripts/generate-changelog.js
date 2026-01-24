#!/usr/bin/env node
/**
 * Changelog Generator
 * 分析 git diff，识别 skills 变更，生成 CHANGELOG.md
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CHANGELOG_FILE = path.join(__dirname, '..', 'CHANGELOG.md');
const SKILLS_DIR = '.claude/skills';

/**
 * 获取 skills 目录的变更
 */
function getSkillsChanges() {
  try {
    // 获取最近一次提交的变更文件
    const diff = execSync('git diff --name-status HEAD~1 HEAD', {
      encoding: 'utf-8',
      cwd: path.join(__dirname, '..'),
      stdio: ['pipe', 'pipe', 'pipe']  // 跨平台兼容，捕获 stderr
    }).trim();

    if (!diff) return { added: [], modified: [], deleted: [] };

    const changes = { added: [], modified: [], deleted: [] };
    const lines = diff.split('\n').filter(Boolean);

    for (const line of lines) {
      const [status, filePath] = line.split('\t');
      if (!filePath || !filePath.startsWith(SKILLS_DIR)) continue;

      // 提取 skill 名称
      const match = filePath.match(/\.claude\/skills\/([^/]+)/);
      if (!match) continue;

      const skillName = match[1];
      if (skillName.startsWith('_')) continue; // 跳过 _shared

      if (status === 'A') {
        if (!changes.added.includes(skillName)) changes.added.push(skillName);
      } else if (status === 'M') {
        if (!changes.modified.includes(skillName)) changes.modified.push(skillName);
      } else if (status === 'D') {
        if (!changes.deleted.includes(skillName)) changes.deleted.push(skillName);
      }
    }

    return changes;
  } catch (error) {
    console.error('Error getting git diff:', error.message);
    return { added: [], modified: [], deleted: [] };
  }
}

/**
 * 获取 skill 描述
 */
function getSkillDescription(skillName) {
  const skillMdPath = path.join(__dirname, '..', SKILLS_DIR, skillName, 'SKILL.md');
  if (!fs.existsSync(skillMdPath)) return '';

  const content = fs.readFileSync(skillMdPath, 'utf-8');
  const match = content.match(/description:\s*(.+?)(?:\r?\n|$)/);
  return match ? match[1].trim() : '';
}

/**
 * 生成 changelog 条目
 */
function generateChangelogEntry(changes) {
  const date = new Date().toISOString().split('T')[0];
  let entry = `## [${date}]\n\n`;

  if (changes.added.length > 0) {
    entry += '### Added\n\n';
    for (const skill of changes.added) {
      const desc = getSkillDescription(skill);
      entry += `- **${skill}**: ${desc || 'New skill added'}\n`;
    }
    entry += '\n';
  }

  if (changes.modified.length > 0) {
    entry += '### Updated\n\n';
    for (const skill of changes.modified) {
      entry += `- **${skill}**: Updated\n`;
    }
    entry += '\n';
  }

  if (changes.deleted.length > 0) {
    entry += '### Removed\n\n';
    for (const skill of changes.deleted) {
      entry += `- **${skill}**: Removed\n`;
    }
    entry += '\n';
  }

  return entry;
}

/**
 * 更新 CHANGELOG.md
 */
function updateChangelog(newEntry) {
  let content = '';

  if (fs.existsSync(CHANGELOG_FILE)) {
    content = fs.readFileSync(CHANGELOG_FILE, 'utf-8');
  } else {
    content = '# Changelog\n\nAll notable changes to this project will be documented in this file.\n\n';
  }

  // 在标题后插入新条目
  const headerEnd = content.indexOf('\n\n', content.indexOf('# Changelog'));
  if (headerEnd !== -1) {
    content = content.slice(0, headerEnd + 2) + newEntry + content.slice(headerEnd + 2);
  } else {
    content += '\n' + newEntry;
  }

  fs.writeFileSync(CHANGELOG_FILE, content, 'utf-8');
}

/**
 * 主函数
 */
function main() {
  console.log('Generating changelog...');

  const changes = getSkillsChanges();
  const totalChanges = changes.added.length + changes.modified.length + changes.deleted.length;

  if (totalChanges === 0) {
    console.log('No skill changes detected');
    return;
  }

  console.log(`Found changes: +${changes.added.length} ~${changes.modified.length} -${changes.deleted.length}`);

  const entry = generateChangelogEntry(changes);
  updateChangelog(entry);

  console.log('CHANGELOG.md updated');
}

main();
