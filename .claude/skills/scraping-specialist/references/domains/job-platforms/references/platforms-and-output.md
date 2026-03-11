# 平台与输出说明

## 搜索入口

| 平台 | 搜索 URL 模板 |
|------|---------------|
| 104 | `https://www.104.com.tw/jobs/search/?keyword={keyword}` |
| CakeResume | `https://www.cakeresume.com/jobs?q={keyword}` |
| Yourator | `https://www.yourator.co/jobs?q={keyword}` |

## 建议输出结构

```json
{
  "searchDate": "2026-03-11",
  "keywords": ["前端工程師"],
  "results": {
    "104": [],
    "cakeresume": [],
    "yourator": []
  },
  "totalCount": 0
}
```

## Markdown 汇总模板

```markdown
## 搜寻结果

关键字: 前端工程师 | 日期: 2026-03-11

### 104 人力银行 (10 笔)
1. **职位** - 公司
   - 地点: 台北市
   - 薪资: 50,000 ~ 70,000
   - [查看详情](https://...)
```
