#!/usr/bin/env node
/**
 * README Generator
 * 根据 skills-manifest.json 生成 README.md
 */

const fs = require('fs');
const path = require('path');

const MANIFEST_FILE = path.join(__dirname, '..', 'skills-manifest.json');
const README_FILE = path.join(__dirname, '..', 'README.md');
function generateReadme(manifest) {
  const exampleSkill = manifest.skills[0]?.directory || 'architecture-specialist';
  const exampleSkillSet = manifest.skills
    .slice(0, 3)
    .map(skill => `.claude/skills/${skill.directory}`)
    .join('\n');
  const skillsTable = manifest.skills.map(skill => {
    const desc = skill.description.length > 80 
      ? skill.description.substring(0, 77) + '...' 
      : skill.description;
    return `| [${skill.name}](${skill.path}) | ${desc} |`;
  }).join('\n');

  return `# Prorise Claude Skills

一个开源的 Claude Code Skills 集合，提供专业的工作流、工具集成和领域专业知识。

[![Auto Update](https://github.com/prorise/prorise-claude-skills/actions/workflows/auto-update-docs.yml/badge.svg)](https://github.com/prorise/prorise-claude-skills/actions/workflows/auto-update-docs.yml)

## 特性

- **${manifest.count} Skills** - 涵盖开发、设计、运维、营销等多个领域
- **自动更新** - 仓库更新时自动生成 changelog 和更新文档
- **按需下载** - 使用 sparse-checkout 只下载需要的 skill

## Skills 目录

| Skill | 描述 |
|-------|------|
${skillsTable}

## 安装使用

### 方式一：克隆整个仓库

\`\`\`bash
git clone https://github.com/prorise/prorise-claude-skills.git
cp -r prorise-claude-skills/.claude/skills/* ~/.claude/skills/
\`\`\`

### 方式二：下载单个 Skill (Sparse Checkout)

\`\`\`bash
# 1. 创建空仓库
mkdir claude-skills && cd claude-skills
git init
git remote add origin https://github.com/prorise/prorise-claude-skills.git

# 2. 启用 sparse-checkout
git config core.sparseCheckout true

# 3. 指定要下载的 skill（例如 ${exampleSkill}）
echo ".claude/skills/${exampleSkill}" >> .git/info/sparse-checkout

# 4. 拉取
git pull origin main

# 5. 复制到 Claude 配置目录
cp -r .claude/skills/${exampleSkill} ~/.claude/skills/
\`\`\`

### 下载多个 Skills

\`\`\`bash
# 在 sparse-checkout 文件中添加多个路径
cat >> .git/info/sparse-checkout << EOF
${exampleSkillSet}
EOF

git pull origin main
\`\`\`

## 同步上游更新

\`\`\`bash
# 进入你的 clone 目录
cd claude-skills

# 拉取最新更新
git pull origin main

# 复制更新的 skills
cp -r .claude/skills/* ~/.claude/skills/
\`\`\`

## 贡献指南

欢迎贡献新的 Skills！请参考 [SKILL_WRITING_GUIDE.md](.claude/skills/SKILL_WRITING_GUIDE.md) 了解如何编写 Skill。

1. Fork 本仓库
2. 创建你的 skill 目录: \`.claude/skills/your-skill-name/\`
3. 编写 \`SKILL.md\` 文件（包含 YAML frontmatter）
4. 提交 Pull Request

## 更新日志

查看 [CHANGELOG.md](CHANGELOG.md) 了解最近的更新。

## 许可证

MIT License

---

*最后更新: ${manifest.generated}*
*Skills 数量: ${manifest.count}*
`;
}

function main() {
  if (!fs.existsSync(MANIFEST_FILE)) {
    console.error('Manifest file not found. Run extract-skills-metadata.js first.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'));
  const readme = generateReadme(manifest);

  fs.writeFileSync(README_FILE, readme, 'utf-8');
  console.log(`README.md generated with ${manifest.count} skills`);
}

main();
