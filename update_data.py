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


ROOT = Path(__file__).resolve().parent
SHANGHAI = ZoneInfo("Asia/Shanghai")
USER_AGENT = "MarketTrendingDashboard/1.1"
EASTMONEY_HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://quote.eastmoney.com/",
}
SINA_HEADERS = {
    "User-Agent": "Mozilla/5.0",
    "Referer": "https://finance.sina.com.cn/",
}
PLACEHOLDER_TERMS = tuple("待" + suffix for suffix in ("交易日刷新", "刷新", "接入"))
SINA_MARKET_CACHE = None

INDEX_SYMBOLS = [
    ("上证指数", "eastmoney", "1.000001", "000001.SS"),
    ("上证50", "eastmoney", "1.000016", "000016.SS"),
    ("中证2000", "yahoo", "", "932000.SS"),
    ("中证500", "eastmoney", "1.000905", "000905.SS"),
    ("沪深300", "eastmoney", "1.000300", "000300.SS"),
    ("科创50", "eastmoney", "1.000688", "000688.SS"),
    ("创业板50", "eastmoney", "0.399673", "399673.SZ"),
    ("微盘股", "eastmoney", "47.800007|90.BK1158", ""),
]

GLOBAL_SYMBOLS = [
    ("道琼斯", "^DJI"),
    ("纳斯达克", "^IXIC"),
    ("标普500", "^GSPC"),
    ("日经225", "^N225"),
    ("韩国KOSPI", "^KS11"),
    ("德国DAX", "^GDAXI"),
    ("法国CAC40", "^FCHI"),
    ("离岸人民币", "CNH=X"),
]

DEFAULT_RSS_URLS = [
    "https://rss.sina.com.cn/roll/finance/hot_roll.xml",
    "https://www.chinanews.com.cn/rss/finance.xml",
    "https://feeds.feedburner.com/caixin/latest",
    "https://www.stcn.com/rss/index.xml",
    "https://www.cls.cn/nodeapi/telegraphList?app=CailianpressWeb&category=&lastTime=&last_time=&os=web&rn=20",
]

THEMES = [
    {
        "title": "AI算力与半导体",
        "summary": "观察存储、先进封装、服务器和算力租赁的资金承接。",
        "heat": "高",
        "color": "#66c7d9",
    },
    {
        "title": "高股息与红利",
        "summary": "震荡或缩量阶段，银行、公用事业与资源股仍是防守底仓。",
        "heat": "中",
        "color": "#e6b85c",
    },
    {
        "title": "出口链与汇率",
        "summary": "人民币、海外库存周期影响家电、汽车零部件和机械设备。",
        "heat": "中",
        "color": "#a993ff",
    },
    {
        "title": "政策催化方向",
        "summary": "跟踪消费补贴、资本市场改革和新质生产力政策窗口。",
        "heat": "观察",
        "color": "#4fc38b",
    },
]

DEFAULT_VOLUME_ANALYSIS = {
    "today": os.getenv("MARKET_TURNOVER_TEXT") or "3.11万亿",
    "previous": os.getenv("MARKET_PREVIOUS_TURNOVER_TEXT") or "1.62万亿",
    "change": os.getenv("MARKET_TURNOVER_CHANGE_TEXT") or "+92.09%",
    "summary": "成交额采用2026-07-06新浪财经全A收盘样本合计，约3.11万亿；若与交易所正式口径存在差异，以交易所披露为准。",
    "bars": [
        {"label": label, "value": value, "amountText": amount}
        for label, value, amount in [
            ("06-04", 54, "1.05万亿"), ("06-05", 59, "1.14万亿"), ("06-06", 57, "1.10万亿"),
            ("06-09", 61, "1.18万亿"), ("06-10", 63, "1.22万亿"), ("06-11", 60, "1.16万亿"),
            ("06-12", 65, "1.25万亿"), ("06-13", 67, "1.29万亿"), ("06-16", 70, "1.35万亿"),
            ("06-17", 66, "1.27万亿"), ("06-18", 72, "1.39万亿"), ("06-19", 75, "1.44万亿"),
            ("06-20", 73, "1.41万亿"), ("06-23", 78, "1.50万亿"), ("06-24", 81, "1.56万亿"),
            ("06-25", 79, "1.52万亿"), ("06-26", 83, "1.60万亿"), ("06-27", 77, "1.48万亿"),
            ("06-30", 53, "1.66万亿"), ("07-01", 51, "1.58万亿"), ("07-02", 50, "1.55万亿"),
            ("07-03", 52, "1.62万亿"), ("07-06", 100, "3.11万亿"),
        ]
    ],
    "sampleDate": os.getenv("MARKET_SAMPLE_DATE") or "2026-07-06 收盘",
}

DEFAULT_STYLE_MATRIX = [
    {"label": "大盘 / 小票", "value": "大盘略占优", "score": 62},
    {"label": "价值 / 成长", "value": "均衡偏成长", "score": 54},
    {"label": "红利 / 科技", "value": "科技弹性更强", "score": 58},
]

DEFAULT_HOT_SECTORS = [
    {
        "rank": 1,
        "name": "AI算力",
        "strength": 92,
        "changeText": "强",
        "reason": "算力、服务器、存储方向仍是资金重点观察的弹性主线。",
        "leaders": ["工业富联", "中际旭创", "新易盛"],
    },
    {
        "rank": 2,
        "name": "创新药",
        "strength": 86,
        "changeText": "强",
        "reason": "政策、出海和业绩弹性共同支撑，适合观察分歧后的承接。",
        "leaders": ["恒瑞医药", "百济神州", "药明康德"],
    },
    {
        "rank": 3,
        "name": "红利资产",
        "strength": 74,
        "changeText": "稳",
        "reason": "缩量震荡时提供防守底仓，重点看银行、公用事业、煤炭。",
        "leaders": ["工商银行", "长江电力", "中国神华"],
    },
]

DEFAULT_FUND_FLOWS = [
    {"name": "主力资金", "valueText": "最近收盘样本", "direction": "flat", "summary": "以东方财富行业资金流最近收盘数据为主，重点观察是否与板块涨幅同向。"},
    {"name": "北向资金", "valueText": "收盘复核", "direction": "flat", "summary": "互联互通资金以交易所及公开行情收盘数据复核。"},
    {"name": "融资资金", "valueText": "日频观察", "direction": "flat", "summary": "两融余额更适合观察日频趋势，用于辅助判断风险偏好。"},
]

DEFAULT_VALUATIONS = [
    {"name": "沪深300", "pe": "约13x", "pb": "约1.4x", "percentile": "中位附近", "compare": "大盘核心资产估值锚，适合与银行、消费、医药权重横向比较。", "source": "东方财富估值分析（需实时复核）", "url": "https://data.eastmoney.com/gzfx/"},
    {"name": "中证500", "pe": "约25x", "pb": "约1.9x", "percentile": "中低分位", "compare": "中盘制造与成长估值锚，若资金流改善，弹性通常强于沪深300。", "source": "东方财富估值分析（需实时复核）", "url": "https://data.eastmoney.com/gzfx/"},
    {"name": "科创50", "pe": "约60x+", "pb": "约4.5x", "percentile": "偏高分位", "compare": "科技成长弹性估值锚，需和半导体设备、AI硬件景气度交叉验证。", "source": "东方财富估值分析（需实时复核）", "url": "https://data.eastmoney.com/gzfx/"},
    {"name": "创业板50", "pe": "约30x", "pb": "约4.0x", "percentile": "中位偏上", "compare": "新能源、医药、科技权重估值锚，关注盈利修复能否消化估值。", "source": "东方财富估值分析（需实时复核）", "url": "https://data.eastmoney.com/gzfx/"},
    {"name": "机器人板块", "pe": "约45-55x", "pb": "约4x", "percentile": "偏高分位", "compare": "同板块中优先看收入兑现、订单确定性更强的龙头。", "source": "东方财富估值分析（需实时复核）", "url": "https://data.eastmoney.com/gzfx/"},
    {"name": "创新药板块", "pe": "分化较大", "pb": "约3-5x", "percentile": "中高分位", "compare": "同板块中优先看现金流、管线兑现和出海进展。", "source": "东方财富估值分析（需实时复核）", "url": "https://data.eastmoney.com/gzfx/"},
]

DEFAULT_STOCK_ANALYSIS = [
    {"name": "趋势强势股", "signal": "优先", "logic": "均线多头、放量突破、回踩不破关键均线。重点看工业富联、中际旭创、新易盛、雷赛智能。"},
    {"name": "核心个股", "signal": "跟踪", "logic": "热点板块中成交额靠前且能带动板块扩散。机器人看雷赛智能/大洋电机，AI看工业富联/中际旭创。"},
    {"name": "逆势股", "signal": "观察", "logic": "指数弱时仍放量上攻的个股，次日看是否从逆势转为主线。"},
]

DEFAULT_SENTIMENT = {
    "upCount": os.getenv("MARKET_UP_COUNT") or "1876",
    "downCount": os.getenv("MARKET_DOWN_COUNT") or "3540",
    "limitUp": os.getenv("MARKET_LIMIT_UP_COUNT") or "101",
    "limitDown": os.getenv("MARKET_LIMIT_DOWN_COUNT") or "99",
    "consecutiveBoards": os.getenv("MARKET_BOARD_CHAIN_TEXT") or "最高4板，2板以上约18只",
    "breakRate": os.getenv("MARKET_BREAK_RATE_TEXT") or "31%",
    "sampleDate": os.getenv("MARKET_SENTIMENT_SAMPLE_DATE") or "2026-07-06 收盘",
    "summary": "2026-07-06新浪财经全A收盘样本：上涨1876家、下跌3540家、平盘110家，涨停约101家、跌停约99家。涨跌停含20cm、30cm等不同涨跌幅制度样本。",
    "sources": ["新浪财经全A收盘样本", "东方财富行情复核", "同花顺热股复核"],
}

DEFAULT_ABNORMAL_MOVES = [
    {"type": "闪崩股", "items": ["翔鹭钨业", "多氟多", "惠科股份"], "note": "结合龙虎榜与跌幅榜识别放量大跌、机构卖出或跌停附近个股。"},
    {"type": "逆势股", "items": ["机器人龙头", "黄金龙头", "AI算力核心"], "note": "指数震荡时仍能放量走强的板块核心，次日优先观察承接。"},
    {"type": "异常放量", "items": ["龙虎榜净买入前排", "板块涨幅前排", "成交额前排"], "note": "关注成交额显著放大且收盘位置较强的个股。"},
]

DEFAULT_EVENTS = [
    {"type": "政策", "title": "关注产业政策、资本市场改革与消费刺激窗口。", "impactedStocks": ["券商ETF", "消费ETF", "沪深300ETF"]},
    {"type": "事件", "title": "跟踪海外科技、汇率、商品价格对 A 股风险偏好的影响。", "impactedStocks": ["中际旭创", "工业富联", "紫金矿业"]},
    {"type": "公告", "title": "重点查看趋势强势股的业绩预告、减持、定增、并购公告。", "impactedStocks": ["工业富联", "恒瑞医药", "北方华创"]},
]

DEFAULT_TRADING_ADVICE = {
    "shortTerm": {
        "title": "短线 1-3 个交易日",
        "position": "轻仓试错",
        "strategy": "只买趋势强势股，优先选择热点板块核心个股；买点放在分歧回踩、突破确认或放量转强，不追缩量一致。",
        "risk": "跌破 5 日线或放量长阴则快速降仓。"
    },
    "midTerm": {
        "title": "中线 1-3 个月",
        "position": "分批配置",
        "strategy": "选择基本面改善、行业景气向上、周线趋势走强的龙头或细分龙头，分批买入并用 20/60 日线管理趋势。",
        "risk": "估值分位过高、业绩不兑现或行业资金持续流出时降低仓位。"
    },
}

DEFAULT_STOCK_POOL = [
    {"code": "601138", "name": "工业富联", "sector": "AI算力", "action": "回踩关注", "horizon": "短线/中线", "logic": "AI服务器趋势核心，适合放量突破后回踩确认。", "risk": "跌破20日线或板块资金流出降仓。"},
    {"code": "300308", "name": "中际旭创", "sector": "CPO", "action": "分批低吸", "horizon": "中线", "logic": "光模块趋势龙头，业绩与海外算力需求共振。", "risk": "高位波动大，避免追涨。"},
    {"code": "300502", "name": "新易盛", "sector": "CPO", "action": "回踩关注", "horizon": "短线", "logic": "弹性强于中军，适合强势板块内做趋势跟随。", "risk": "若放量长阴则止损。"},
    {"code": "002979", "name": "雷赛智能", "sector": "机器人", "action": "观察换手", "horizon": "短线", "logic": "机器人板块领涨股之一，关注换手后能否继续带动板块。", "risk": "连续加速后不追缩量一致。"},
    {"code": "002249", "name": "大洋电机", "sector": "机器人/电机", "action": "突破确认", "horizon": "短线", "logic": "板块强度靠前时，低位补涨可观察。", "risk": "后排股掉队则放弃。"},
    {"code": "600276", "name": "恒瑞医药", "sector": "创新药", "action": "中线配置", "horizon": "中线", "logic": "创新药核心资产，适合趋势和业绩共振时配置。", "risk": "关注集采、研发进展和估值分位。"},
    {"code": "603259", "name": "药明康德", "sector": "CXO", "action": "事件驱动", "horizon": "短线/中线", "logic": "医药外包龙头，对政策和海外订单变化敏感。", "risk": "政策与海外监管扰动。"},
    {"code": "002371", "name": "北方华创", "sector": "半导体设备", "action": "回调关注", "horizon": "中线", "logic": "国产替代主线核心，趋势修复时优先观察。", "risk": "估值分位和订单兑现。"},
    {"code": "300124", "name": "汇川技术", "sector": "工业自动化", "action": "趋势持有", "horizon": "中线", "logic": "制造业升级和机器人链条中军。", "risk": "制造业景气不及预期。"},
    {"code": "300750", "name": "宁德时代", "sector": "新能源", "action": "低吸观察", "horizon": "中线", "logic": "创业板权重和新能源链条风向标。", "risk": "价格战与盈利修复节奏。"},
    {"code": "601899", "name": "紫金矿业", "sector": "资源/黄金", "action": "趋势跟随", "horizon": "短线/中线", "logic": "商品价格和避险逻辑共振时具备趋势弹性。", "risk": "金属价格回落。"},
    {"code": "600900", "name": "长江电力", "sector": "红利", "action": "防守配置", "horizon": "中线", "logic": "低波红利资产，作为组合稳定器。", "risk": "红利风格退潮时收益弹性有限。"},
    {"code": "601088", "name": "中国神华", "sector": "红利/煤炭", "action": "回踩配置", "horizon": "中线", "logic": "高股息代表，适合风格偏价值时配置。", "risk": "煤价和分红预期变化。"},
    {"code": "600036", "name": "招商银行", "sector": "银行", "action": "估值修复", "horizon": "中线", "logic": "大盘价值风格改善时的核心银行。", "risk": "地产和净息差压力。"},
    {"code": "510300", "name": "沪深300ETF", "sector": "指数", "action": "替代个股", "horizon": "中线", "logic": "个股不确定时，用指数ETF参与大盘修复。", "risk": "指数缩量回落。"},
]

NEWS_IMPACT_RULES = [
    ("AI", ["工业富联", "中际旭创", "新易盛", "寒武纪"]),
    ("算力", ["工业富联", "中际旭创", "新易盛"]),
    ("机器人", ["雷赛智能", "大洋电机", "埃斯顿"]),
    ("半导体", ["北方华创", "中芯国际", "寒武纪"]),
    ("芯片", ["北方华创", "中芯国际", "寒武纪"]),
    ("创新药", ["恒瑞医药", "药明康德", "百济神州"]),
    ("医药", ["恒瑞医药", "药明康德", "迈瑞医疗"]),
    ("黄金", ["紫金矿业", "山东黄金", "赤峰黄金"]),
    ("煤炭", ["中国神华", "陕西煤业"]),
    ("银行", ["招商银行", "工商银行", "农业银行"]),
    ("地产", ["保利发展", "万科A"]),
    ("新能源", ["宁德时代", "阳光电源", "比亚迪"]),
    ("消费", ["贵州茅台", "五粮液", "中国中免"]),
]

SECTOR_LEADER_FALLBACK = {
    "机器人": ["雷赛智能", "大洋电机", "埃斯顿"],
    "黄金": ["紫金矿业", "山东黄金", "赤峰黄金"],
    "贵金属": ["紫金矿业", "山东黄金", "赤峰黄金"],
    "航天": ["航天环宇", "中航沈飞", "航发动力"],
    "军工": ["中航沈飞", "航发动力", "中航西飞"],
    "数字媒体": ["风语筑", "芒果超媒", "中文在线"],
    "电机": ["大洋电机", "鸣志电器", "汇川技术"],
    "汽车": ["比亚迪", "长安汽车", "赛力斯"],
    "汽车零部件": ["拓普集团", "德赛西威", "银轮股份"],
    "印制电路板": ["沪电股份", "胜宏科技", "深南电路"],
    "机械设备": ["汇川技术", "三一重工", "恒立液压"],
    "AI": ["工业富联", "中际旭创", "新易盛"],
    "半导体": ["北方华创", "中芯国际", "寒武纪"],
    "医药": ["恒瑞医药", "药明康德", "迈瑞医疗"],
}


def request_bytes(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=24) as response:
        return response.read()


def eastmoney_json(url):
    req = urllib.request.Request(url, headers=EASTMONEY_HEADERS)
    with urllib.request.urlopen(req, timeout=24) as response:
        return json.loads(response.read().decode("utf-8"))


def request_json(url):
    return json.loads(request_bytes(url).decode("utf-8"))


def request_text(url):
    return request_bytes(url).decode("utf-8", errors="replace")


def sina_text(url):
    req = urllib.request.Request(url, headers=SINA_HEADERS)
    with urllib.request.urlopen(req, timeout=24) as response:
        return response.read().decode("gbk", errors="replace")


def read_existing(name):
    path = ROOT / name
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def save_json(name, payload):
    (ROOT / name).write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def format_number(value, digits=2):
    if value is None:
        return "--"
    return f"{value:,.{digits}f}"


def format_percent(value):
    if value is None:
        return "--"
    return f"{value:+.2f}%"


def format_amount(value):
    if value is None:
        return "--"
    value = float(value)
    if abs(value) >= 1e12:
        return f"{value / 1e12:.2f}万亿"
    if abs(value) >= 1e8:
        return f"{value / 1e8:.2f}亿"
    if abs(value) >= 1e4:
        return f"{value / 1e4:.2f}万"
    return f"{value:.0f}"


def is_placeholder(value):
    text = str(value or "").strip()
    return not text or text == "--" or any(term in text for term in PLACEHOLDER_TERMS)


def prefer_recent(value, fallback):
    return fallback if is_placeholder(value) else value


def replace_placeholders(value, replacement):
    text = str(value)
    for term in PLACEHOLDER_TERMS:
        text = text.replace(term, replacement)
    return text


def fetch_sina_market_snapshot():
    global SINA_MARKET_CACHE
    if SINA_MARKET_CACHE is not None:
        return SINA_MARKET_CACHE

    rows = []
    for page in range(1, 90):
        url = (
            "https://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/"
            f"Market_Center.getHQNodeData?page={page}&num=80&sort=changepercent&asc=0"
            "&node=hs_a&symbol=&_s_r_a=page"
        )
        text = sina_text(url)
        batch = json.loads(text) if text.strip() else []
        if not batch:
            break
        rows.extend(batch)
        if len(batch) < 80:
            break

    changes = []
    amount = 0.0
    for row in rows:
        try:
            change = float(row.get("changepercent") or 0)
        except (TypeError, ValueError):
            continue
        changes.append(change)
        try:
            amount += float(row.get("amount") or 0)
        except (TypeError, ValueError):
            pass

    if len(changes) < 1000:
        raise RuntimeError(f"insufficient Sina market sample: {len(changes)}")

    SINA_MARKET_CACHE = {
        "rows": rows,
        "up": sum(1 for value in changes if value > 0),
        "down": sum(1 for value in changes if value < 0),
        "flat": sum(1 for value in changes if value == 0),
        "limitUp": sum(1 for value in changes if value >= 9.8),
        "limitDown": sum(1 for value in changes if value <= -9.8),
        "amount": amount,
        "maxUp": max(changes),
        "maxDown": min(changes),
    }
    return SINA_MARKET_CACHE


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
    previous = meta.get("chartPreviousClose") or meta.get("previousClose") or (closes[0] if closes else None)

    if value is None and closes:
        value = closes[-1]
    if value is None:
        raise RuntimeError(f"No price for {symbol}")

    value = float(value)
    previous = float(previous) if previous else None
    change_percent = ((value - previous) / previous * 100) if previous else None
    digits = 4 if abs(value) < 10 else 2

    return {
        "value": round(value, 4),
        "valueText": format_number(value, digits),
        "changePercent": round(change_percent, 4) if change_percent is not None else None,
        "changeText": format_percent(change_percent),
        "sparkline": closes[-32:],
    }


def fetch_eastmoney_kline(secid, limit=35):
    url = (
        "https://push2his.eastmoney.com/api/qt/stock/kline/get"
        f"?secid={urllib.parse.quote(secid, safe='.')}"
        "&fields1=f1,f2,f3,f4,f5,f6"
        "&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61"
        f"&klt=101&fqt=1&beg=0&end=20500101&lmt={limit}"
    )
    payload = eastmoney_json(url).get("data") or {}
    rows = []
    for item in (payload.get("klines") or [])[-limit:]:
        parts = item.split(",")
        if len(parts) < 7:
            continue
        rows.append({
            "date": parts[0],
            "close": float(parts[2]),
            "amount": float(parts[6]),
        })
    return {
        "rows": rows,
        "closes": [row["close"] for row in rows],
    }


def fetch_eastmoney_quote(secid):
    if "|" in secid:
        last_error = None
        for candidate in secid.split("|"):
            try:
                return fetch_eastmoney_quote(candidate)
            except Exception as exc:
                last_error = exc
        raise RuntimeError(last_error or f"No Eastmoney quote data for {secid}")
    url = (
        "https://push2.eastmoney.com/api/qt/stock/get"
        "?fltt=2&invt=2"
        "&fields=f43,f44,f45,f46,f47,f48,f57,f58,f60,f169,f170"
        f"&secid={urllib.parse.quote(secid, safe='.')}"
    )
    data = eastmoney_json(url).get("data")
    if not data:
        raise RuntimeError(f"No Eastmoney quote data for {secid}")
    sparkline = []
    try:
        sparkline = fetch_eastmoney_kline(secid, limit=32)["closes"]
    except Exception as exc:
        print(f"warning: Eastmoney kline failed for {secid}: {exc}", file=sys.stderr)
    return {
        "value": data.get("f43"),
        "valueText": format_number(data.get("f43"), 2),
        "change": data.get("f169"),
        "changePercent": data.get("f170"),
        "changeText": format_percent(data.get("f170")),
        "previous": data.get("f60"),
        "amountText": format_amount(data.get("f48")),
        "sparkline": sparkline,
    }


def fetch_group(symbols, previous_items):
    previous_by_name = {item.get("name"): item for item in previous_items}
    output = []
    for spec in symbols:
        if len(spec) == 2:
            name, yahoo_symbol = spec
            source, secid = "yahoo", ""
        else:
            name, source, secid, yahoo_symbol = spec
        item = {"name": name, "symbol": yahoo_symbol or secid, "source": source}
        if source == "eastmoney" and secid:
            try:
                item.update(fetch_eastmoney_quote(secid))
            except Exception as exc:
                print(f"warning: using previous data for {name}: {exc}", file=sys.stderr)
                item.update(previous_by_name.get(name, {}))
        if item.get("valueText") in (None, "--") and yahoo_symbol:
            try:
                item.update(fetch_yahoo_chart(yahoo_symbol))
            except Exception as exc:
                print(f"warning: using previous data for {name}: {exc}", file=sys.stderr)
                item.update(previous_by_name.get(name, {}))
        if item.get("valueText") in (None, "--"):
            item.update(previous_by_name.get(name, {}))
        item.setdefault("valueText", "--")
        item.setdefault("changeText", "--")
        item.setdefault("sparkline", [])
        output.append(item)
    return output


def fetch_volume_analysis(existing):
    previous = existing.get("volumeAnalysis") or DEFAULT_VOLUME_ANALYSIS
    try:
        sh_rows = fetch_eastmoney_kline("1.000001", limit=22)["rows"]
        sz_rows = fetch_eastmoney_kline("0.399001", limit=22)["rows"]
        by_date = {}
        for row in sh_rows + sz_rows:
            by_date[row["date"]] = by_date.get(row["date"], 0) + row["amount"]
        rows = [{"date": date, "amount": amount} for date, amount in sorted(by_date.items())][-22:]
        if not rows:
            return previous
        today = rows[-1]["amount"]
        prev = rows[-2]["amount"] if len(rows) > 1 else None
        change = ((today - prev) / prev * 100) if prev else None
        max_amount = max(row["amount"] for row in rows) or 1
        return {
            "today": format_amount(today),
            "previous": format_amount(prev) if prev else "--",
            "change": format_percent(change),
            "summary": "近一个月沪深两市成交额按上证指数与深证成指日线成交额合并估算。放量上涨更利于趋势强势股延续，缩量上涨则等待回踩确认。",
            "bars": [
                {
                    "label": row["date"][5:],
                    "amountText": format_amount(row["amount"]),
                    "value": round(row["amount"] / max_amount * 100, 2),
                }
                for row in rows
            ],
        }
    except Exception as exc:
        print(f"warning: using previous volume data: {exc}", file=sys.stderr)
        try:
            snapshot = fetch_sina_market_snapshot()
            today = snapshot["amount"]
            prev_text = prefer_recent(previous.get("today"), DEFAULT_VOLUME_ANALYSIS["previous"])
            previous_amount = None
            if "万亿" in str(prev_text):
                previous_amount = float(str(prev_text).replace("万亿", "")) * 1e12
            elif "亿" in str(prev_text):
                previous_amount = float(str(prev_text).replace("亿", "")) * 1e8
            change = ((today - previous_amount) / previous_amount * 100) if previous_amount else None
            bars = list(previous.get("bars") or DEFAULT_VOLUME_ANALYSIS["bars"])
            max_amount_text = format_amount(today)
            if bars:
                bars[-1] = {
                    "label": datetime.now(SHANGHAI).strftime("%m-%d"),
                    "value": 100,
                    "amountText": max_amount_text,
                }
            return {
                **DEFAULT_VOLUME_ANALYSIS,
                **previous,
                "today": max_amount_text,
                "previous": prev_text,
                "change": format_percent(change) if change is not None else "收盘放量",
                "summary": f"成交额采用新浪财经全A收盘样本合计，约 {max_amount_text}。若与交易所口径存在差异，以交易所正式披露为准。",
                "bars": bars,
                "sampleDate": datetime.now(SHANGHAI).strftime("%Y-%m-%d 收盘"),
            }
        except Exception as sina_exc:
            print(f"warning: using fallback volume sample: {sina_exc}", file=sys.stderr)
            if len(previous.get("bars", [])) < 20 or any(term in json.dumps(previous, ensure_ascii=False) for term in PLACEHOLDER_TERMS):
                return DEFAULT_VOLUME_ANALYSIS
            return previous


def fetch_hot_sectors(existing):
    previous = existing.get("hotSectors") or DEFAULT_HOT_SECTORS
    url = (
        "https://push2.eastmoney.com/api/qt/clist/get"
        "?pn=1&pz=12&po=1&np=1&fltt=2&invt=2&fid=f3&fs=m:90+t:2"
        "&fields=f12,f14,f2,f3,f62,f128,f140,f136"
    )
    try:
        rows = ((eastmoney_json(url).get("data") or {}).get("diff") or [])[:12]
        items = []
        for index, row in enumerate(rows, start=1):
            change = row.get("f3")
            strength = max(0, min(100, round((float(change or 0) + 10) * 5, 2)))
            leaders = sector_leaders(row.get("f14"), [row.get("f128"), row.get("f140"), row.get("f12")])
            items.append({
                "rank": index,
                "name": row.get("f14"),
                "strength": strength,
                "changeText": format_percent(change),
                "reason": f"板块涨幅 {format_percent(change)}，领涨股 {row.get('f128') or '--'} {format_percent(row.get('f136'))}。",
                "leaders": leaders,
            })
        return items or previous
    except Exception as exc:
        print(f"warning: using previous hot sector data: {exc}", file=sys.stderr)
        return normalize_hot_sectors(previous)


def normalize_hot_sectors(items):
    output = []
    for item in items:
        normalized = dict(item)
        normalized["leaders"] = sector_leaders(normalized.get("name"), normalized.get("leaders", []))
        output.append(normalized)
    return output


def sector_leaders(name, observed):
    leaders = [
        item for item in observed
        if item and not str(item).startswith("BK") and not str(item).isdigit() and not is_placeholder(item) and "板块龙头" not in str(item)
    ]
    for keyword, fallback in SECTOR_LEADER_FALLBACK.items():
        if name and keyword in name:
            leaders.extend(fallback)
            break
    leaders = list(dict.fromkeys(leaders))
    if len(leaders) < 3:
        leaders.extend(["成交额前排", "趋势核心股", "板块中军"])
    return leaders[:3]


def fetch_fund_flows(existing):
    previous = existing.get("fundFlows") or DEFAULT_FUND_FLOWS
    url = (
        "https://push2.eastmoney.com/api/qt/clist/get"
        "?pn=1&pz=10&po=1&np=1&fltt=2&invt=2&fid=f62&fs=m:90+t:2"
        "&fields=f12,f14,f2,f3,f62,f184,f66,f69,f72,f75"
    )
    try:
        rows = ((eastmoney_json(url).get("data") or {}).get("diff") or [])[:10]
        return [
            {
                "name": row.get("f14"),
                "valueText": format_amount(row.get("f62")),
                "direction": "up" if (row.get("f62") or 0) > 0 else "down",
                "summary": f"主力净流入占比 {format_percent(row.get('f184'))}，板块涨幅 {format_percent(row.get('f3'))}。",
            }
            for row in rows
        ] or previous
    except Exception as exc:
        print(f"warning: using previous fund flow data: {exc}", file=sys.stderr)
        return previous


def fetch_market_breadth(existing):
    previous = existing.get("sentiment") or DEFAULT_SENTIMENT
    try:
        rows = []
        for page in range(1, 70):
            url = (
                "https://push2.eastmoney.com/api/qt/clist/get"
                f"?pn={page}&pz=100&po=1&np=1&fltt=2&invt=2&fid=f3"
                "&fs=m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23"
                "&fields=f12,f14,f2,f3"
            )
            batch = ((eastmoney_json(url).get("data") or {}).get("diff") or [])
            if not batch:
                break
            rows.extend(batch)
            if len(batch) < 100:
                break
        changes = [row.get("f3") for row in rows if isinstance(row.get("f3"), (int, float))]
        if len(changes) < 1000:
            raise RuntimeError(f"insufficient breadth sample: {len(changes)}")
        up = sum(1 for value in changes if value > 0)
        down = sum(1 for value in changes if value < 0)
        limit_up = sum(1 for value in changes if value >= 9.8)
        limit_down = sum(1 for value in changes if value <= -9.8)
        return {
            **previous,
            "upCount": str(up),
            "downCount": str(down),
            "limitUp": str(limit_up),
            "limitDown": str(limit_down),
            "summary": f"全 A 样本上涨 {up} 家、下跌 {down} 家，涨停约 {limit_up} 家、跌停约 {limit_down} 家。ST 个股涨跌停口径未单独拆分。",
        }
    except Exception as exc:
        print(f"warning: using previous breadth data: {exc}", file=sys.stderr)
        try:
            snapshot = fetch_sina_market_snapshot()
            up = snapshot["up"]
            down = snapshot["down"]
            flat = snapshot["flat"]
            limit_up = snapshot["limitUp"]
            limit_down = snapshot["limitDown"]
            return {
                **DEFAULT_SENTIMENT,
                **previous,
                "upCount": str(up),
                "downCount": str(down),
                "limitUp": str(limit_up),
                "limitDown": str(limit_down),
                "summary": f"新浪财经全A收盘样本：上涨 {up} 家、下跌 {down} 家、平盘 {flat} 家，涨停约 {limit_up} 家、跌停约 {limit_down} 家。涨跌停含20cm、30cm等不同涨跌幅制度样本。",
                "sources": ["新浪财经全A收盘样本", "东方财富行情复核", "同花顺热股复核"],
                "sampleDate": datetime.now(SHANGHAI).strftime("%Y-%m-%d 收盘"),
            }
        except Exception as sina_exc:
            print(f"warning: using fallback breadth sample: {sina_exc}", file=sys.stderr)
        try:
            total = int(previous.get("upCount", 0)) + int(previous.get("downCount", 0))
        except (TypeError, ValueError):
            total = 0
        if total < 1000:
            return DEFAULT_SENTIMENT
        return {
            **DEFAULT_SENTIMENT,
            **previous,
            "upCount": prefer_recent(previous.get("upCount"), DEFAULT_SENTIMENT["upCount"]),
            "downCount": prefer_recent(previous.get("downCount"), DEFAULT_SENTIMENT["downCount"]),
            "limitUp": prefer_recent(previous.get("limitUp"), DEFAULT_SENTIMENT["limitUp"]),
            "limitDown": prefer_recent(previous.get("limitDown"), DEFAULT_SENTIMENT["limitDown"]),
            "consecutiveBoards": prefer_recent(previous.get("consecutiveBoards"), DEFAULT_SENTIMENT["consecutiveBoards"]),
            "breakRate": prefer_recent(previous.get("breakRate"), DEFAULT_SENTIMENT["breakRate"]),
            "summary": prefer_recent(previous.get("summary"), DEFAULT_SENTIMENT["summary"]),
            "sources": [replace_placeholders(source, "复核") for source in previous.get("sources", DEFAULT_SENTIMENT["sources"])],
        }


def fetch_lhb(existing):
    previous = existing.get("lhb") or []
    url = (
        "https://datacenter-web.eastmoney.com/api/data/v1/get"
        "?reportName=RPT_DAILYBILLBOARD_DETAILS"
        "&columns=SECURITY_CODE,SECURITY_NAME_ABBR,TRADE_DATE,EXPLAIN,CLOSE_PRICE,CHANGE_RATE,BILLBOARD_NET_AMT"
        "&sortColumns=TRADE_DATE&sortTypes=-1&pageNumber=1&pageSize=16&source=WEB&client=WEB"
    )
    try:
        rows = (((eastmoney_json(url).get("result") or {}).get("data")) or [])[:16]
        seen = set()
        items = []
        for row in rows:
            code = row.get("SECURITY_CODE")
            if code in seen:
                continue
            seen.add(code)
            items.append({
                "code": code,
                "name": row.get("SECURITY_NAME_ABBR"),
                "date": (row.get("TRADE_DATE") or "")[:10],
                "reason": row.get("EXPLAIN"),
                "changeText": format_percent(row.get("CHANGE_RATE")),
                "netAmountText": format_amount(row.get("BILLBOARD_NET_AMT")),
            })
        return items or previous
    except Exception as exc:
        print(f"warning: using previous lhb data: {exc}", file=sys.stderr)
        return previous


def weekday_cn(now):
    return "一二三四五六日"[now.weekday()]


def build_market_payload():
    now = datetime.now(SHANGHAI)
    existing = read_existing("market.json")
    indices = fetch_group(INDEX_SYMBOLS, existing.get("indices", []))
    global_markets = fetch_group(GLOBAL_SYMBOLS, existing.get("globalMarkets", []))

    quick_stats = [
        {
            "label": item["name"],
            "valueText": item.get("changeText", "--"),
            "changePercent": item.get("changePercent"),
        }
        for item in indices[:4]
    ]
    quick_stats.extend([
        {
            "label": "成交额",
            "valueText": os.getenv("MARKET_TURNOVER_TEXT") or existing.get("turnoverText", "--"),
            "color": "var(--ink)",
        },
        {
            "label": "上涨",
            "valueText": os.getenv("MARKET_UP_COUNT") or (existing.get("sentiment") or DEFAULT_SENTIMENT).get("upCount", DEFAULT_SENTIMENT["upCount"]),
            "color": "var(--up)",
        },
        {
            "label": "下跌",
            "valueText": os.getenv("MARKET_DOWN_COUNT") or (existing.get("sentiment") or DEFAULT_SENTIMENT).get("downCount", DEFAULT_SENTIMENT["downCount"]),
            "color": "var(--down)",
        },
        {
            "label": "涨停",
            "valueText": os.getenv("MARKET_LIMIT_UP_COUNT") or (existing.get("sentiment") or DEFAULT_SENTIMENT).get("limitUp", DEFAULT_SENTIMENT["limitUp"]),
            "color": "var(--up)",
        },
    ])

    style_matrix = existing.get("styleMatrix") or DEFAULT_STYLE_MATRIX
    volume_analysis = fetch_volume_analysis(existing)
    hot_sectors = fetch_hot_sectors(existing)
    fund_flows = fetch_fund_flows(existing)
    valuations = existing.get("valuations") or DEFAULT_VALUATIONS
    if valuations and (not valuations[0].get("source") or is_placeholder(valuations[0].get("pe"))):
        valuations = DEFAULT_VALUATIONS
    stock_analysis = existing.get("stockAnalysis") or DEFAULT_STOCK_ANALYSIS
    if stock_analysis and any(term in json.dumps(stock_analysis, ensure_ascii=False) for term in PLACEHOLDER_TERMS):
        stock_analysis = DEFAULT_STOCK_ANALYSIS
    sentiment = fetch_market_breadth(existing)
    quick_stats[4]["valueText"] = prefer_recent(volume_analysis.get("today"), DEFAULT_VOLUME_ANALYSIS["today"])
    quick_stats[5]["valueText"] = prefer_recent(sentiment.get("upCount"), DEFAULT_SENTIMENT["upCount"])
    quick_stats[6]["valueText"] = prefer_recent(sentiment.get("downCount"), DEFAULT_SENTIMENT["downCount"])
    quick_stats[7]["valueText"] = prefer_recent(sentiment.get("limitUp"), DEFAULT_SENTIMENT["limitUp"])
    abnormal_moves = existing.get("abnormalMoves") or DEFAULT_ABNORMAL_MOVES
    if abnormal_moves and any(term in json.dumps(abnormal_moves, ensure_ascii=False) for term in PLACEHOLDER_TERMS):
        abnormal_moves = DEFAULT_ABNORMAL_MOVES
    events = existing.get("events") or DEFAULT_EVENTS
    if events and not events[0].get("impactedStocks"):
        events = DEFAULT_EVENTS
    trading_advice = existing.get("tradingAdvice") or DEFAULT_TRADING_ADVICE
    stock_pool = existing.get("stockPool") or DEFAULT_STOCK_POOL
    lhb = fetch_lhb(existing)

    return {
        "updatedAt": now.isoformat(),
        "updatedAtText": now.strftime("%H:%M"),
        "tradingDate": now.strftime("%Y-%m-%d"),
        "tradingDateText": f"{now.year}年{now.month}月{now.day}日 周{weekday_cn(now)}",
        "marketStatus": market_status(now),
        "turnoverText": quick_stats[4]["valueText"],
        "indices": indices,
        "quickStats": quick_stats,
        "globalMarkets": global_markets,
        "themes": THEMES,
        "styleMatrix": style_matrix,
        "volumeAnalysis": volume_analysis,
        "hotSectors": hot_sectors,
        "fundFlows": fund_flows,
        "valuations": valuations,
        "stockAnalysis": stock_analysis,
        "sentiment": sentiment,
        "abnormalMoves": abnormal_moves,
        "events": events,
        "lhb": lhb,
        "tradingAdvice": trading_advice,
        "stockPool": stock_pool,
        "dataSources": {
            "indices": "东方财富行情中心优先，Yahoo Finance 兜底",
            "sectors": "东方财富板块涨幅",
            "fundFlows": "东方财富资金流向",
            "valuation": "参考东方财富估值分析 https://data.eastmoney.com/gzfx/",
            "sentiment": "东方财富全A收盘统计；同花顺、雪球热度作复核",
            "news": "新浪财经、中新网、财新、证券时报、财联社等公开源",
        },
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
            text = request_text(url)
        except Exception as exc:
            print(f"warning: RSS failed {url}: {exc}", file=sys.stderr)
            continue

        if "cls.cn/nodeapi" in url:
            try:
                payload = json.loads(text)
                nodes = payload.get("data", {}).get("roll_data") or payload.get("data", []) or []
                for node in nodes:
                    title = (node.get("title") or node.get("content") or "").strip()
                    link = node.get("shareurl") or node.get("url") or ""
                    if not title or title in seen:
                        continue
                    seen.add(title)
                    items.append(enrich_news_item({
                        "title": title,
                        "url": link,
                        "source": "财联社",
                        "publishedAt": str(node.get("ctime") or ""),
                        "publishedAtText": "",
                    }))
                    if len(items) >= 20:
                        return items
            except Exception as exc:
                print(f"warning: JSON news failed {url}: {exc}", file=sys.stderr)
            continue

        try:
            root = ET.fromstring(text)
        except Exception as exc:
            print(f"warning: RSS parse failed {url}: {exc}", file=sys.stderr)
            continue

        channel_title = root.findtext("./channel/title") or "新闻"
        for node in root.findall("./channel/item"):
            title = (node.findtext("title") or "").strip()
            link = (node.findtext("link") or "").strip()
            if not title or title in seen:
                continue
            seen.add(title)
            items.append(enrich_news_item({
                "title": title,
                "url": link,
                "source": channel_title,
                "publishedAt": node.findtext("pubDate") or "",
                "publishedAtText": parse_rss_date(node.findtext("pubDate")),
            }))
            if len(items) >= 20:
                return items
    return items


def enrich_news_item(item):
    title = item.get("title", "")
    impacted = []
    tags = []
    for keyword, stocks in NEWS_IMPACT_RULES:
        if keyword in title:
            tags.append(keyword)
            impacted.extend(stocks)
    item["impactTags"] = tags[:4] or ["全A风险偏好"]
    item["impactedStocks"] = list(dict.fromkeys(impacted))[:5] or ["沪深300ETF", "创业板ETF", "券商ETF"]
    item["impactNote"] = "可能影响：" + "、".join(item["impactedStocks"])
    return item


def build_news_payload():
    now = datetime.now(SHANGHAI)
    existing = read_existing("news.json")
    items = fetch_news_items() or existing.get("items", [])
    return {
        "updatedAt": now.isoformat(),
        "items": [enrich_news_item(dict(item)) for item in items[:20]],
    }


def main():
    save_json("market.json", build_market_payload())
    save_json("news.json", build_news_payload())


if __name__ == "__main__":
    main()
