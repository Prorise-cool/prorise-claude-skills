# Python Script Template

Python 脚本模板，用于生成技能中的确定性脚本。

## 模板代码

```python
#!/usr/bin/env python3
"""
{{script_description}}
"""

import argparse
import json
import sys
from pathlib import Path


def main():
    # 1. 定义参数
    parser = argparse.ArgumentParser(description='{{script_description}}')
    parser.add_argument('--input-path', type=str, required=True,
                        help='输入文件路径')
    parser.add_argument('--output-dir', type=str, required=True,
                        help='输出目录（由调用方指定）')
    # 添加更多参数...

    args = parser.parse_args()

    # 2. 验证输入
    input_path = Path(args.input_path)
    if not input_path.exists():
        print(f"错误: 输入文件不存在: {input_path}", file=sys.stderr)
        sys.exit(1)

    output_dir = Path(args.output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    # 3. 执行核心逻辑
    try:
        result = process(input_path, output_dir)
    except Exception as e:
        print(f"错误: {e}", file=sys.stderr)
        sys.exit(1)

    # 4. 输出 JSON 结果
    print(json.dumps(result))


def process(input_path: Path, output_dir: Path) -> dict:
    """
    核心处理逻辑

    Args:
        input_path: 输入文件路径
        output_dir: 输出目录

    Returns:
        dict: 包含输出结果的字典
    """
    # TODO: 实现处理逻辑

    output_file = output_dir / 'result.json'

    # 示例：读取并处理数据
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 处理数据...
    processed_count = len(data) if isinstance(data, list) else 1

    # 写入输出
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    return {
        'output_file': str(output_file),
        'items_processed': processed_count,
        'status': 'success'
    }


if __name__ == '__main__':
    main()
```

## 变量说明

| 变量 | 说明 |
|------|------|
| `{{script_description}}` | 脚本功能描述 |

## 使用规范

### 输入参数

- 使用 `argparse` 定义参数
- 参数名使用 kebab-case：`--input-path`
- 必需参数设置 `required=True`
- 可选参数提供 `default` 值

### 输出格式

- 最后一行打印单行 JSON
- 包含所有输出文件路径和关键数据
- 错误信息输出到 stderr

### 错误处理

```python
# 验证错误 - 直接退出
if not valid:
    print("错误信息", file=sys.stderr)
    sys.exit(1)

# 运行时错误 - 捕获并退出
try:
    result = process()
except Exception as e:
    print(f"错误: {e}", file=sys.stderr)
    sys.exit(1)
```

## 常用模式

### 文件处理

```python
def process_files(input_dir: Path, pattern: str = '*.json') -> list:
    results = []
    for file in input_dir.glob(pattern):
        with open(file, 'r') as f:
            data = json.load(f)
        results.append({'file': str(file), 'data': data})
    return results
```

### 数据转换

```python
def transform_data(data: dict) -> dict:
    return {
        'id': data.get('id'),
        'name': data.get('name', '').strip(),
        'timestamp': datetime.now().isoformat()
    }
```

### 调用外部命令

```python
import subprocess

def run_command(cmd: list) -> str:
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr)
    return result.stdout
```

## 生成函数

```javascript
function generatePythonScript(scriptConfig) {
  return `#!/usr/bin/env python3
"""
${scriptConfig.description}
"""

import argparse
import json
import sys
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description='${scriptConfig.description}')
${scriptConfig.inputs.map(i =>
    `    parser.add_argument('--${i.name}', type=${i.type || 'str'}, ${i.required ? 'required=True' : `default='${i.default}'`},
                        help='${i.description}')`
).join('\n')}
    args = parser.parse_args()

    # TODO: 实现处理逻辑
    result = {
${scriptConfig.outputs.map(o =>
    `        '${o.name}': None  # ${o.description}`
).join(',\n')}
    }

    print(json.dumps(result))


if __name__ == '__main__':
    main()
`;
}
```
