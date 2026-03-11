# 输出结构与分类建议

## 建议输出字段

每条广告至少包含：

- `brand`
- `sourceUrl`
- `type`：`video` 或 `image`
- `mediaFile`
- `landingPage`
- `headline`
- `primaryText`
- `transcript`
- `visualDescription`
- `formatCategory`
- `capturedAt`

## 建议的 `formatCategory`

- `founder-talk`
- `ugc-style`
- `problem-solution`
- `offer-led`
- `social-proof`
- `product-demo`
- `testimonial`

## 汇总层建议

`ads-data.json` 顶层可以包含：

- 抓取来源 URL
- 素材数量统计
- 视频 / 图片数量
- 高频 message patterns
- 识别出的创意类型分布
