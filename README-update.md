# MarketReview 自动更新说明

这个版本把页面里的“指数行情、外围联动、中国股票新闻”改成读取 JSON 数据：

- `data/market.json`
- `data/news.json`

GitHub Actions 会每 5 分钟运行一次 `.github/workflows/update-market-data.yml`，调用 `scripts/update_data.py` 更新这两个 JSON 文件并推送回仓库。

## 使用方法

把这个文件夹里的内容复制到你的 GitHub Pages 仓库根目录，提交并推送即可。

如果 GitHub Actions 没有自动运行，请到仓库的 `Actions` 页面启用 workflows。

## 可选配置

新闻默认读取脚本里的 RSS 源。你也可以在 GitHub 仓库的 `Settings -> Secrets and variables -> Actions -> Variables` 里添加：

- `NEWS_RSS_URLS`：多个 RSS 地址用英文逗号分隔。
- `MARKET_TURNOVER_TEXT`：成交额，例如 `1.35万亿`。
- `MARKET_UP_COUNT`：上涨家数。
- `MARKET_DOWN_COUNT`：下跌家数。
- `MARKET_LIMIT_UP_COUNT`：涨停家数。

后四项如果不配置，会显示 `—`。如果你后续接入更完整的 A 股数据源，可以在 `scripts/update_data.py` 里直接替换这部分逻辑。
