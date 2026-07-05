const colors = {
  text: "#a0a0a0",
  textLight: "#ffffff",
  grid: "rgba(255,255,255,0.05)",
  accent: "#1677ff",
  up: "#ff4d4f",
  down: "#52c41a",
  orange: "#fa8c16"
};

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
    quote: "指数没有全面转强时，先看确定性。确定性来自现金流、估值和可验证的业绩。",
    tags: ["保持理性", "价值", "耐心"],
    picks: ["上证50", "沪深300", "高股息"]
  },
  {
    category: "情绪流",
    icon: "fa-theater-masks",
    name: "炒股养家",
    avatar: "养",
    avatarStyle: "linear-gradient(135deg, #667eea, #764ba2)",
    quote: "行情分裂时，只做最强主线和最清晰的分歧承接，不做全市场幻想。",
    tags: ["弱分化", "主线优先", "控制仓位"],
    picks: ["强主线", "分歧低吸", "轻仓"]
  },
  {
    category: "龙头战法",
    icon: "fa-crown",
    name: "赵老哥",
    avatar: "赵",
    avatarStyle: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    quote: "机会集中时不要摊大饼。强板块也要等换手，弱板块直接回避。",
    tags: ["聚焦", "等分歧", "不追高"],
    picks: ["龙头", "换手", "确认"]
  },
  {
    category: "趋势交易",
    icon: "fa-chart-line",
    name: "杰西·利弗莫尔",
    avatar: "利",
    avatarStyle: "linear-gradient(135deg, #4facfe, #00f2fe)",
    quote: "不要预测，跟随价格。强势股创新高后，回踩不破才是交易者的朋友。",
    tags: ["趋势", "突破", "止损"],
    picks: ["工业富联", "中际旭创", "新易盛"]
  },
  {
    category: "成长投资",
    icon: "fa-seedling",
    name: "彼得·林奇",
    avatar: "林",
    avatarStyle: "linear-gradient(135deg, #43e97b, #38f9d7)",
    quote: "好公司要配合好价格。A股成长方向可看AI硬件、创新药和业绩持续兑现的细分龙头。",
    tags: ["成长", "业绩", "龙头"],
    picks: ["恒瑞医药", "药明康德", "北方华创"]
  },
  {
    category: "价值成长",
    icon: "fa-compass",
    name: "查理·芒格",
    avatar: "芒",
    avatarStyle: "linear-gradient(135deg, #f093fb, #f5576c)",
    quote: "趋势强也要看护城河。买入前问一句：三个月后逻辑是否还在？",
    tags: ["质量", "护城河", "耐心"],
    picks: ["贵州茅台", "宁德时代", "迈瑞医疗"]
  },
  {
    category: "宏观配置",
    icon: "fa-globe",
    name: "霍华德·马克斯",
    avatar: "马",
    avatarStyle: "linear-gradient(135deg, #fa709a, #fee140)",
    quote: "当市场情绪分化，最重要的是赔率。强势股可以做，但仓位要和波动匹配。",
    tags: ["周期", "赔率", "仓位"],
    picks: ["沪深300ETF", "红利ETF", "科创50ETF"]
  },
  {
    category: "量化趋势",
    icon: "fa-wave-square",
    name: "詹姆斯·西蒙斯",
    avatar: "西",
    avatarStyle: "linear-gradient(135deg, #30cfd0, #330867)",
    quote: "强度排序比主观判断更可靠。只从板块强度、资金流和价格趋势三者共振里选股。",
    tags: ["量化", "强度", "共振"],
    picks: ["板块第一", "成交前排", "资金净流入"]
  },
  {
    category: "短线情绪",
    icon: "fa-bolt",
    name: "作手新一",
    avatar: "新",
    avatarStyle: "linear-gradient(135deg, #667eea, #764ba2)",
    quote: "短线只看核心。杂毛冲高不是机会，核心分歧才有性价比。",
    tags: ["核心", "分歧", "情绪"],
    picks: ["机器人核心", "AI核心", "军工核心"]
  },
  {
    category: "龙头战法",
    icon: "fa-crown",
    name: "乔帮主",
    avatar: "乔",
    avatarStyle: "linear-gradient(135deg, #ff9a9e, #fecfef)",
    quote: "龙头要有板块带动性。没有带动性的上涨，只能当套利看。",
    tags: ["龙头", "带动", "换手"],
    picks: ["雷赛智能", "大洋电机", "航天环宇"]
  },
  {
    category: "弱转强",
    icon: "fa-rotate",
    name: "退学炒股",
    avatar: "退",
    avatarStyle: "linear-gradient(135deg, #a8edea, #fed6e3)",
    quote: "弱转强的本质是超预期。明天只看高强度板块中能否出现放量转强。",
    tags: ["超预期", "弱转强", "确认"],
    picks: ["首板放量", "反包强股", "趋势新高"]
  },
  {
    category: "打板高频",
    icon: "fa-fire",
    name: "北京炒家",
    avatar: "北",
    avatarStyle: "linear-gradient(135deg, #43e97b, #38f9d7)",
    quote: "炸板率高时少打板，多看趋势股低吸。强势市场才适合提高出手频率。",
    tags: ["炸板率", "低吸", "频率"],
    picks: ["低位首板", "换手板", "趋势板"]
  },
  {
    category: "情绪周期",
    icon: "fa-temperature-half",
    name: "涅槃重生",
    avatar: "涅",
    avatarStyle: "linear-gradient(135deg, #ffecd2, #fcb69f)",
    quote: "情绪修复时先看最强承接，退潮时不要迷恋辨识度。",
    tags: ["周期", "承接", "退潮"],
    picks: ["板块中军", "换手核心", "逆势强股"]
  },
  {
    category: "价值防守",
    icon: "fa-shield-halved",
    name: "邓普顿",
    avatar: "邓",
    avatarStyle: "linear-gradient(135deg, #89f7fe, #66a6ff)",
    quote: "如果成交量不足，防守资产的价值会上升。红利和低估值可作为组合稳定器。",
    tags: ["低估", "防守", "红利"],
    picks: ["中国神华", "长江电力", "工商银行"]
  },
  {
    category: "成长质量",
    icon: "fa-medal",
    name: "菲利普·费雪",
    avatar: "费",
    avatarStyle: "linear-gradient(135deg, #d4fc79, #96e6a1)",
    quote: "强趋势最好来自长期成长逻辑，而不是一次性消息刺激。",
    tags: ["质量", "研发", "成长"],
    picks: ["中际旭创", "恒瑞医药", "汇川技术"]
  },
  {
    category: "价格行为",
    icon: "fa-chart-simple",
    name: "斯坦·温斯坦",
    avatar: "温",
    avatarStyle: "linear-gradient(135deg, #c471f5, #fa71cd)",
    quote: "二阶段上升趋势最值得参与。优先买突破平台、均线多头、量能健康的股票。",
    tags: ["阶段", "均线", "突破"],
    picks: ["平台突破", "均线多头", "放量新高"]
  },
  {
    category: "逆向投资",
    icon: "fa-arrows-turn-to-dots",
    name: "约翰·聂夫",
    avatar: "聂",
    avatarStyle: "linear-gradient(135deg, #fddb92, #d1fdff)",
    quote: "热门方向也会过热。估值分位高而资金流变弱时，要从进攻转为防守。",
    tags: ["估值", "逆向", "安全边际"],
    picks: ["低PE龙头", "现金流", "红利"]
  },
  {
    category: "产业趋势",
    icon: "fa-microchip",
    name: "凯茜·伍德",
    avatar: "木",
    avatarStyle: "linear-gradient(135deg, #84fab0, #8fd3f4)",
    quote: "科技趋势不会线性前进，但强产业周期中的龙头回踩，往往是更好的买点。",
    tags: ["科技", "创新", "回踩"],
    picks: ["AI算力", "机器人", "半导体设备"]
  },
  {
    category: "组合管理",
    icon: "fa-layer-group",
    name: "达利欧",
    avatar: "达",
    avatarStyle: "linear-gradient(135deg, #a1c4fd, #c2e9fb)",
    quote: "不要只押一个风格。趋势强势股为进攻，红利低波为防守，组合更稳。",
    tags: ["组合", "平衡", "风险"],
    picks: ["趋势股", "红利股", "指数ETF"]
  },
  {
    category: "A股实战",
    icon: "fa-chess-knight",
    name: "令狐冲",
    avatar: "令",
    avatarStyle: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
    quote: "明天看三个点：板块第一是否继续强、核心股是否换手、后排是否掉队。",
    tags: ["板块第一", "核心股", "后排"],
    picks: ["最强板块核心", "换手龙头", "趋势中军"]
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

function escapeHtml(value, fallback = "--") {
  return safe(value, fallback)
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

  const matrix = (market.styleMatrix && market.styleMatrix.length ? market.styleMatrix : derived)
    .map((item, index) => ({ ...derived[index], ...item }));

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

  $("#styleSignals").innerHTML = derived.map((item) => `
    <div class="mini-list-item">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
    </div>
  `).join("");

  $("#styleSummary").textContent = derived.map((item) => `${item.label}：${item.value}`).join("；") + "。交易上优先选择与主风格共振的趋势强势股。";
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
    <div class="volume-kpi"><span>今日成交</span><strong>${escapeHtml(volume.today)}</strong></div>
    <div class="volume-kpi"><span>前一日</span><strong>${escapeHtml(volume.previous)}</strong></div>
    <div class="volume-kpi"><span>变化</span><strong>${escapeHtml(volume.change)}</strong></div>
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
    <div class="volume-note">柱状图口径：沪深两市成交额近22个交易日；若显示“待接入”，表示当前网络无法刷新东方财富日线成交额接口。</div>
  `;
  $("#volumeSummary").textContent = safe(volume.summary, "成交量数据待接入。");
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
      <strong class="${cls}">${escapeHtml(value)}</strong>
    </div>
  `).join("");
  $("#sentimentSummary").textContent = safe(sentiment.summary, "市场情绪数据待接入。");
  if (sentiment.sources && sentiment.sources.length) {
    $("#sentimentSummary").textContent += ` 数据源：${sentiment.sources.join(" / ")}。`;
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
  $("#stockPoolGrid").innerHTML = items.slice(0, 15).map((item) => `
    <article class="stock-pool-card">
      <div class="stock-pool-top">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <span>${escapeHtml(item.code)} · ${escapeHtml(item.sector)}</span>
        </div>
        <em>${escapeHtml(item.action)}</em>
      </div>
      <p>${escapeHtml(item.logic)}</p>
      <div class="stock-pool-bottom">
        <span>${escapeHtml(item.horizon)}</span>
        <span>风控：${escapeHtml(item.risk)}</span>
      </div>
    </article>
  `).join("");
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
    const [market, news] = await Promise.all([
      readJson("market.json"),
      readJson("news.json")
    ]);
    renderHero(market);
    renderIndices(market.indices);
    renderStyleMatrix(market);
    renderVolume(market.volumeAnalysis);
    renderSectors(market.hotSectors);
    renderFundFlows(market.fundFlows);
    renderValuations(market.valuations);
    renderStockAnalysis(market.stockAnalysis);
    renderSentiment(market.sentiment);
    renderAbnormalMoves(market.abnormalMoves);
    renderLhb(market.lhb);
    renderEvents(market.events);
    renderAdvice(market.tradingAdvice);
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
