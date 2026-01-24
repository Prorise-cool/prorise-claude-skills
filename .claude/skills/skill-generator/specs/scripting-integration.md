# Scripting Integration Spec

技能脚本集成规范，定义如何在技能中使用外部脚本执行确定性任务。

## 核心原则

1. **约定优于配置**：命名即 ID，扩展名即运行时
2. **极简调用**：一行完成脚本调用
3. **标准输入输出**：命令行参数输入，JSON 标准输出

## 目录结构

```
.claude/skills/<skill-name>/
├── scripts/                    # 脚本专用目录
│   ├── process-data.py         # id: process-data
│   ├── validate-output.sh      # id: validate-output
│   └── transform-json.js       # id: transform-json
├── phases/
└── specs/
```

## 命名约定

| 扩展名 | 运行时 | 执行命令 |
|--------|--------|----------|
| `.py` | python | `python scripts/{id}.py` |
| `.sh` | bash | `bash scripts/{id}.sh` |
| `.js` | node | `node scripts/{id}.js` |

## 声明格式

在 Phase 或 Action 文件的 `## Scripts` 部分声明：

```yaml
## Scripts

- process-data
- validate-output
```

## 调用语法

### 基础调用

```javascript
const result = await ExecuteScript('script-id', { key: value });
```

### 参数命名转换

调用时 JS 对象中的键会**自动转换**为 `kebab-case` 命令行参数：

| JS 键名 | 转换后参数 |
|---------|-----------|
| `input_path` | `--input-path` |
| `output_dir` | `--output-dir` |
| `max_count` | `--max-count` |

脚本中使用 `--input-path` 接收，调用时使用 `input_path` 传入。

### 完整调用（含错误处理）

```javascript
const result = await ExecuteScript('process-data', {
  input_path: `${workDir}/data.json`,
  threshold: 0.9
});

if (!result.success) {
  throw new Error(`脚本执行失败: ${result.stderr}`);
}

const { output_file, count } = result.outputs;
```

## 返回格式

```typescript
interface ScriptResult {
  success: boolean;    // exit code === 0
  stdout: string;      // 完整标准输出
  stderr: string;      // 完整标准错误
  outputs: {           // 从 stdout 最后一行解析的 JSON
    [key: string]: any;
  };
}
```

## 脚本编写规范

### 输入：命令行参数

```bash
# Python: argparse
--input-path /path/to/file --threshold 0.9

# Bash: 手动解析
--input-path /path/to/file
```

### 输出：标准输出 JSON

脚本最后一行必须打印单行 JSON：

```json
{"output_file": "/tmp/result.json", "count": 42}
```

### Python 模板

```python
import argparse
import json

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input-path', required=True)
    parser.add_argument('--threshold', type=float, default=0.9)
    args = parser.parse_args()

    # 执行逻辑...
    result_path = "/tmp/result.json"

    # 输出 JSON
    print(json.dumps({
        "output_file": result_path,
        "items_processed": 100
    }))

if __name__ == '__main__':
    main()
```

### Bash 模板

```bash
#!/bin/bash

# 解析参数
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --input-path) INPUT_PATH="$2"; shift ;;
        *) echo "Unknown: $1" >&2; exit 1 ;;
    esac
    shift
done

# 执行逻辑...
LOG_FILE="/tmp/process.log"
echo "Processing $INPUT_PATH" > "$LOG_FILE"

# 输出 JSON
echo "{\"log_file\": \"$LOG_FILE\", \"status\": \"done\"}"
```

## ExecuteScript 实现

```javascript
async function ExecuteScript(scriptId, inputs = {}) {
  const skillDir = GetSkillDir();

  // 查找脚本文件
  const extensions = ['.py', '.sh', '.js'];
  let scriptPath, runtime;

  for (const ext of extensions) {
    const path = `${skillDir}/scripts/${scriptId}${ext}`;
    if (FileExists(path)) {
      scriptPath = path;
      runtime = ext === '.py' ? 'python' : ext === '.sh' ? 'bash' : 'node';
      break;
    }
  }

  if (!scriptPath) {
    throw new Error(`Script not found: ${scriptId}`);
  }

  // 构建命令行参数
  const args = Object.entries(inputs)
    .map(([k, v]) => `--${k.replace(/_/g, '-')} "${v}"`)
    .join(' ');

  // 执行脚本
  const cmd = `${runtime} "${scriptPath}" ${args}`;
  const { stdout, stderr, exitCode } = await Bash(cmd);

  // 解析输出
  let outputs = {};
  try {
    const lastLine = stdout.trim().split('\n').pop();
    outputs = JSON.parse(lastLine);
  } catch (e) {
    // 无法解析 JSON，保持空对象
  }

  return {
    success: exitCode === 0,
    stdout,
    stderr,
    outputs
  };
}
```

## 使用场景

### 适合脚本化的任务

- 数据处理和转换
- 文件格式转换
- 批量文件操作
- 复杂计算逻辑
- 调用外部工具/库

### 不适合脚本化的任务

- 需要用户交互的任务
- 需要访问 Claude 工具的任务
- 简单的文件读写
- 需要动态决策的任务

## 路径约定

### 脚本路径

脚本路径相对于 `SKILL.md` 所在目录（技能根目录）：

```
.claude/skills/<skill-name>/    # 技能根目录（SKILL.md 所在位置）
├── SKILL.md
├── scripts/                     # 脚本目录
│   └── process-data.py          # 相对路径: scripts/process-data.py
└── phases/
```

`ExecuteScript` 自动从技能根目录查找脚本：
```javascript
// 实际执行: python .claude/skills/<skill-name>/scripts/process-data.py
await ExecuteScript('process-data', { ... });
```

### 输出目录

**推荐**：由调用方传递输出目录，而非脚本默认 `/tmp`：

```javascript
// 调用时指定输出目录（在工作流工作目录内）
const result = await ExecuteScript('process-data', {
  input_path: `${workDir}/data.json`,
  output_dir: `${workDir}/output`    // 明确指定输出位置
});
```

脚本应接受 `--output-dir` 参数，而非硬编码输出路径。

## 最佳实践

1. **单一职责**：每个脚本只做一件事
2. **无副作用**：脚本不应修改全局状态
3. **幂等性**：相同输入产生相同输出
4. **错误明确**：错误信息写入 stderr，正常输出写入 stdout
5. **快速失败**：参数验证失败立即退出
6. **路径参数化**：输出路径由调用方指定，不硬编码
