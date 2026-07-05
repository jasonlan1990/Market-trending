# Market Trending

静态市场趋势看板，沿用原模板的深色金融看板风格，并拆分为页面、样式、脚本和 JSON 数据。

## 更新数据

```bash
python3 update_data.py
```

脚本会刷新 `market.json` 和 `news.json`。行情数据优先使用东方财富公开接口，部分指数使用 Yahoo Finance 兜底；新闻来自多个公开源。

当前指数池：

- 上证指数、上证50、中证500、沪深300、科创50、创业板50优先使用东方财富。
- 中证2000使用 Yahoo Finance 兜底。
- 微盘股使用东方财富 `Choice微盘股指数 / 微盘股板块` 口径，接口不可用时保留最近数据。

以下板块已预留结构，可后续接入专业行情源或手工填充：

- 成交量变化
- 热点板块与涨幅榜强度排序
- 资金流向
- PE/PB 历史分位与行业横向估值
- 涨跌家数、涨跌停、连板、炸板率
- 异常波动、政策事件、上市公司公告

可选环境变量：

- `MARKET_TURNOVER_TEXT`：成交额展示文本
- `MARKET_UP_COUNT`：上涨家数
- `MARKET_DOWN_COUNT`：下跌家数
- `MARKET_LIMIT_UP_COUNT`：涨停家数
- `NEWS_RSS_URLS`：逗号分隔的 RSS 地址

## 本地预览

```bash
python3 -m http.server 8000
```

然后打开 `http://localhost:8000/`。

## 自动化部署

已内置 GitHub Pages 工作流：`.github/workflows/deploy-pages.yml`。

触发方式：

- 推送到 `main` 或 `master`
- GitHub Actions 手动触发 `Deploy MarketReview`
- 工作日定时刷新并部署：北京时间 09:20、12:05、15:40、21:00

部署流程会先运行：

```bash
python update_data.py
```

然后发布 `index.html`、`styles.css`、`app.js`、`market.json`、`news.json` 到 GitHub Pages。若外部数据源临时不可用，会继续部署最近一次提交的 JSON 数据。

首次使用步骤：

1. 在 GitHub 仓库的 `Settings -> Pages` 中，将 `Build and deployment` 的 `Source` 设为 `GitHub Actions`。
2. 将本目录提交并推送到 GitHub 仓库。
3. 打开仓库的 `Actions` 页面，手动运行一次 `Deploy MarketReview`。
