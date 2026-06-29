#!/usr/bin/env python3
import email.utils
import json
import os
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, time, timezone
from pathlib import Path
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
SHANGHAI = ZoneInfo("Asia/Shanghai")
USER_AGENT = "MarketReviewBot/1.0"

INDEX_SYMBOLS = [
    ("上证指数", "000001.SS"),
    ("深证成指", "399001.SZ"),
    ("创业板指", "399006.SZ"),
    ("科创50", "000688.SS"),
    ("北证50", "899050.BJ"),
    ("沪深300", "000300.SS"),
    ("中证500", "000905.SS"),
    ("上证50", "000016.SS")
]

GLOBAL_SYMBOLS = [
    ("道琼斯", "^DJI"),
    ("纳斯达克", "^IXIC"),
    ("标普500", "^GSPC"),
    ("日经225", "^N225"),
    ("韩国KOSPI", "^KS11"),
    ("德国DAX", "^GDAXI"),
    ("法国CAC40", "^FCHI"),
    ("离岸人民币", "CNH=X")
]

DEFAULT_RSS_URLS = [
    "https://rss.sina.com.cn/roll/finance/hot_roll.xml",
    "https://www.chinanews.com.cn/rss/finance.xml"
]


def request_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=20) as response:
        return json.loads(response.read().decode("utf-8"))


def request_text(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=20) as response:
        raw = response.read()
    return raw.decode("utf-8", errors="replace")


def format_number(value, digits=2):
    if value is None:
        return "—"
    return f"{value:,.{digits}f}"


def format_percent(value):
    if value is None:
        return "—"
    return f"{value:+.2f}%"


def market_status(now):
    if now.weekday() >= 5:
        return "休市"
    current = now.time()
    if time(9, 30) <= current <= time(11, 30) or time(13, 0) <= current <= time(15, 0):
        return "交易中"
    if time(11, 30) < current < time(13, 0):
        return "午间休市"
    if current > time(15, 0):
        return "已收盘"
    return "未开盘"


def load_existing(name):
    path = DATA_DIR / name
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def save_json(name, payload):
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    (DATA_DIR / name).write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8"
    )


def fetch_yahoo_chart(symbol):
    encoded = urllib.parse.quote(symbol, safe="")
    url = f"https://query1.finance.yahoo.com/v8/finance/chart/{encoded}?range=1d&interval=5m"
    data = request_json(url)
    result = (data.get("chart", {}).get("result") or [None])[0]
    if not result:
        raise RuntimeError(f"No Yahoo chart data for {symbol}")

    meta = result.get("meta", {})
    quote = ((result.get("indicators") or {}).get("quote") or [{}])[0]
    closes = [
        round(float(value), 4)
        for value in quote.get("close", [])
        if value is not None
    ]
    value = meta.get("regularMarketPrice")
    previous = (
        meta.get("chartPreviousClose")
        or meta.get("previousClose")
        or (closes[0] if closes else None)
    )

    if value is None and closes:
        value = closes[-1]
    if value is None:
        raise RuntimeError(f"No price for {symbol}")

    value = float(value)
    previous = float(previous) if previous else None
    change_percent = ((value - previous) / previous * 100) if previous else None

    return {
        "value": round(value, 4),
        "valueText": format_number(value, 4 if value < 10 else 2),
        "changePercent": round(change_percent, 4) if change_percent is not None else None,
        "changeText": format_percent(change_percent),
        "sparkline": closes[-30:]
    }


def build_market_payload():
    now = datetime.now(SHANGHAI)
    existing = load_existing("market.json")
    existing_indices = {item.get("name"): item for item in existing.get("indices", [])}
    existing_global = {item.get("name"): item for item in existing.get("globalMarkets", [])}
    existing_stats = {item.get("label"): item for item in existing.get("quickStats", [])}

    indices = []
    for name, symbol in INDEX_SYMBOLS:
        item = {"name": name, "symbol": symbol}
        try:
            item.update(fetch_yahoo_chart(symbol))
        except Exception as exc:
            print(f"warning: using previous data for {name}: {exc}", file=sys.stderr)
            item.update(existing_indices.get(name, {}))
            item.setdefault("valueText", "—")
            item.setdefault("changeText", "—")
        indices.append(item)

    global_markets = []
    for name, symbol in GLOBAL_SYMBOLS:
        item = {"name": name, "symbol": symbol}
        try:
            item.update(fetch_yahoo_chart(symbol))
        except Exception as exc:
            print(f"warning: using previous data for {name}: {exc}", file=sys.stderr)
            item.update(existing_global.get(name, {}))
            item.setdefault("valueText", "—")
            item.setdefault("changeText", "—")
        global_markets.append(item)

    quick_stats = []
    for item in indices[:4]:
        quick_stats.append({
            "label": item["name"],
            "valueText": item.get("changeText", "—"),
            "changePercent": item.get("changePercent")
        })

    quick_stats.extend([
        {
            "label": "成交额",
            "valueText": os.getenv("MARKET_TURNOVER_TEXT") or existing.get("turnoverText") or existing_stats.get("成交额", {}).get("valueText", "—"),
            "color": "var(--text)"
        },
        {
            "label": "上涨",
            "valueText": os.getenv("MARKET_UP_COUNT") or existing_stats.get("上涨", {}).get("valueText", "—"),
            "color": "var(--up)"
        },
        {
            "label": "下跌",
            "valueText": os.getenv("MARKET_DOWN_COUNT") or existing_stats.get("下跌", {}).get("valueText", "—"),
            "color": "var(--down)"
        },
        {
            "label": "涨停",
            "valueText": os.getenv("MARKET_LIMIT_UP_COUNT") or existing_stats.get("涨停", {}).get("valueText", "—"),
            "color": "var(--up)"
        }
    ])

    return {
        "updatedAt": now.isoformat(),
        "updatedAtText": now.strftime("%H:%M"),
        "tradingDate": now.strftime("%Y-%m-%d"),
        "tradingDateText": now.strftime("%Y年%-m月%-d日 周") + "一二三四五六日"[now.weekday()],
        "marketStatus": market_status(now),
        "turnoverText": quick_stats[4]["valueText"],
        "indices": indices,
        "quickStats": quick_stats,
        "globalMarkets": global_markets
    }


def parse_rss_date(value):
    if not value:
        return ""
    try:
        parsed = email.utils.parsedate_to_datetime(value)
        if parsed.tzinfo is None:
            parsed = parsed.replace(tzinfo=timezone.utc)
        return parsed.astimezone(SHANGHAI).strftime("%m-%d %H:%M")
    except (TypeError, ValueError):
        return ""


def rss_urls():
    value = os.getenv("NEWS_RSS_URLS", "")
    if not value.strip():
        return DEFAULT_RSS_URLS
    return [item.strip() for item in value.split(",") if item.strip()]


def fetch_news_items():
    items = []
    seen = set()
    for url in rss_urls():
        try:
            root = ET.fromstring(request_text(url))
        except Exception as exc:
            print(f"warning: RSS failed {url}: {exc}", file=sys.stderr)
            continue

        channel_title = root.findtext("./channel/title") or "新闻"
        for node in root.findall("./channel/item"):
            title = (node.findtext("title") or "").strip()
            link = (node.findtext("link") or "").strip()
            if not title or title in seen:
                continue
            seen.add(title)
            items.append({
                "title": title,
                "url": link,
                "source": channel_title,
                "publishedAt": node.findtext("pubDate") or "",
                "publishedAtText": parse_rss_date(node.findtext("pubDate"))
            })
            if len(items) >= 10:
                return items
    return items


def build_news_payload():
    now = datetime.now(SHANGHAI)
    existing = load_existing("news.json")
    items = fetch_news_items() or existing.get("items", [])
    return {
        "updatedAt": now.isoformat(),
        "items": items[:10]
    }


def main():
    save_json("market.json", build_market_payload())
    save_json("news.json", build_news_payload())


if __name__ == "__main__":
    main()
