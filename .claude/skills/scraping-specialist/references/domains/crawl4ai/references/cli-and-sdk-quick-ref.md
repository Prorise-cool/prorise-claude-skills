# CLI 与 SDK 速览

## CLI 快速抓取

```bash
crwl https://example.com
crwl https://example.com -o markdown
crwl https://example.com -o json -v --bypass-cache
```

## 配置文件方式

```bash
crwl https://example.com -B browser.yml -C crawler.yml
```

## 结构化提取

```bash
crwl https://example.com \
  -e extract_css.yml \
  -s css_schema.json \
  -o json
```

## SDK 最小示例

```python
import asyncio
from crawl4ai import AsyncWebCrawler

async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun("https://example.com")
        print(result.markdown[:500])

asyncio.run(main())
```

## 何时选 CLI，何时选 SDK

- CLI：一次性抓取、快速验证、命令行可组合流程
- SDK：批量并发、会话复用、抽取流水线、复杂自动化
