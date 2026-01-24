# Bash Script Template

Bash 脚本模板，用于生成技能中的确定性脚本。

## 模板代码

```bash
#!/bin/bash
# {{script_description}}

set -euo pipefail

# ============================================================
# 参数解析
# ============================================================

INPUT_PATH=""
OUTPUT_DIR=""  # 由调用方指定，不设默认值

show_help() {
    echo "用法: $0 --input-path <path> --output-dir <dir>"
    echo ""
    echo "参数:"
    echo "  --input-path    输入文件路径 (必需)"
    echo "  --output-dir    输出目录 (必需，由调用方指定)"
    echo "  --help          显示帮助信息"
}

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --input-path)
            INPUT_PATH="$2"
            shift
            ;;
        --output-dir)
            OUTPUT_DIR="$2"
            shift
            ;;
        --help)
            show_help
            exit 0
            ;;
        *)
            echo "错误: 未知参数 $1" >&2
            show_help >&2
            exit 1
            ;;
    esac
    shift
done

# ============================================================
# 参数验证
# ============================================================

if [[ -z "$INPUT_PATH" ]]; then
    echo "错误: --input-path 是必需参数" >&2
    exit 1
fi

if [[ -z "$OUTPUT_DIR" ]]; then
    echo "错误: --output-dir 是必需参数" >&2
    exit 1
fi

if [[ ! -f "$INPUT_PATH" ]]; then
    echo "错误: 输入文件不存在: $INPUT_PATH" >&2
    exit 1
fi

# 检查 jq 是否可用（用于 JSON 输出）
if ! command -v jq &> /dev/null; then
    echo "错误: 需要安装 jq" >&2
    exit 1
fi

mkdir -p "$OUTPUT_DIR"

# ============================================================
# 核心逻辑
# ============================================================

OUTPUT_FILE="$OUTPUT_DIR/result.txt"
ITEMS_COUNT=0

# TODO: 实现处理逻辑
# 示例：处理输入文件
while IFS= read -r line; do
    echo "$line" >> "$OUTPUT_FILE"
    ((ITEMS_COUNT++))
done < "$INPUT_PATH"

# ============================================================
# 输出 JSON 结果（使用 jq 构建，避免特殊字符问题）
# ============================================================

jq -n \
    --arg output_file "$OUTPUT_FILE" \
    --argjson items_processed "$ITEMS_COUNT" \
    '{output_file: $output_file, items_processed: $items_processed, status: "success"}'
```

## 变量说明

| 变量 | 说明 |
|------|------|
| `{{script_description}}` | 脚本功能描述 |

## 使用规范

### 脚本头部

```bash
#!/bin/bash
set -euo pipefail  # 严格模式：出错退出、未定义变量报错、管道错误传递
```

### 参数解析模式

```bash
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --param-name)
            PARAM_VAR="$2"
            shift
            ;;
        --flag)
            FLAG_VAR=true
            ;;
        *)
            echo "Unknown: $1" >&2
            exit 1
            ;;
    esac
    shift
done
```

### 输出格式

- 最后一行打印单行 JSON
- **强烈推荐使用 `jq`**：自动处理转义和类型

```bash
# 推荐：使用 jq 构建（安全、可靠）
jq -n \
    --arg file "$FILE" \
    --argjson count "$COUNT" \
    '{output_file: $file, items_processed: $count}'

# 备选：简单场景手动拼接（注意特殊字符转义）
echo "{\"file\": \"$FILE\", \"count\": $COUNT}"
```

**jq 参数类型**：
- `--arg name value`：字符串类型
- `--argjson name value`：数字/布尔/null 类型

### 错误处理

```bash
# 验证错误
if [[ -z "$PARAM" ]]; then
    echo "错误: 参数不能为空" >&2
    exit 1
fi

# 命令错误
if ! command -v jq &> /dev/null; then
    echo "错误: 需要安装 jq" >&2
    exit 1
fi

# 运行时错误
if ! some_command; then
    echo "错误: 命令执行失败" >&2
    exit 1
fi
```

## 常用模式

### 文件遍历

```bash
for file in "$INPUT_DIR"/*.json; do
    [[ -f "$file" ]] || continue
    echo "处理: $file"
    # 处理逻辑...
done
```

### 临时文件

```bash
TEMP_FILE=$(mktemp)
trap "rm -f $TEMP_FILE" EXIT

echo "data" > "$TEMP_FILE"
```

### 调用其他工具

```bash
# 检查工具存在
require_command() {
    if ! command -v "$1" &> /dev/null; then
        echo "错误: 需要 $1" >&2
        exit 1
    fi
}

require_command jq
require_command curl
```

### JSON 处理（使用 jq）

```bash
# 读取 JSON 字段
VALUE=$(jq -r '.field' "$INPUT_PATH")

# 修改 JSON
jq '.field = "new_value"' "$INPUT_PATH" > "$OUTPUT_FILE"

# 合并 JSON 文件
jq -s 'add' file1.json file2.json > merged.json
```

## 生成函数

```javascript
function generateBashScript(scriptConfig) {
  return `#!/bin/bash
# ${scriptConfig.description}

set -euo pipefail

# 参数定义
${scriptConfig.inputs.map(i =>
    `${i.name.toUpperCase().replace(/-/g, '_')}="${i.default || ''}"`
).join('\n')}

# 参数解析
while [[ "$#" -gt 0 ]]; do
    case $1 in
${scriptConfig.inputs.map(i =>
    `        --${i.name})
            ${i.name.toUpperCase().replace(/-/g, '_')}="$2"
            shift
            ;;`
).join('\n')}
        *)
            echo "未知参数: $1" >&2
            exit 1
            ;;
    esac
    shift
done

# 参数验证
${scriptConfig.inputs.filter(i => i.required).map(i =>
    `if [[ -z "$${i.name.toUpperCase().replace(/-/g, '_')}" ]]; then
    echo "错误: --${i.name} 是必需参数" >&2
    exit 1
fi`
).join('\n\n')}

# TODO: 实现处理逻辑

# 输出结果
echo "{${scriptConfig.outputs.map(o =>
    `\\"${o.name}\\": \\"\\$${o.name.toUpperCase().replace(/-/g, '_')}\\"`
).join(', ')}}"
`;
}
```
