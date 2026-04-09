# 12生肖今日运势小程序

一个基于微信小程序的12生肖每日运势查询应用，支持运势海报生成和分享。

## 🌟 功能特性

- 📅 **每日运势**：自动获取当日12生肖运势数据
- 🔮 **运势详情**：综合、爱情、事业、财富、健康五大维度
- 🎨 **海报生成**：一键生成精美运势海报
- 📤 **分享功能**：支持分享给好友和朋友圈
- 🎯 **我的生肖**：设置个人生肖，快速查看
- 📊 **运势总览**：查看当日所有生肖运势总结

## 🚀 部署指南

### 1. 克隆仓库

```bash
git clone https://github.com/liuliu521789/zodiac.git
cd zodiac
```

### 2. 配置GitHub Actions自动爬虫

本项目已配置GitHub Actions，每天自动爬取最新运势数据。

**启用步骤：**

1. 确保仓库已推送到GitHub
2. 进入仓库 -> Actions 页面
3. 点击 "I understand my workflows, go ahead and enable them"
4. 工作流会自动运行，每天北京时间8点爬取数据

**手动触发：**
- 进入 Actions -> 爬取生肖运势数据
- 点击 "Run workflow" 手动执行

### 3. 配置小程序

1. 打开微信开发者工具
2. 导入项目 `zodiac-fortune` 文件夹
3. 修改 `project.config.json` 中的 `appid` 为你自己的小程序AppID
4. 点击编译预览

### 4. 更新远程数据地址

在 `utils/fortune.js` 中，已配置好GitHub仓库地址：

```javascript
const GITHUB_REPO = 'liuliu521789/zodiac';
const FORTUNE_JSON_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/main/fortune_data.json`;
```

## 📁 项目结构

```
zodiac-fortune/
├── .github/
│   └── workflows/
│       └── crawl-fortune.yml    # GitHub Actions工作流
├── pages/
│   ├── index/                   # 首页 - 生肖列表
│   ├── detail/                  # 详情页 - 运势详情
│   ├── myzodiac/               # 我的生肖 - 设置
│   ├── poster/                 # 海报页 - 生成海报
│   └── about/                  # 关于页
├── utils/
│   ├── fortune.js              # 运势数据工具
│   └── date.js                 # 日期工具
├── crawl_fortune.py            # 爬虫脚本
├── fortune_data.json           # 运势数据文件
├── app.js                      # 小程序入口
├── app.json                    # 小程序配置
└── README.md                   # 项目说明
```

## 🔄 数据更新流程

1. **自动更新**：GitHub Actions每天8点自动爬取数据
2. **数据存储**：爬取的数据保存到 `fortune_data.json`
3. **小程序获取**：小程序从GitHub Raw获取最新数据
4. **本地缓存**：小程序本地缓存24小时，确保离线可用

## 🛠️ 技术栈

- **前端**：微信小程序原生框架 (WXML + WXSS + JS)
- **后端**：GitHub Actions + Python爬虫
- **数据来源**：华易黄历网 (https://m.k366.com/sxys/)

## 📱 使用说明

1. **首页**：查看12生肖列表，点击任意生肖查看详情
2. **运势详情**：查看综合、爱情、事业、财富、健康运势
3. **生成海报**：点击底部按钮生成运势海报
4. **分享**：支持分享给好友或保存到相册
5. **我的生肖**：设置个人生肖，快速查看

## ⚙️ 配置说明

### 修改爬虫时间

编辑 `.github/workflows/crawl-fortune.yml`：

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # UTC时间，北京时间8点
```

### 修改默认数据

编辑 `crawl_fortune.py` 中的默认数据部分。

### 修改文案风格

编辑 `utils/fortune.js` 中的 `fortuneStyles` 对象。

## 📝 注意事项

1. **小程序AppID**：需要在微信开放平台申请
2. **数据缓存**：小程序本地缓存24小时，如需立即更新请清除缓存
3. **网络请求**：确保小程序后台配置了合法域名
4. **图片生成**：海报生成需要用户授权保存到相册

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

## 📞 联系方式

如有问题，请在GitHub仓库提交Issue。

---

**免责声明**：本小程序提供的运势内容仅供娱乐参考，不构成任何决策建议。