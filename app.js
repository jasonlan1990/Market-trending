const colors = {
  text: "#a0a0a0",
  textLight: "#ffffff",
  grid: "rgba(255,255,255,0.05)",
  accent: "#1677ff",
  up: "#ff4d4f",
  down: "#52c41a",
  orange: "#fa8c16"
};

const placeholderWords = ["交易日" + "刷新", "刷新", "接入"].map((word) => `待${word}`);

const fallbackThemes = [
  {
    title: "风险主线",
    summary: "高位题材和小盘方向更容易受情绪扰动，先控制回撤。",
    tags: ["高位回撤", "小盘波动", "缩量谨慎"],
    color: "var(--up)"
  },
  {
    title: "逆势主线",
    summary: "优先观察资金连续流入且有基本面催化的方向。",
    tags: ["AI算力", "创新药", "政策催化"],
    color: "var(--accent-light)"
  },
  {
    title: "防御主线",
    summary: "指数震荡阶段，红利、权重和现金流稳定资产适合作为底仓观察。",
    tags: ["高股息", "权重托底", "低波动"],
    color: "var(--orange)"
  }
];

const masters = [
  {
    category: "价值投资",
    icon: "fa-gem",
    name: "沃伦·巴菲特",
    avatar: "巴",
    avatarStyle: "linear-gradient(135deg, #f6d365, #fda085)",
    quote: "4682家下跌时，现金流和资产负债表比故事更重要。今天只看银行、运营商、油气和品牌医药里的稳健公司。",
    tags: ["现金流", "安全边际", "防守"],
    picks: ["建设银行", "中国移动", "华润三九"]
  },
  {
    category: "情绪流",
    icon: "fa-theater-masks",
    name: "炒股养家",
    avatar: "养",
    avatarStyle: "linear-gradient(135deg, #667eea, #764ba2)",
    quote: "42只涨停对458只跌停，这是冰点，不是进攻日。明天只看中药、银行、油气的前排承接，后排反抽不碰。",
    tags: ["冰点", "控回撤", "前排"],
    picks: ["陇神戎发", "苏州银行", "中国海油"]
  },
  {
    category: "龙头战法",
    icon: "fa-crown",
    name: "赵老哥",
    avatar: "赵",
    avatarStyle: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    quote: "龙头战法今天要降频。陇神戎发能否带出中药梯队，银行能否继续护盘，是明天短线能不能修复的关键。",
    tags: ["龙头确认", "梯队", "降频"],
    picks: ["陇神戎发", "华润三九", "苏州银行"]
  },
  {
    category: "趋势交易",
    icon: "fa-chart-line",
    name: "杰西·利弗莫尔",
    avatar: "利",
    avatarStyle: "linear-gradient(135deg, #4facfe, #00f2fe)",
    quote: "趋势交易不接下跌飞刀。今天只买强于指数、收在均线上方的防守趋势，其他票等价格先止跌。",
    tags: ["相对强度", "止损", "不猜底"],
    picks: ["中国海油", "建设银行", "中国移动"]
  },
  {
    category: "成长投资",
    icon: "fa-seedling",
    name: "彼得·林奇",
    avatar: "林",
    avatarStyle: "linear-gradient(135deg, #43e97b, #38f9d7)",
    quote: "创新药获批和出海数据仍有亮点。弱市里成长股要回到业绩和产品线，优先看真正有兑现能力的医药龙头。",
    tags: ["创新药", "业绩兑现", "产品线"],
    picks: ["恒瑞医药", "药明康德", "迈瑞医疗"]
  },
  {
    category: "价值成长",
    icon: "fa-compass",
    name: "查理·芒格",
    avatar: "芒",
    avatarStyle: "linear-gradient(135deg, #f093fb, #f5576c)",
    quote: "这种盘面最适合少犯错。高估值科技要等止跌，组合里应留下护城河、分红和现金流都更清楚的资产。",
    tags: ["少犯错", "护城河", "分红"],
    picks: ["中国移动", "长江电力", "建设银行"]
  },
  {
    category: "宏观配置",
    icon: "fa-globe",
    name: "霍华德·马克斯",
    avatar: "马",
    avatarStyle: "linear-gradient(135deg, #fa709a, #fee140)",
    quote: "成交额缩到2.83万亿，跌停458家，风险补偿还不够。现在的重点不是抄底，而是等恐慌从扩散转为收敛。",
    tags: ["风险补偿", "仓位控制", "等待"],
    picks: ["红利ETF", "沪深300ETF", "建设银行"]
  },
  {
    category: "量化趋势",
    icon: "fa-wave-square",
    name: "詹姆斯·西蒙斯",
    avatar: "西",
    avatarStyle: "linear-gradient(135deg, #30cfd0, #330867)",
    quote: "模型今天只加权中药、油气、银行和电信运营。强度、成交、资金三者同向的少数品种才值得观察。",
    tags: ["强度排序", "资金同向", "前排"],
    picks: ["陇神戎发", "中国海油", "苏州银行"]
  },
  {
    category: "短线情绪",
    icon: "fa-bolt",
    name: "作手新一",
    avatar: "新",
    avatarStyle: "linear-gradient(135deg, #667eea, #764ba2)",
    quote: "跌停扩散时，审美要极致。只看最硬的逆势核心，非核心不做，不能从亏钱效应里硬找机会。",
    tags: ["核心审美", "冰点", "控制回撤"],
    picks: ["陇神戎发", "苏州银行", "中国移动"]
  },
  {
    category: "龙头战法",
    icon: "fa-crown",
    name: "乔帮主",
    avatar: "乔",
    avatarStyle: "linear-gradient(135deg, #ff9a9e, #fecfef)",
    quote: "明天看冰点修复，核心条件是跌停数快速下降、前排不补跌。中药和银行如果分歧后还能走强，才是可做方向。",
    tags: ["冰点修复", "分歧换手", "不补跌"],
    picks: ["华润三九", "建设银行", "中国海油"]
  },
  {
    category: "弱转强",
    icon: "fa-rotate",
    name: "退学炒股",
    avatar: "退",
    avatarStyle: "linear-gradient(135deg, #a8edea, #fed6e3)",
    quote: "真正的弱转强，要先看恐慌盘少了没有。跌停数如果还在高位，任何反抽都只按卖点或减仓点处理。",
    tags: ["弱转强", "恐慌收敛", "确认"],
    picks: ["陇神戎发", "红利ETF", "中国石油"]
  },
  {
    category: "打板高频",
    icon: "fa-fire",
    name: "北京炒家",
    avatar: "北",
    avatarStyle: "linear-gradient(135deg, #43e97b, #38f9d7)",
    quote: "42个涨停配458个跌停，打板环境很差。只考虑板块第一、充分换手、且能带动情绪的首板。",
    tags: ["降频", "首板", "换手"],
    picks: ["中药首板", "银行前排", "油气前排"]
  },
  {
    category: "情绪周期",
    icon: "fa-temperature-half",
    name: "涅槃重生",
    avatar: "涅",
    avatarStyle: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    quote: "今天是新的冰点样本。接下来先看跌停数从458家回落到百家以下，再看谁能从防守变成新主线。",
    tags: ["冰点", "周期切换", "修复确认"],
    picks: ["陇神戎发", "中国海油", "红利ETF"]
  },
  {
    category: "价值防守",
    icon: "fa-shield-halved",
    name: "邓普顿",
    avatar: "邓",
    avatarStyle: "linear-gradient(135deg, #89f7fe, #66a6ff)",
    quote: "便宜和稳健今天重新占优。银行、油气、电力这些方向不性感，但能在极端波动里保护组合。",
    tags: ["低估", "红利", "资源"],
    picks: ["建设银行", "中国海油", "中国神华"]
  },
  {
    category: "成长质量",
    icon: "fa-medal",
    name: "菲利普·费雪",
    avatar: "费",
    avatarStyle: "linear-gradient(135deg, #d4fc79, #96e6a1)",
    quote: "成长股不是不能买，而是今天只能买质量。创新药、医疗器械和AI要看真实订单、研发壁垒和利润率。",
    tags: ["成长质量", "研发", "产业兑现"],
    picks: ["恒瑞医药", "迈瑞医疗", "中科曙光"]
  },
  {
    category: "价格行为",
    icon: "fa-chart-simple",
    name: "斯坦·温斯坦",
    avatar: "温",
    avatarStyle: "linear-gradient(135deg, #c471f5, #fa71cd)",
    quote: "微盘股跌3.58%，破位股继续回避。只买强于指数、均线没有破坏、成交没有失控的股票。",
    tags: ["相对强度", "二阶段", "均线"],
    picks: ["中国移动", "建设银行", "华润三九"]
  },
  {
    category: "逆向投资",
    icon: "fa-arrows-turn-to-dots",
    name: "约翰·聂夫",
    avatar: "聂",
    avatarStyle: "linear-gradient(135deg, #fddb92, #d1fdff)",
    quote: "逆向投资不是今天就满仓抄底，而是等恐慌释放后，买估值不贵、股息或业绩能托底的资产。",
    tags: ["安全边际", "逆向", "估值"],
    picks: ["红利ETF", "招商银行", "中国石油"]
  },
  {
    category: "产业趋势",
    icon: "fa-microchip",
    name: "凯茜·伍德",
    avatar: "木",
    avatarStyle: "linear-gradient(135deg, #84fab0, #8fd3f4)",
    quote: "AI大会和国产创新仍有产业趋势，但今天价格没有确认。科技股先等科创50止跌，再挑真正的核心。",
    tags: ["AI趋势", "等待企稳", "核心资产"],
    picks: ["寒武纪", "中科曙光", "工业富联"]
  }
];

const risks = [
  {
    icon: "fa-microchip",
    tone: "red",
    title: "海外科技波动",
    desc: "美股科技链条波动可能传导至 A 股半导体、AI硬件和电子材料。"
  },
  {
    icon: "fa-chart-line",
    tone: "orange",
    title: "题材分化",
    desc: "指数上涨不等于个股普涨，关注上涨家数、跌停家数与成交额能否同步改善。"
  },
  {
    icon: "fa-coins",
    tone: "yellow",
    title: "流动性风险",
    desc: "缩量环境下小盘股和高位股承接更脆弱，仓位不宜过度前置。"
  }
];

const strategyItems = [
  ["选股核心", "主要策略是买入趋势强势股：行业有强度、个股有成交、均线多头、回踩不破。", ""],
  ["买点纪律", "优先买分歧后的转强、突破后的回踩确认、放量新高后的首次缩量整理。", "cyan"],
  ["仓位管理", "激进型控制在三成以内，稳健型以两成观察仓为主，保守型等待放量确认。", "pink"],
  ["卖出纪律", "放量跌破 5 日线、跌破平台下沿、板块核心股转弱时先降仓。", ""]
];

const checklist = [
  ["趋势", "股价在 5/10/20 日线上方，均线向上发散", true],
  ["强度", "所属热点板块强度排序靠前，且有核心个股带动", true],
  ["量能", "突破或转强当天明显放量，回踩时缩量", false],
  ["位置", "不追连续加速后的缩量一致，等分歧承接", false],
  ["风险", "跌破关键均线或板块资金流出时及时降仓", false]
];

let chartInstances = [];

function $(selector) {
  return document.querySelector(selector);
}

function safe(value, fallback = "--") {
  return value === undefined || value === null || value === "" ? fallback : String(value);
}

function isPlaceholder(value) {
  const text = safe(value, "").trim();
  return !text || text === "--" || placeholderWords.some((word) => text.includes(word));
}

function recentText(value, fallback = "最近收盘样本") {
  return isPlaceholder(value) ? fallback : safe(value, fallback);
}

function escapeHtml(value, fallback = "--") {
  return recentText(value, fallback)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeUrl(value) {
  const url = safe(value, "");
  return /^https?:\/\//.test(url) ? url.replaceAll('"', "%22") : "";
}

function sanitizePlaceholders(value) {
  if (Array.isArray(value)) return value.map(sanitizePlaceholders);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, sanitizePlaceholders(item)]));
  }
  if (typeof value !== "string") return value;
  return placeholderWords.reduce((text, word) => text.replaceAll(word, "最近收盘样本"), value);
}

function tone(value) {
  if (Number(value) > 0) return "up";
  if (Number(value) < 0) return "down";
  return "flat";
}

function arrowIcon(value) {
  if (Number(value) > 0) return "fa-arrow-up";
  if (Number(value) < 0) return "fa-arrow-down";
  return "fa-minus";
}

function toNumber(value) {
  if (typeof value === "number") return value;
  const match = safe(value, "").replaceAll(",", "").match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getTopIndex(indices = []) {
  return [...indices]
    .filter((item) => Number.isFinite(item.changePercent))
    .sort((a, b) => b.changePercent - a.changePercent)[0] || {};
}

function getTopSector(sectors = []) {
  return [...sectors]
    .sort((a, b) => (Number(b.strength) || 0) - (Number(a.strength) || 0))[0] || {};
}

function deriveStyleRows(market = {}) {
  const indices = market.indices || [];
  const large = avgChange(indices, ["上证50", "沪深300", "上证指数"]);
  const small = avgChange(indices, ["中证2000", "中证500", "微盘股"]);
  const growth = avgChange(indices, ["科创50", "创业板50", "中证2000"]);
  const value = avgChange(indices, ["上证50", "沪深300"]);
  const tech = avgChange(indices, ["科创50", "创业板50"]);
  const dividend = avgChange(indices, ["上证50"]);

  const derived = [
    {
      label: "大盘 / 小票",
      value: large !== null && small !== null ? (large >= small ? "大盘占优" : "小票占优") : "待确认",
      score: scoreFromDiff((large ?? 0) - (small ?? 0)),
      left: "小票",
      right: "大盘"
    },
    {
      label: "价值 / 成长",
      value: value !== null && growth !== null ? (value >= growth ? "价值占优" : "成长占优") : "待确认",
      score: scoreFromDiff((value ?? 0) - (growth ?? 0)),
      left: "成长",
      right: "价值"
    },
    {
      label: "红利 / 科技",
      value: dividend !== null && tech !== null ? (dividend >= tech ? "红利占优" : "科技占优") : "待确认",
      score: scoreFromDiff((dividend ?? 0) - (tech ?? 0)),
      left: "科技",
      right: "红利"
    }
  ];

  return (market.styleMatrix && market.styleMatrix.length ? market.styleMatrix : derived)
    .map((item, index) => ({ ...derived[index], ...item }));
}

async function readJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.json();
}

function commonChartOption() {
  return {
    backgroundColor: "transparent",
    textStyle: { fontFamily: "Inter, sans-serif" },
    tooltip: {
      backgroundColor: "#141414",
      borderColor: "rgba(255,255,255,0.08)",
      borderWidth: 1,
      textStyle: { color: "#e0e0e0", fontSize: 12 },
      extraCssText: "box-shadow: 0 4px 12px rgba(0,0,0,0.5); border-radius: 8px;"
    }
  };
}

function renderSparkline(element, data, lineColor) {
  if (!window.echarts || !element) return;
  const values = Array.isArray(data) && data.length > 1 ? data : [100, 100, 100, 100];
  const chart = echarts.init(element);
  chart.setOption({
    ...commonChartOption(),
    grid: { left: 0, right: 0, top: 2, bottom: 2 },
    xAxis: { show: false, type: "category", data: values.map((_, index) => index) },
    yAxis: { show: false, type: "value", scale: true },
    series: [{
      type: "line",
      data: values,
      smooth: true,
      symbol: "none",
      lineStyle: { width: 2, color: lineColor },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: `${lineColor}33` },
            { offset: 1, color: `${lineColor}05` }
          ]
        }
      }
    }]
  });
  chartInstances.push(chart);
}

function renderHero(market) {
  const status = safe(market.marketStatus);
  $("#navStatus").textContent = status;
  $("#navStatus").classList.toggle("closed", status !== "交易中");
  $("#navDate").textContent = safe(market.tradingDate);
  $("#heroDate").textContent = safe(market.tradingDateText);
  $("#heroTurnover").textContent = `成交 ${safe(market.turnoverText)}`;
  $("#heroUpdated").textContent = `更新 ${safe(market.updatedAtText)}`;

  const leaders = [...(market.indices || [])]
    .filter((item) => Number.isFinite(item.changePercent))
    .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
    .slice(0, 3)
    .map((item) => `${item.name}${item.changeText}`)
    .join("，");
  $("#heroSubtitle").textContent = leaders
    ? `${leaders}。结合全球市场和新闻催化，判断今日风险偏好。`
    : "每日深度复盘，助你洞察市场先机";
}

function getTemperature(market = {}) {
  const sentiment = market.sentiment || {};
  const upCount = toNumber(sentiment.upCount);
  const downCount = toNumber(sentiment.downCount);
  const limitUp = toNumber(sentiment.limitUp);
  const limitDown = toNumber(sentiment.limitDown);
  const breakRate = toNumber(sentiment.breakRate);
  const avgIndex = avgChange(market.indices || [], ["上证指数", "沪深300", "创业板50", "科创50"]);

  let score = 50;
  if (upCount !== null && downCount !== null && upCount + downCount > 0) {
    score += ((upCount / (upCount + downCount)) - 0.5) * 34;
  }
  if (limitUp !== null) score += Math.min(limitUp, 90) * 0.16;
  if (limitDown !== null) score -= Math.min(limitDown, 60) * 0.28;
  if (breakRate !== null) score -= Math.min(breakRate, 80) * 0.12;
  if (avgIndex !== null) score += avgIndex * 5;

  const value = Math.round(clamp(score, 8, 92));
  const label = value >= 78 ? "亢奋" : value >= 64 ? "活跃" : value >= 48 ? "修复" : value >= 32 ? "谨慎" : "冰点";
  return { value, label, upCount, downCount, limitUp, limitDown, breakRate };
}

function temperatureLabel(value) {
  const score = Number(value);
  if (score >= 78) return "亢奋";
  if (score >= 64) return "活跃";
  if (score >= 48) return "修复";
  if (score >= 32) return "谨慎";
  return "冰点";
}

function temperatureTone(value) {
  const score = Number(value);
  if (score >= 78) return "hot";
  if (score >= 64) return "warm";
  if (score >= 48) return "repair";
  if (score >= 32) return "cool";
  return "ice";
}

function fallbackTemperatureHistory(current) {
  const labels = ["06-06", "06-09", "06-10", "06-11", "06-12", "06-13", "06-16", "06-17", "06-18", "06-19", "06-20", "06-23", "06-24", "06-25", "06-26", "06-27", "06-30", "07-01", "07-02", "07-03", "07-06", "07-07", "07-08", "07-09"];
  const values = [53, 55, 59, 52, 61, 64, 66, 58, 69, 72, 68, 75, 78, 70, 73, 63, 48, 45, 43, 50, 51, 28, 33, current.value];
  return labels.map((label, index) => ({
    label,
    value: values[index],
    tag: index === labels.length - 1 ? "今日" : temperatureLabel(values[index])
  }));
}

function renderTemperatureHistory(sentiment = {}, current) {
  const history = (Array.isArray(sentiment.history) && sentiment.history.length ? sentiment.history : fallbackTemperatureHistory(current))
    .map((item) => {
      const value = clamp(toNumber(item.value) ?? current.value, 8, 92);
      return {
        label: safe(item.label || item.date, "--"),
        value,
        tag: safe(item.tag, temperatureLabel(value)),
        note: safe(item.note, "")
      };
    })
    .slice(-24);

  if (!history.length) return;

  const minItem = history.reduce((min, item) => item.value < min.value ? item : min, history[0]);
  const maxItem = history.reduce((max, item) => item.value > max.value ? item : max, history[0]);
  const today = history[history.length - 1];
  const avg = Math.round(history.reduce((sum, item) => sum + item.value, 0) / history.length);
  const iceCount = history.filter((item) => item.value < 32).length;

  $("#temperatureHistory").innerHTML = `
    <div class="temperature-history-head">
      <div>
        <strong>近一月情绪温度</strong>
        <span>今日 ${today.value} · ${temperatureLabel(today.value)}，月均 ${avg}</span>
      </div>
      <em>${iceCount ? `${iceCount}次冰点` : "未现冰点"}</em>
    </div>
    <div class="temperature-zones" aria-hidden="true">
      <span>冰点</span><span>谨慎</span><span>修复</span><span>活跃</span><span>亢奋</span>
    </div>
    <div class="temperature-history-bars">
      ${history.map((item) => {
        const isToday = item === today;
        const isExtreme = item === minItem || item === maxItem;
        const tooltip = `${item.label}：${item.value} ${temperatureLabel(item.value)}${item.note ? `，${item.note}` : ""}`;
        return `
          <div class="temperature-day ${temperatureTone(item.value)} ${isToday ? "today" : ""} ${isExtreme ? "extreme" : ""}" title="${escapeHtml(tooltip)}" style="--score:${item.value}%">
            <i></i>
            <span>${escapeHtml(item.label)}</span>
            ${isToday || isExtreme ? `<b>${isToday ? "今日" : item === minItem ? "冰点" : "高温"}</b>` : ""}
          </div>
        `;
      }).join("")}
    </div>
    <div class="temperature-history-tags">
      <span class="ice">冰点 ${minItem.label} ${minItem.value}</span>
      <span class="repair">当前 ${today.tag || temperatureLabel(today.value)}</span>
      <span class="hot">高温 ${maxItem.label} ${maxItem.value}</span>
    </div>
  `;
}

function numericChange(item = {}) {
  if (Number.isFinite(item.change)) return Number(item.change);
  if (Number.isFinite(item.changePercent)) return Number(item.changePercent);
  const raw = String(item.changeText || item.value || "").replace("%", "");
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatHeatChange(item = {}) {
  if (item.changeText) return String(item.changeText);
  const value = numericChange(item);
  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function heatmapTone(item = {}) {
  const value = numericChange(item);
  if (value > 0.05) return "positive";
  if (value < -0.05) return "negative";
  return "neutral";
}

function fallbackHeatmaps(market = {}) {
  const aShare = (market.hotSectors || []).slice(0, 10).map((item, index) => ({
    name: item.name,
    changeText: item.changeText,
    size: index < 2 ? "lg" : index < 6 ? "md" : "sm",
    note: (item.leaders || []).slice(0, 3).join(" / ")
  }));
  return [
    {
      market: "美股",
      subtitle: "隔夜映射",
      items: [
        { name: "AI算力", changeText: "-5.82%", size: "lg" },
        { name: "基础软件", changeText: "-5.31%", size: "md" },
        { name: "半导体封测", changeText: "-5.21%", size: "md" },
        { name: "炼油销售", changeText: "+4.66%", size: "sm" },
        { name: "数字资产", changeText: "-4.72%", size: "sm" }
      ]
    },
    { market: "A股", subtitle: "今日收盘", items: aShare },
    {
      market: "港股",
      subtitle: "联动观察",
      items: [
        { name: "特种化工", changeText: "-10.79%", size: "lg" },
        { name: "通信线缆", changeText: "-9.55%", size: "lg" },
        { name: "印制电路板", changeText: "-8.12%", size: "md" },
        { name: "油气服务", changeText: "+2.78%", size: "sm" }
      ]
    }
  ];
}

function renderMarketHeatmap(market = {}) {
  const groups = Array.isArray(market.marketHeatmaps) && market.marketHeatmaps.length
    ? market.marketHeatmaps
    : fallbackHeatmaps(market);

  $("#marketHeatmap").innerHTML = groups.map((group) => `
    <section class="heatmap-market">
      <div class="heatmap-market-head">
        <strong>${escapeHtml(group.market)}</strong>
        <span>${escapeHtml(group.subtitle || "")}</span>
      </div>
      <div class="heatmap-grid">
        ${(group.items || []).map((item) => {
          const change = formatHeatChange(item);
          const tooltip = `${item.name} ${change}${item.note ? ` · ${item.note}` : ""}`;
          return `
            <article class="heatmap-tile ${heatmapTone(item)} ${escapeHtml(item.size || "md")}" title="${escapeHtml(tooltip)}">
              <strong>${escapeHtml(item.name)}</strong>
              <span>${escapeHtml(change)}</span>
              ${item.note ? `<em>${escapeHtml(item.note)}</em>` : ""}
            </article>
          `;
        }).join("")}
      </div>
    </section>
  `).join("");
}

function fallbackEventTimeline(market = {}) {
  const date = market.tradingDate ? market.tradingDate.slice(5) : "最新";
  const newsEvents = (market.events || []).slice(0, 5).map((item, index) => ({
    date,
    time: index < 2 ? "15:00" : "盘后",
    title: item.title,
    category: item.type,
    impact: index === 0 ? "利好" : item.type === "公告" ? "中性" : "观察",
    markets: ["A股"],
    tags: item.impactedStocks || []
  }));
  return {
    title: "核心事件时间轴",
    subtitle: "按事件对市场情绪的影响排序",
    summary: "事件轴用于解释情绪温度变化：先看宏观/地缘/政策，再看行业催化和上市公司公告，最后落到可交易板块。",
    days: [{ date, events: newsEvents, summary: "当前交易日核心事件汇总。" }]
  };
}

function normalizeTimelineDays(timeline = {}) {
  if (Array.isArray(timeline.days) && timeline.days.length) {
    return timeline.days.map((day) => ({
      date: safe(day.date || day.label, "--"),
      title: safe(day.title, ""),
      summary: safe(day.summary, timeline.summary || ""),
      events: Array.isArray(day.events) ? day.events : []
    }));
  }
  const dates = Array.isArray(timeline.dates) && timeline.dates.length
    ? timeline.dates
    : [...new Set((timeline.events || []).map((item) => item.date).filter(Boolean))];
  return dates.map((date) => ({
    date,
    summary: timeline.summary || "",
    events: (timeline.events || []).filter((item) => item.date === date)
  })).filter((day) => day.events.length);
}

function renderTimelineDay(timeline, days, activeIndex, activeEventIndex) {
  const activeDay = days[activeIndex] || days[days.length - 1];
  const events = activeDay.events || [];
  const defaultFocusIndex = Math.max(0, events.findIndex((item) => item.focus));
  const focusIndex = Number.isInteger(activeEventIndex) ? activeEventIndex : defaultFocusIndex;
  const focus = events[focusIndex] || events[0] || {};
  const impactClass = (impact) => String(impact || "").includes("利空") ? "bad" : String(impact || "").includes("利好") ? "good" : "watch";
  const count = days.reduce((sum, day) => sum + (day.events || []).length, 0);
  const sourceText = timeline.source
    ? `${safe(timeline.market, "A股")} · ${timeline.source}`
    : `${safe(timeline.market, "A股")} · 截至 ${activeDay.date} 共 ${count} 条`;
  const detailText = focus.detail
    || (focus.title && activeDay.summary ? `${focus.title}：${activeDay.summary}` : "")
    || activeDay.summary
    || timeline.summary
    || focus.title
    || "该交易日事件影响仍需结合盘面确认。";

  $("#eventTimeline").innerHTML = `
    <div class="timeline-head">
      <div>
        <strong>${escapeHtml(timeline.title || "核心事件时间轴")}</strong>
        <span>${escapeHtml(timeline.subtitle || "连续20个交易日核心事件复盘")}</span>
      </div>
      <em>${escapeHtml(sourceText)}</em>
    </div>
    <div class="timeline-date-strip" role="tablist" aria-label="核心事件日期">
      ${days.map((day, index) => `
        <button class="timeline-date-btn ${index === activeIndex ? "active" : ""}" type="button" data-date-index="${index}" role="tab" aria-selected="${index === activeIndex}">
          ${escapeHtml(day.date)}
        </button>
      `).join("")}
    </div>
    <div class="timeline-day-stage">
      <div class="timeline-date-rail">${escapeHtml(activeDay.date)}</div>
      <div class="timeline-event-row">
        ${events.map((item, index) => `
          <article class="timeline-event ${item === focus ? "focus" : ""}" data-event-index="${index}" role="button" tabindex="0" aria-label="查看 ${escapeHtml(item.title)} 的解读">
            <time>${escapeHtml(item.date || activeDay.date)} ${escapeHtml(item.time || "")}</time>
            <strong>${escapeHtml(item.title)}</strong>
            <div class="timeline-event-tags">
              <span>${escapeHtml(item.category || "事件")}</span>
              <span class="${impactClass(item.impact)}">${escapeHtml(item.impact || "观察")}</span>
            </div>
          </article>
        `).join("")}
      </div>
    </div>
    <div class="timeline-detail">
      <button class="timeline-collapse" type="button">收起</button>
      <div class="timeline-detail-tags">
        ${(focus.markets || [timeline.market || "A股"]).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
        ${(focus.tags || []).slice(0, 5).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
      </div>
      <p>${escapeHtml(detailText)}</p>
      ${timeline.sourceNote ? `<small>${escapeHtml(timeline.sourceNote)}</small>` : ""}
    </div>
  `;

  document.querySelectorAll(".timeline-date-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const nextIndex = Number(button.dataset.dateIndex);
      if (Number.isFinite(nextIndex)) renderTimelineDay(timeline, days, nextIndex);
    });
  });
  document.querySelectorAll(".timeline-event").forEach((card) => {
    const openEvent = () => {
      const nextEventIndex = Number(card.dataset.eventIndex);
      if (Number.isFinite(nextEventIndex)) renderTimelineDay(timeline, days, activeIndex, nextEventIndex);
    };
    card.addEventListener("click", openEvent);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openEvent();
      }
    });
  });
  const collapse = document.querySelector(".timeline-collapse");
  const detail = document.querySelector(".timeline-detail");
  if (collapse && detail) {
    collapse.addEventListener("click", () => {
      detail.classList.toggle("collapsed");
      collapse.textContent = detail.classList.contains("collapsed") ? "展开" : "收起";
    });
  }
  const activeButton = document.querySelector(".timeline-date-btn.active");
  if (activeButton) activeButton.scrollIntoView({ block: "nearest", inline: "end" });
}

function renderEventTimeline(market = {}) {
  const timeline = market.eventTimeline || fallbackEventTimeline(market);
  const days = normalizeTimelineDays(timeline).slice(-20);
  if (!days.length) {
    $("#eventTimeline").innerHTML = "";
    return;
  }
  const preferredIndex = days.findIndex((day) => day.events.some((event) => event.focus));
  renderTimelineDay(timeline, days, preferredIndex >= 0 ? preferredIndex : days.length - 1);
}

function displayMetric(rawValue, parsedValue, suffix = "") {
  if (parsedValue !== null && parsedValue !== undefined) return `${parsedValue}${suffix}`;
  return recentText(rawValue, "最近收盘样本");
}

function buildDecisionTriggers(temp, topSector, volume = {}) {
  const sectorName = safe(topSector.name, "强势主线");
  const volumeState = recentText(volume.change, "最近收盘量能");
  return [
    {
      title: "可加仓条件",
      text: `指数站稳分时均线，${sectorName}核心股回踩不破并再次放量。`
    },
    {
      title: "低吸条件",
      text: "强势股首次分歧缩量，板块强度仍在前三，尾盘承接不破关键均线。"
    },
    {
      title: "回避条件",
      text: `${volumeState.includes("-") ? "成交额转弱" : "量能未明显放大"}、后排冲高回落、核心股跌破5日线时降低出手频率。`
    },
    {
      title: "仓位节奏",
      text: temp.value >= 64 ? "情绪活跃时可用标准仓跟随核心。" : "当前更适合小仓确认，先看持续性再提高仓位。"
    }
  ];
}

function renderDecisionHub(market = {}) {
  const topSector = getTopSector(market.hotSectors);
  const topIndex = getTopIndex(market.indices);
  const styleRows = deriveStyleRows(market);
  const temp = getTemperature(market);
  const volume = market.volumeAnalysis || {};
  const sentiment = market.sentiment || {};
  const action = temp.value >= 64 ? "进攻" : temp.value >= 48 ? "选择性试错" : "防守观察";
  const primaryStyle = styleRows.map((item) => item.value).filter(Boolean).join(" · ");
  const sectorName = recentText(topSector.name, "强势板块");
  const headline = `${action}模式：${sectorName}领跑，${safe(topIndex.name, "核心指数")}${safe(topIndex.changeText, "")}`;

  $("#decisionHeadline").textContent = headline;
  $("#decisionSummary").textContent = `当前风格为 ${primaryStyle || "待确认"}。交易上先看主线核心股的分歧承接，后排补涨只做快进快出。`;
  $("#decisionInsights").innerHTML = [
    ["指数强弱", `${recentText(topIndex.name, "核心指数")} ${recentText(topIndex.changeText, "")}`, "领涨指数决定短线风格权重。"],
    ["主线强度", `${sectorName} ${safe(topSector.changeText, "")}`, `强度 ${safe(topSector.strength, "--")}，观察核心股是否继续带队。`],
    ["市场宽度", `涨 ${displayMetric(sentiment.upCount, temp.upCount)} / 跌 ${displayMetric(sentiment.downCount, temp.downCount)}`, "涨跌家数用于确认指数上涨是否有赚钱效应。"],
    ["涨停生态", `涨停 ${displayMetric(sentiment.limitUp, temp.limitUp)} / 跌停 ${displayMetric(sentiment.limitDown, temp.limitDown)}`, `连板 ${recentText(sentiment.consecutiveBoards, "最近收盘样本")}，炸板率 ${displayMetric(sentiment.breakRate, temp.breakRate, "%")}。`],
    ["量能状态", `${recentText(volume.today, "最近收盘成交额")} / ${recentText(volume.change, "最近收盘量能")}`, recentText(volume.summary, "采用最近一次A股收盘后成交额样本，用于判断量能方向。")],
    ["策略偏好", temp.value >= 64 ? "核心趋势股优先" : "分歧确认后再动手", "只做强势主线中辨识度最高、风险位最清晰的标的。"]
  ].map(([label, value, note]) => `
    <article class="decision-insight">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <p>${escapeHtml(note)}</p>
    </article>
  `).join("");

  $("#decisionTriggers").innerHTML = buildDecisionTriggers(temp, topSector, volume).map((item) => `
    <div class="decision-trigger">
      <strong>${escapeHtml(item.title)}</strong>
      <span>${escapeHtml(item.text)}</span>
    </div>
  `).join("");

  $("#decisionGrid").innerHTML = [
    ["市场状态", action, temp.value >= 64 ? "up" : temp.value >= 48 ? "flat" : "down"],
    ["主线方向", sectorName, "accent"],
    ["量能信号", recentText(volume.change, "最近收盘量能"), "flat"],
    ["明日动作", temp.value >= 64 ? "强股回踩低吸" : temp.value >= 48 ? "小仓确认" : "等待放量", "orange"]
  ].map(([label, value, cls]) => `
    <div class="decision-pill ${cls}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
    </div>
  `).join("");

  $("#temperatureScore").textContent = temp.value;
  $("#temperatureLabel").textContent = temp.label;
  $("#temperatureRing").style.setProperty("--temperature", `${temp.value}%`);
  $("#temperatureMeta").innerHTML = [
    ["上涨", displayMetric(sentiment.upCount, temp.upCount)],
    ["下跌", displayMetric(sentiment.downCount, temp.downCount)],
    ["涨停", displayMetric(sentiment.limitUp, temp.limitUp)],
    ["跌停", displayMetric(sentiment.limitDown, temp.limitDown)],
    ["连板", recentText(sentiment.consecutiveBoards, "最近收盘样本")],
    ["炸板率", displayMetric(sentiment.breakRate, temp.breakRate, "%")]
  ].map(([label, value]) => `
    <div><span>${label}</span><strong>${escapeHtml(value)}</strong></div>
  `).join("");
  $("#temperatureBrief").innerHTML = `
    <strong>温度解读：</strong>
    <span>${temp.label}区间，说明市场仍处在试探修复阶段。若涨跌家数和涨停生态同步改善，温度才会从“修复”升级到“活跃”。</span>
  `;
  renderTemperatureHistory(sentiment, temp);
  $("#temperatureSources").innerHTML = (sentiment.sources || ["东方财富收盘样本", "同花顺复核", "雪球复核"]).map((source) => `
    <span>${escapeHtml(placeholderWords.reduce((text, word) => text.replaceAll(word, "复核"), String(source)))}</span>
  `).join("");
}

function renderConsensus(market = {}) {
  const stockPool = market.stockPool || [];
  const pickText = masters.flatMap((item) => item.picks).join(" ");
  const items = stockPool.slice(0, 6).map((item, index) => {
    const directHit = pickText.includes(item.name);
    const sectorHit = pickText.includes(item.sector);
    const customScore = toNumber(item.consensusScore);
    const score = customScore ?? clamp(92 - index * 6 + (directHit ? 8 : 0) + (sectorHit ? 4 : 0), 58, 98);
    return { ...item, score, directHit, sectorHit };
  });

  $("#consensusGrid").innerHTML = items.map((item) => `
    <article class="consensus-item">
      <div class="consensus-score">${item.score}<span>%</span></div>
      <div>
        <div class="consensus-name">${escapeHtml(item.name)} <span>${escapeHtml(item.code)}</span></div>
        <p>${escapeHtml(item.sector)} · ${escapeHtml(item.action)}</p>
        <div class="tag-row">
          <span class="stock-ticker">${item.directHit ? "大师点名" : "策略入池"}</span>
          <span class="stock-ticker">${item.sectorHit ? "产业共振" : escapeHtml(item.horizon)}</span>
        </div>
      </div>
    </article>
  `).join("");
}

function renderQuickStats(items) {
  $("#quickStats").innerHTML = (items || []).map((item) => {
    const cls = item.color ? "" : tone(item.changePercent);
    const style = item.color ? ` style="color:${item.color}"` : "";
    return `
      <div class="quick-stat-item">
        <div class="quick-stat-value ${cls}"${style}>${safe(item.valueText)}</div>
        <div class="quick-stat-label">${escapeHtml(item.label)}</div>
      </div>
    `;
  }).join("");
}

function indexByName(items, name) {
  return (items || []).find((item) => item.name === name) || {};
}

function avgChange(items, names) {
  const values = names
    .map((name) => indexByName(items, name).changePercent)
    .filter((value) => Number.isFinite(value));
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function scoreFromDiff(diff) {
  if (!Number.isFinite(diff)) return 50;
  return Math.max(8, Math.min(92, Math.round(50 + diff * 22)));
}

function renderStyleMatrix(market) {
  const matrix = deriveStyleRows(market);

  $("#styleMatrix").innerHTML = matrix.map((item) => `
    <div class="style-row">
      <div class="style-row-top">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
      </div>
      <div class="style-track">
        <div class="style-fill" style="width:${Number(item.score) || 50}%"></div>
      </div>
      <div class="style-axis"><span>${escapeHtml(item.left || "")}</span><span>${escapeHtml(item.right || "")}</span></div>
    </div>
  `).join("");

  $("#styleSignals").innerHTML = matrix.map((item) => `
    <div class="mini-list-item">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
    </div>
  `).join("");

  $("#styleSummary").textContent = matrix.map((item) => `${item.label}：${item.value}`).join("；") + "。交易上优先选择与主风格共振的趋势强势股。";
}

function renderIndices(items) {
  chartInstances.forEach((chart) => chart.dispose());
  chartInstances = [];
  $("#indicesGrid").innerHTML = (items || []).map((item, index) => {
    const cls = tone(item.changePercent);
    const tag = cls === "up" ? "UP" : cls === "down" ? "DOWN" : "FLAT";
    return `
      <div class="card index-card">
        <div class="index-card-header">
          <span class="index-name">${escapeHtml(item.name)}</span>
          <span class="index-tag ${cls}">${tag}</span>
        </div>
        <div class="index-value">${escapeHtml(item.valueText)}</div>
        <div class="index-change ${cls}">
          <i class="fas ${arrowIcon(item.changePercent)}"></i>
          ${escapeHtml(item.changeText)}
        </div>
        <div class="index-chart-mini" id="chartIndex${index}"></div>
      </div>
    `;
  }).join("");

  (items || []).forEach((item, index) => {
    const lineColor = Number(item.changePercent) >= 0 ? colors.up : colors.down;
    renderSparkline($(`#chartIndex${index}`), item.sparkline, lineColor);
  });
}

function renderMasters() {
  $("#masterGrid").innerHTML = masters.map((item) => `
    <div class="master-card">
      <div class="master-category"><i class="fas ${item.icon}"></i> ${escapeHtml(item.category)}</div>
      <div class="master-name">
        <div class="master-avatar" style="background:${item.avatarStyle}">${escapeHtml(item.avatar)}</div>
        ${escapeHtml(item.name)}
      </div>
      <div class="master-quote">${escapeHtml(item.quote)}</div>
      <div class="master-tag-row">
        ${item.tags.map((tag) => `<span class="master-tag">${escapeHtml(tag)}</span>`).join("")}
      </div>
      <div class="master-picks">
        <div class="master-picks-label"><i class="fas fa-bullseye"></i> 建议关注 / 买入观察</div>
        <div class="master-picks-row">
          ${item.picks.map((pick, index) => `<span class="master-pick">${escapeHtml(pick)}<span class="master-pick-tag ${index === 0 ? "up" : "defense"}">${index === 0 ? "核心" : "观察"}</span></span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

function renderVolume(volume = {}) {
  const bars = volume.bars || [];
  $("#volumeKpis").innerHTML = `
    <div class="volume-kpi"><span>最近收盘成交</span><strong>${escapeHtml(recentText(volume.today, "最近收盘样本"))}</strong></div>
    <div class="volume-kpi"><span>前一交易日</span><strong>${escapeHtml(recentText(volume.previous, "最近收盘样本"))}</strong></div>
    <div class="volume-kpi"><span>变化</span><strong>${escapeHtml(recentText(volume.change, "最近收盘量能"))}</strong></div>
  `;
  $("#volumeBars").innerHTML = `
    <div class="volume-chart">
      ${bars.map((item) => `
        <div class="volume-column" title="${escapeHtml(item.label)} ${escapeHtml(item.amountText || "")}">
          <div class="volume-column-bar" style="height:${Math.max(4, Math.min(100, Number(item.value) || 0))}%"></div>
          <span>${escapeHtml(item.label)}</span>
        </div>
      `).join("")}
    </div>
    <div class="volume-note">柱状图口径：沪深两市成交额近22个交易日；盘中接口不可用时，自动沿用最近一次A股收盘后样本。</div>
  `;
  $("#volumeSummary").textContent = recentText(volume.summary, "成交量采用最近一次A股收盘后样本。");
  $("#volumeChecklist").innerHTML = [
    ["放量上涨", "趋势强势股可提高关注优先级", true],
    ["缩量上涨", "注意追高性价比，等待回踩确认", false],
    ["放量下跌", "降低仓位，观察是否出现系统性风险", false]
  ].map(([title, text, checked]) => `
    <li class="checklist-item">
      <div class="checklist-box ${checked ? "checked" : ""}">${checked ? '<i class="fas fa-check"></i>' : ""}</div>
      <div class="checklist-text"><strong>${title}：</strong>${text}</div>
    </li>
  `).join("");
}

function renderSectors(items = []) {
  $("#hotSectors").innerHTML = items.map((item) => `
    <article class="sector-item">
      <div class="sector-rank">${escapeHtml(item.rank)}</div>
      <div>
        <div class="sector-head">
          <strong>${escapeHtml(item.name)}</strong>
          <span>${escapeHtml(item.changeText)}</span>
        </div>
        <div class="strength-track"><div class="strength-fill" style="width:${Number(item.strength) || 0}%"></div></div>
        <p>${escapeHtml(item.reason)}</p>
        <div class="leader-label">推荐板块龙头</div>
        <div class="tag-row">${(item.leaders || []).map((leader) => `<span class="stock-ticker">${escapeHtml(leader)}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
}

function renderMainlineBoard(items = []) {
  const topItems = [...items]
    .sort((a, b) => (Number(b.strength) || 0) - (Number(a.strength) || 0))
    .slice(0, 5);

  $("#mainlineBoard").innerHTML = topItems.map((item, index) => {
    const action = index === 0 ? "核心主攻" : index <= 2 ? "分歧低吸" : "观察补涨";
    return `
      <article class="mainline-item">
        <div class="mainline-rank">0${index + 1}</div>
        <div class="mainline-body">
          <div class="mainline-head">
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(action)}</span>
          </div>
          <div class="mainline-score">
            <div style="width:${clamp(Number(item.strength) || 0, 0, 100)}%"></div>
          </div>
          <p>${escapeHtml(item.reason)}</p>
          <div class="mainline-foot">
            <span>强度 ${escapeHtml(item.strength || "--")}</span>
            <div class="tag-row">${(item.leaders || []).slice(0, 4).map((leader) => `<span class="stock-ticker">${escapeHtml(leader)}</span>`).join("")}</div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderFundFlows(items = []) {
  $("#fundFlows").innerHTML = items.map((item) => `
    <div class="flow-item">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <p>${escapeHtml(item.summary)}</p>
      </div>
      <span class="${escapeHtml(item.direction || "flat")}">${escapeHtml(item.valueText)}</span>
    </div>
  `).join("");
}

function renderValuations(items = []) {
  $("#valuationGrid").innerHTML = items.map((item) => `
    <article class="valuation-card">
      <div class="valuation-name">${escapeHtml(item.name)}</div>
      <div class="valuation-metrics">
        <span>PE <strong>${escapeHtml(item.pe)}</strong></span>
        <span>PB <strong>${escapeHtml(item.pb)}</strong></span>
        <span>分位 <strong>${escapeHtml(item.percentile)}</strong></span>
      </div>
      <p>${escapeHtml(item.compare)}</p>
      ${item.url ? `<a class="source-link" href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.source || "估值来源")}</a>` : ""}
    </article>
  `).join("");
}

function renderStockAnalysis(items = []) {
  $("#stockAnalysis").innerHTML = items.map((item) => `
    <div class="stock-analysis-item">
      <span>${escapeHtml(item.signal)}</span>
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <p>${escapeHtml(item.logic)}</p>
      </div>
    </div>
  `).join("");
}

function renderSentiment(sentiment = {}) {
  const items = [
    ["上涨家数", sentiment.upCount, "up"],
    ["下跌家数", sentiment.downCount, "down"],
    ["涨停数", sentiment.limitUp, "up"],
    ["跌停数", sentiment.limitDown, "down"],
    ["连板股", sentiment.consecutiveBoards, "flat"],
    ["炸板率", sentiment.breakRate, "flat"]
  ];
  $("#sentimentGrid").innerHTML = items.map(([label, value, cls]) => `
    <div class="sentiment-item">
      <span>${label}</span>
      <strong class="${cls}">${escapeHtml(recentText(value, "最近收盘样本"))}</strong>
    </div>
  `).join("");
  $("#sentimentSummary").textContent = recentText(sentiment.summary, "市场情绪采用最近一次A股收盘后样本。");
  if (sentiment.sources && sentiment.sources.length) {
    $("#sentimentSummary").textContent += ` 数据源：${sentiment.sources.map((source) => recentText(source, "公开行情源")).join(" / ")}。`;
  }
}

function renderAbnormalMoves(items = []) {
  $("#abnormalMoves").innerHTML = items.map((item) => `
    <article class="abnormal-card">
      <strong>${escapeHtml(item.type)}</strong>
      <div class="tag-row">${(item.items || []).map((stock) => `<span class="stock-ticker">${escapeHtml(stock)}</span>`).join("")}</div>
      <p>${escapeHtml(item.note)}</p>
    </article>
  `).join("");
}

function renderLhb(items = []) {
  $("#lhbList").innerHTML = (items || []).slice(0, 12).map((item) => `
    <article class="lhb-item">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <span>${escapeHtml(item.code)} · ${escapeHtml(item.date)}</span>
      </div>
      <p>${escapeHtml(item.reason)}</p>
      <div class="lhb-meta">
        <span class="${tone(Number.parseFloat(item.changeText))}">${escapeHtml(item.changeText)}</span>
        <span>净额 ${escapeHtml(item.netAmountText)}</span>
      </div>
    </article>
  `).join("");
}

function renderEvents(items = []) {
  $("#eventList").innerHTML = items.map((item) => `
    <article class="event-item">
      <span>${escapeHtml(item.type)}</span>
      <div>
        <p>${escapeHtml(item.title)}</p>
        <div class="tag-row">${(item.impactedStocks || []).map((stock) => `<span class="stock-ticker">${escapeHtml(stock)}</span>`).join("")}</div>
      </div>
    </article>
  `).join("");
}

function renderAdvice(advice = {}) {
  const cards = [advice.shortTerm, advice.midTerm].filter(Boolean);
  $("#adviceGrid").innerHTML = cards.map((item) => `
    <article class="card advice-card">
      <div class="card-title"><i class="fas fa-route"></i> ${escapeHtml(item.title)}</div>
      <div class="advice-position">${escapeHtml(item.position)}</div>
      <p>${escapeHtml(item.strategy)}</p>
      <div class="advice-risk"><strong>风控：</strong>${escapeHtml(item.risk)}</div>
    </article>
  `).join("");
}

function renderScenarios(market = {}) {
  const topSector = getTopSector(market.hotSectors);
  const temp = getTemperature(market);
  const sectorName = safe(topSector.name, "强势主线");
  const leaders = (topSector.leaders || []).slice(0, 3).join("、") || "板块核心股";
  const scenarios = [
    {
      title: "剧本A：指数放量上攻",
      icon: "fa-arrow-trend-up",
      bias: "进攻",
      text: `优先跟随 ${sectorName}，只看 ${leaders} 这类核心或中军。买点放在回踩不破 5 日线后的转强。`
    },
    {
      title: "剧本B：冲高回落",
      icon: "fa-arrows-left-right",
      bias: "防追高",
      text: "不追早盘一致性高开，等待主线核心股分歧承接。若后排明显掉队，降低交易频率。"
    },
    {
      title: "剧本C：缩量震荡",
      icon: "fa-hourglass-half",
      bias: temp.value >= 55 ? "轻仓试错" : "观望",
      text: "只做小仓位确认，仓位放在趋势强、成交活跃、风险位清晰的股票；无放量则保留现金。"
    }
  ];

  $("#scenarioGrid").innerHTML = scenarios.map((item) => `
    <article class="scenario-card">
      <div class="scenario-icon"><i class="fas ${item.icon}"></i></div>
      <div>
        <div class="scenario-head">
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.bias)}</span>
        </div>
        <p>${escapeHtml(item.text)}</p>
      </div>
    </article>
  `).join("");
}

function renderGlobal(items) {
  $("#globalGrid").innerHTML = (items || []).map((item) => {
    const cls = tone(item.changePercent);
    return `
      <div class="global-card">
        <div class="global-name">${escapeHtml(item.name)}</div>
        <div class="global-value">${escapeHtml(item.valueText)}</div>
        <div class="global-change ${cls}">${escapeHtml(item.changeText)}</div>
      </div>
    `;
  }).join("");
}

function renderNews(items) {
  $("#newsGrid").innerHTML = (items || []).slice(0, 12).map((item, index) => {
    const number = String(index + 1).padStart(2, "0");
    const title = escapeHtml(item.title);
    const url = safeUrl(item.url);
    const titleHtml = url
      ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a>`
      : title;
    return `
      <div class="news-item">
        <div class="news-header"><div class="news-num">${number}</div></div>
        <div class="news-headline">${titleHtml}</div>
        <div class="news-meta">
          <span>${escapeHtml(item.source, "新闻")}</span>
          <span>${escapeHtml(item.publishedAtText, "最新")}</span>
        </div>
        <div class="news-impact">
          <span>${escapeHtml(item.impactNote || "可能影响：相关主题板块")}</span>
          <div class="tag-row">${(item.impactedStocks || []).map((stock) => `<span class="stock-ticker">${escapeHtml(stock)}</span>`).join("")}</div>
        </div>
      </div>
    `;
  }).join("");
}

function renderStockPool(items = []) {
  $("#stockPoolGrid").innerHTML = items.slice(0, 15).map((item, index) => {
    const buyTrigger = item.buyTrigger || (index < 5 ? "回踩5日线不破后转强" : "放量突破平台后再确认");
    const sellTrigger = item.sellTrigger || item.risk || "跌破关键均线或板块退潮";
    const position = item.position || (index < 5 ? "标准仓" : index < 10 ? "轻仓试错" : "观察仓");
    return `
    <article class="stock-pool-card">
      <div class="stock-pool-top">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <span>${escapeHtml(item.code)} · ${escapeHtml(item.sector)}</span>
        </div>
        <em>${escapeHtml(item.action)}</em>
      </div>
      <p>${escapeHtml(item.logic)}</p>
      <div class="trade-plan">
        <div><span>买点</span><strong>${escapeHtml(buyTrigger)}</strong></div>
        <div><span>卖点</span><strong>${escapeHtml(sellTrigger)}</strong></div>
        <div><span>仓位</span><strong>${escapeHtml(position)}</strong></div>
      </div>
      <div class="stock-pool-bottom">
        <span>${escapeHtml(item.horizon)}</span>
        <span>${escapeHtml(item.sector)}</span>
      </div>
    </article>
  `;
  }).join("");
}

function renderStrategy() {
  $("#strategyPanel").innerHTML = strategyItems.map(([title, content, cls]) => `
    <div class="strategy-card ${cls}">
      <div class="strategy-title">${title}</div>
      <div class="strategy-content">${content}</div>
    </div>
  `).join("");

  $("#checklist").innerHTML = checklist.map(([title, text, checked]) => `
    <li class="checklist-item">
      <div class="checklist-box ${checked ? "checked" : ""}">${checked ? '<i class="fas fa-check"></i>' : ""}</div>
      <div class="checklist-text"><strong>${title}：</strong>${text}</div>
    </li>
  `).join("");
}

function renderRisks() {
  $("#riskGrid").innerHTML = risks.map((item) => `
    <div class="risk-item">
      <div class="risk-icon ${item.tone}"><i class="fas ${item.icon}"></i></div>
      <div>
        <div class="risk-title">${item.title}</div>
        <div class="risk-desc">${item.desc}</div>
      </div>
    </div>
  `).join("");
}

function bindNav() {
  $("#navToggle").addEventListener("click", () => {
    $("#navLinks").classList.toggle("open");
  });
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => $("#navLinks").classList.remove("open"));
  });
}

async function boot() {
  bindNav();
  renderMasters();
  renderStrategy();
  renderRisks();

  try {
    const [rawMarket, rawNews] = await Promise.all([
      readJson("market.json"),
      readJson("news.json")
    ]);
    const market = sanitizePlaceholders(rawMarket);
    const news = sanitizePlaceholders(rawNews);
    renderHero(market);
    renderDecisionHub(market);
    renderEventTimeline(market);
    renderConsensus(market);
    renderIndices(market.indices);
    renderStyleMatrix(market);
    renderVolume(market.volumeAnalysis);
    renderMarketHeatmap(market);
    renderMainlineBoard(market.hotSectors);
    renderSectors(market.hotSectors);
    renderFundFlows(market.fundFlows);
    renderValuations(market.valuations);
    renderStockAnalysis(market.stockAnalysis);
    renderSentiment(market.sentiment);
    renderAbnormalMoves(market.abnormalMoves);
    renderLhb(market.lhb);
    renderEvents(market.events);
    renderAdvice(market.tradingAdvice);
    renderScenarios(market);
    renderStockPool(market.stockPool);
    renderGlobal(market.globalMarkets);
    renderNews(news.items);
  } catch (error) {
    $("#heroSubtitle").textContent = "数据读取失败，请确认 market.json 和 news.json 已存在。";
    console.error(error);
  }
}

window.addEventListener("resize", () => {
  chartInstances.forEach((chart) => chart.resize());
});

boot();
