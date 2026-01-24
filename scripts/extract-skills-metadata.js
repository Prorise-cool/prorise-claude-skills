#!/usr/bin/env node
/**
 * Skills Metadata Extractor
 * 扫描 .claude/skills 目录，提取所有 SKILL.md 的 YAML frontmatter 元数据
 */

const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, '..', '.claude', 'skills');
const OUTPUT_FILE = path.join(__dirname, '..', 'skills-manifest.json');

/**
 * 解析 YAML frontmatter
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const yaml = match[1];
  const result = {};

  // 简单的 YAML 解析（支持 name, description, allowed-tools 等）
  const lines = yaml.split(/\r?\n/);
  let currentKey = null;
  let currentValue = '';

  for (const line of lines) {
    const keyMatch = line.match(/^(\w[\w-]*)\s*:\s*(.*)$/);
    if (keyMatch) {
      if (currentKey) {
        result[currentKey] = currentValue.trim();
      }
      currentKey = keyMatch[1];
      currentValue = keyMatch[2];
    } else if (currentKey && line.startsWith('  ')) {
      // 多行值
      currentValue += ' ' + line.trim();
    }
  }

  if (currentKey) {
    result[currentKey] = currentValue.trim();
  }

  return result;
}

/**
 * 扫描 skills 目录
 */
function scanSkills() {
  const skills = [];

  if (!fs.existsSync(SKILLS_DIR)) {
    console.error(`Skills directory not found: ${SKILLS_DIR}`);
    process.exit(1);
  }

  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('_')) continue; // 跳过 _shared 等

    const skillPath = path.join(SKILLS_DIR, entry.name);
    const skillMdPath = path.join(skillPath, 'SKILL.md');

    if (!fs.existsSync(skillMdPath)) continue;

    const content = fs.readFileSync(skillMdPath, 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (frontmatter && frontmatter.name) {
      skills.push({
        name: frontmatter.name,
        description: frontmatter.description || '',
        path: `.claude/skills/${entry.name}`,
        directory: entry.name,
        hasCommandJson: fs.existsSync(path.join(skillPath, 'command.json'))
      });
    }
  }

  // 按名称排序
  skills.sort((a, b) => a.name.localeCompare(b.name));

  return skills;
}

/**
 * 主函数
 */
function main() {
  console.log('Extracting skills metadata...');

  const skills = scanSkills();

  const manifest = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    count: skills.length,
    skills
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2), 'utf-8');

  console.log(`Found ${skills.length} skills`);
  console.log(`Manifest written to: ${OUTPUT_FILE}`);
}

main();
