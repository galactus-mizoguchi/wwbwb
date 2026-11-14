const shrinesData = [
  // 伊勢神宮 (Special)
  {
    id: 1,
    name: "伊勢神宮",
    rank: "upper",
    province: "伊勢国",
    kami: "天照坐皇大御神（内宮）<br>豊受大御神（外宮）",
    address: "三重県伊勢市宇治館町1",
    mapLink: "https://www.google.com/maps/search/?api=1&query=伊勢神宮",
    website: "https://www.isejingu.or.jp/",
    classification: "式内社",
    note: "皇室の氏神であり、神社の別格",
    crest: "hanabishi"
  },

  // 上七社
  {
    id: 2,
    name: "石清水八幡宮",
    rank: "upper",
    province: "山城国",
    kami: "応神天皇<br>比咩大神<br>神功皇后",
    address: "京都府八幡市八幡高坊30",
    mapLink: "https://www.google.com/maps/search/?api=1&query=石清水八幡宮",
    website: "http://www.iwashimizu.or.jp/",
    classification: "官幣大社・勅祭社",
    note: "王城鎮護の神",
    crest: "mitsudomoe"
  },
  {
    id: 3,
    name: "賀茂別雷神社",
    rank: "upper",
    province: "山城国",
    kami: "賀茂別雷大神",
    address: "京都市北区上賀茂本山339",
    mapLink: "https://www.google.com/maps/search/?api=1&query=上賀茂神社",
    website: "https://www.kamigamojinja.jp/",
    classification: "官幣大社・山城国一宮",
    note: "上賀茂神社、競馬発祥の地",
    crest: "aoi"
  },
  {
    id: 4,
    name: "賀茂御祖神社",
    rank: "upper",
    province: "山城国",
    kami: "玉依媛命<br>賀茂建角身命",
    address: "京都市左京区下鴨泉川町59",
    mapLink: "https://www.google.com/maps/search/?api=1&query=下鴨神社",
    website: "https://www.shimogamo-jinja.or.jp/",
    classification: "官幣大社・山城国一宮",
    note: "下鴨神社、糺の森",
    crest: "aoi"
  },
  {
    id: 5,
    name: "松尾大社",
    rank: "upper",
    province: "山城国",
    kami: "大山咋神<br>中津島姫命",
    address: "京都市西京区嵐山宮町3",
    mapLink: "https://www.google.com/maps/search/?api=1&query=松尾大社",
    website: "http://www.matsunoo.or.jp/",
    classification: "官幣大社",
    note: "酒造の神",
    crest: "generic"
  },
  {
    id: 6,
    name: "平野神社",
    rank: "upper",
    province: "山城国",
    kami: "今木皇大神<br>久度大神<br>古開大神<br>比賣大神",
    address: "京都市北区平野宮本町1",
    mapLink: "https://www.google.com/maps/search/?api=1&query=平野神社",
    website: "https://www.hiranojinja.com/",
    classification: "官幣大社",
    note: "桜の名所",
    crest: "generic"
  },
  {
    id: 7,
    name: "伏見稲荷大社",
    rank: "upper",
    province: "山城国",
    kami: "宇迦之御魂大神<br>佐田彦大神 他",
    address: "京都市伏見区深草薮之内町68",
    mapLink: "https://www.google.com/maps/search/?api=1&query=伏見稲荷大社",
    website: "http://inari.jp/",
    classification: "官幣大社",
    note: "全国稲荷の総本宮",
    crest: "generic"
  },
  {
    id: 8,
    name: "春日大社",
    rank: "upper",
    province: "大和国",
    kami: "武甕槌命<br>経津主命<br>天児屋根命<br>比売神",
    address: "奈良県奈良市春日野町160",
    mapLink: "https://www.google.com/maps/search/?api=1&query=春日大社",
    website: "https://www.kasugataisha.or.jp/",
    classification: "官幣大社・勅祭社",
    note: "藤原氏の氏神",
    crest: "fuji"
  },

  // 中七社
  {
    id: 9,
    name: "大原野神社",
    rank: "middle",
    province: "山城国",
    kami: "武御賀豆智命<br>伊波比主命<br>天之子八根命<br>比咩大神",
    address: "京都市西京区大原野南春日町1152",
    mapLink: "https://www.google.com/maps/search/?api=1&query=大原野神社",
    website: "http://oharano-jinja.jp/",
    classification: "官幣中社",
    note: "京春日",
    crest: "fuji" // Casuga of the West
  },
  {
    id: 10,
    name: "大神神社",
    rank: "middle",
    province: "大和国",
    kami: "大物主大神",
    address: "奈良県桜井市三輪1422",
    mapLink: "https://www.google.com/maps/search/?api=1&query=大神神社",
    website: "https://www.oomiwa.or.jp/",
    classification: "官幣大社・大和国一宮",
    note: "日本最古の神社の一つ、三輪山が御神体",
    crest: "generic"
  },
  {
    id: 11,
    name: "石上神宮",
    rank: "middle",
    province: "大和国",
    kami: "布都御魂大神",
    address: "奈良県天理市布留町384",
    mapLink: "https://www.google.com/maps/search/?api=1&query=石上神宮",
    website: "http://www.isonokami.jp/",
    classification: "官幣大社",
    note: "健康長寿・病気平癒、国宝の七支刀",
    crest: "generic"
  },
  {
    id: 12,
    name: "大和神社",
    rank: "middle",
    province: "大和国",
    kami: "日本大国魂大神",
    address: "奈良県天理市新泉町星山306",
    mapLink: "https://www.google.com/maps/search/?api=1&query=大和神社",
    website: "http://ooyamatohp.net/",
    classification: "官幣大社",
    note: "戦艦大和ゆかりの神社",
    crest: "generic"
  },
  {
    id: 13,
    name: "廣瀬大社",
    rank: "middle",
    province: "大和国",
    kami: "若宇加能売命",
    address: "奈良県北葛城郡河合町川合99",
    mapLink: "https://www.google.com/maps/search/?api=1&query=廣瀬大社",
    website: "https://hirosetaisya.com/",
    classification: "官幣大社",
    note: "水の神",
    crest: "generic"
  },
  {
    id: 14,
    name: "龍田大社",
    rank: "middle",
    province: "大和国",
    kami: "天御柱命<br>国御柱命",
    address: "奈良県生駒郡三郷町立野南1-29-1",
    mapLink: "https://www.google.com/maps/search/?api=1&query=龍田大社",
    website: "http://www.tatsutataisha.jp/",
    classification: "官幣大社",
    note: "風の神",
    crest: "generic"
  },
  {
    id: 15,
    name: "住吉大社",
    rank: "middle",
    province: "摂津国",
    kami: "住吉大神（底筒男命・中筒男命・表筒男命）<br>神功皇后",
    address: "大阪市住吉区住吉2-9-89",
    mapLink: "https://www.google.com/maps/search/?api=1&query=住吉大社",
    website: "https://www.sumiyoshitaisha.net/",
    classification: "官幣大社・摂津国一宮",
    note: "航海安全の神",
    crest: "generic"
  },

  // 下八社
  {
    id: 16,
    name: "日吉大社",
    rank: "lower",
    province: "近江国",
    kami: "大己貴神<br>大山咋神",
    address: "滋賀県大津市坂本5丁目1-1",
    mapLink: "https://www.google.com/maps/search/?api=1&query=日吉大社",
    website: "http://hiyoshitaisha.jp/",
    classification: "官幣大社・近江国一宮",
    note: "山王総本宮",
    crest: "generic"
  },
  {
    id: 17,
    name: "梅宮大社",
    rank: "lower",
    province: "山城国",
    kami: "酒解神<br>大若子神",
    address: "京都市右京区梅津フケノ川町30",
    mapLink: "https://www.google.com/maps/search/?api=1&query=梅宮大社",
    website: "http://www.umenomiya.or.jp/",
    classification: "官幣中社",
    note: "酒造・安産",
    crest: "generic"
  },
  {
    id: 18,
    name: "吉田神社",
    rank: "lower",
    province: "山城国",
    kami: "健御賀豆知命 他",
    address: "京都市左京区吉田神楽岡町30",
    mapLink: "https://www.google.com/maps/search/?api=1&query=吉田神社",
    website: "http://www.yoshidajinja.com/",
    classification: "官幣中社",
    note: "厄除け、吉田神道の中心",
    crest: "fuji" // Kasuga branch
  },
  {
    id: 19,
    name: "廣田神社",
    rank: "lower",
    province: "摂津国",
    kami: "天照大神荒魂",
    address: "兵庫県西宮市大社町7-7",
    mapLink: "https://www.google.com/maps/search/?api=1&query=廣田神社",
    website: "https://www.hirotahonsya.or.jp/",
    classification: "官幣大社",
    note: "兵庫県最古の神社",
    crest: "generic"
  },
  {
    id: 20,
    name: "八坂神社",
    rank: "lower",
    province: "山城国",
    kami: "素戔嗚尊<br>櫛稲田姫命<br>八柱御子神",
    address: "京都市東山区祇園町北側625",
    mapLink: "https://www.google.com/maps/search/?api=1&query=八坂神社",
    website: "http://www.yasaka-jinja.or.jp/",
    classification: "官幣大社",
    note: "祇園さん",
    crest: "generic" // mokkou is available but generic for now
  },
  {
    id: 21,
    name: "北野天満宮",
    rank: "lower",
    province: "山城国",
    kami: "菅原道真公",
    address: "京都市上京区馬喰町",
    mapLink: "https://www.google.com/maps/search/?api=1&query=北野天満宮",
    website: "https://kitanotenmangu.or.jp/",
    classification: "官幣中社",
    note: "学問の神様",
    crest: "generic" // umebachi
  },
  {
    id: 22,
    name: "丹生川上神社",
    rank: "lower",
    province: "大和国",
    kami: "淤加美神（上社ほか）",
    address: "奈良県吉野郡（上・中・下社あり）",
    mapLink: "https://www.google.com/maps/search/?api=1&query=丹生川上神社",
    website: "http://www.niukawakami-jinja.jp/",
    classification: "官幣大社",
    note: "雨師の神、上・中・下の三社がある",
    crest: "generic"
  },
  {
    id: 23,
    name: "貴船神社",
    rank: "lower",
    province: "山城国",
    kami: "高龗神",
    address: "京都市左京区鞍馬貴船町180",
    mapLink: "https://www.google.com/maps/search/?api=1&query=貴船神社",
    website: "https://kifunejinja.jp/",
    classification: "官幣中社",
    note: "縁結び・水神、絵馬発祥の地",
    crest: "generic"
  }
];

// 頁を大きく見せる社（3列時 / 2列時）
const WIDE_IDS = [1, 10, 15, 20];
const WIDE_MD_IDS = [15];
// 二社で一社と数える組（賀茂神社）
const SEAT_GROUPS = [[3, 4]];

const RANK_LABELS = { upper: '上', middle: '中', lower: '下' };
const STORAGE_KEY = 'our_22_shrines_progress';
const DATES_KEY = 'our_22_shrines_dates';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 保存 ---------- */
const readStore = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    return fallback;
  }
};
const writeStore = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // 保存できない環境でも表示は続ける
  }
};

const loadProgress = () => readStore(STORAGE_KEY, []);
const loadDates = () => readStore(DATES_KEY, {});

/* ---------- 和暦 ---------- */
const KANJI_DIGITS = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const toKanji = (n) => {
  if (n < 10) return KANJI_DIGITS[n];
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  return `${tens > 1 ? KANJI_DIGITS[tens] : ''}十${ones ? KANJI_DIGITS[ones] : ''}`;
};
const formatWareki = (iso) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear() - 2018;
  if (year < 1) return `${date.getFullYear()}年${toKanji(date.getMonth() + 1)}月${toKanji(date.getDate())}日`;
  return `令和${year === 1 ? '元' : toKanji(year)}年${toKanji(date.getMonth() + 1)}月${toKanji(date.getDate())}日`;
};

/* ---------- 集計 ---------- */
const seats = (() => {
  const grouped = new Set(SEAT_GROUPS.flat());
  return [...SEAT_GROUPS, ...shrinesData.filter((s) => !grouped.has(s.id)).map((s) => [s.id])];
})();

const updateStats = (bump = false) => {
  const visited = loadProgress();
  const seatCount = seats.filter((ids) => ids.every((id) => visited.includes(id))).length;
  const percent = Math.round((seatCount / seats.length) * 100);

  const countSpan = $('#visited-count');
  if (countSpan) {
    countSpan.textContent = seatCount;
    if (bump) {
      countSpan.classList.remove('is-bump');
      void countSpan.offsetWidth;
      countSpan.classList.add('is-bump');
    }
  }
  const setText = (selector, value) => { const el = $(selector); if (el) el.textContent = value; };
  setText('#total-count', seats.length);
  setText('#percent', percent);
  setText('#stamp-count', visited.length);
  setText('#stamp-total', shrinesData.length);
  setText('[data-seats]', seatCount);

  Object.keys(RANK_LABELS).forEach((rank) => {
    const inRank = shrinesData.filter((s) => s.rank === rank);
    setText(`[data-rank-visited="${rank}"]`, inRank.filter((s) => visited.includes(s.id)).length);
    setText(`[data-rank-total="${rank}"]`, inRank.length);
  });

  const line = $('.bar__line i');
  if (line) line.style.setProperty('--p', (seatCount / seats.length).toFixed(4));
  document.body.classList.toggle('is-complete', seatCount === seats.length);
};

/* ---------- 参拝の記録 ---------- */
const applyVisit = (id, isVisited, animate = false) => {
  const card = $(`#shrine-${id}`);
  const dot = $(`[data-dot="${id}"]`);
  const shrine = shrinesData.find((s) => s.id === id);
  if (!card || !shrine) return;

  card.classList.toggle('is-visited', isVisited);
  card.classList.toggle('is-stamping', isVisited && animate);
  const toggle = $('.card__toggle', card);
  toggle.setAttribute('aria-pressed', String(isVisited));
  toggle.setAttribute('aria-label', `${shrine.name}：${isVisited ? '参拝済（押すと取り消し）' : '参拝を記す'}`);
  $('.card__state', card).textContent = isVisited ? '参拝済' : '未参拝';
  const iso = loadDates()[id];
  $('.card__date', card).textContent = isVisited && iso ? formatWareki(iso) : '';

  if (dot) {
    dot.classList.toggle('is-visited', isVisited);
    dot.classList.toggle('is-fresh', isVisited && animate);
  }
};

const toggleVisit = (id) => {
  let visited = loadProgress();
  const dates = loadDates();
  const nowVisited = !visited.includes(id);
  if (nowVisited) {
    visited.push(id);
    dates[id] = new Date().toISOString();
  } else {
    visited = visited.filter((v) => v !== id);
    delete dates[id];
  }
  writeStore(STORAGE_KEY, visited);
  writeStore(DATES_KEY, dates);
  applyVisit(id, nowVisited, true);
  updateStats(true);
};

/* ---------- 描画 ---------- */
const createCard = (shrine, index) => {
  const card = document.createElement('article');
  // CSS変数内のURLはスタイルシート基準で解決されるため、絶対URLにして渡す
  const crestUrl = new URL(`assets/img/crests/${shrine.crest}.png`, document.baseURI).href;
  const crest = `url("${crestUrl}")`;
  card.id = `shrine-${shrine.id}`;
  card.className = [
    'card', 'shrine-card', 'rv',
    WIDE_IDS.includes(shrine.id) ? 'card--wide' : '',
    WIDE_MD_IDS.includes(shrine.id) ? 'card--wide-md' : ''
  ].filter(Boolean).join(' ');
  card.style.setProperty('--crest', crest);
  card.style.setProperty('--d', `${(index % 3) * 0.09}s`);

  const websiteLink = shrine.website
    ? `<a href="${shrine.website}" target="_blank" rel="noopener" class="card__link website-button" title="公式サイト">WEB</a>`
    : '';

  card.innerHTML = `
    <button type="button" class="card__toggle"></button>
    <div class="card__crest shrine-crest" aria-hidden="true"></div>
    <header class="card__head shrine-header">
      <span class="card__no">No.${String(index + 1).padStart(2, '0')}</span>
      <span class="card__tag card__tag--province province-label">${shrine.province}</span>
      <span class="card__tag classification-label">${shrine.classification}</span>
      <span class="card__state">未参拝</span>
    </header>
    <div class="card__body">
      <h3 class="card__name shrine-name">${shrine.name}</h3>
      <p class="card__date" aria-label="参拝日"></p>
      <div class="card__info">
        ${shrine.note ? `<p class="card__note">${shrine.note}</p>` : ''}
        <dl class="card__kami kami-section">
          <dt class="kami-label">御祭神</dt>
          <dd class="kami-name">${shrine.kami}</dd>
        </dl>
      </div>
    </div>
    <div class="card__seal" aria-hidden="true"><i></i></div>
    <footer class="card__foot shrine-footer">
      <address class="card__address shrine-address">${shrine.address}</address>
      <div class="card__actions shrine-actions">
        ${websiteLink}
        <a href="${shrine.mapLink}" target="_blank" rel="noopener" class="card__link card__link--map map-button" title="Google Mapsで開く">MAP</a>
      </div>
    </footer>
  `;

  $('.card__toggle', card).addEventListener('click', () => toggleVisit(shrine.id));
  card.addEventListener('animationend', (event) => {
    if (event.animationName === 'ring') card.classList.remove('is-stamping');
  });
  return card;
};

const renderTrail = () => {
  const trail = $('#trail');
  if (!trail) return;
  const paired = new Set(SEAT_GROUPS.flat());
  Object.entries(RANK_LABELS).forEach(([rank, label]) => {
    const group = document.createElement('div');
    group.className = 'trail__group';
    group.innerHTML = `<span class="trail__label">${label}</span>`;
    shrinesData.filter((s) => s.rank === rank).forEach((shrine) => {
      const dot = document.createElement('a');
      dot.href = `#shrine-${shrine.id}`;
      dot.className = `trail__dot${paired.has(shrine.id) ? ' trail__dot--pair' : ''}`;
      dot.dataset.dot = shrine.id;
      dot.setAttribute('aria-label', shrine.name);
      dot.innerHTML = `<span class="trail__tip">${shrine.name}</span>`;
      group.appendChild(dot);
    });
    trail.appendChild(group);
  });
};

// 国別の分布（社のデータから集計）
const renderProvinces = () => {
  const list = $('#provinces');
  if (!list) return;
  const counts = shrinesData.reduce((acc, { province }) => {
    acc[province] = (acc[province] || 0) + 1;
    return acc;
  }, {});
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const max = sorted[0][1];
  list.innerHTML = sorted.map(([province, count], i) => `
    <li><span>${province}</span><i style="--w:${((count / max) * 100).toFixed(1)}%; --n:${i}"></i><b>${count}</b></li>
  `).join('');
};

const render = () => {
  renderProvinces();
  const visited = loadProgress();
  const containers = {
    upper: $('#upper-list'),
    middle: $('#middle-list'),
    lower: $('#lower-list')
  };

  renderTrail();
  shrinesData.forEach((shrine, index) => {
    const container = containers[shrine.rank];
    if (!container) return;
    container.appendChild(createCard(shrine, index));
    applyVisit(shrine.id, visited.includes(shrine.id));
  });
  updateStats();
};

/* ---------- 文字分割 ---------- */
const splitChars = (el, className) => {
  const text = el.textContent.trim();
  el.textContent = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.className = className;
    span.style.setProperty('--i', i);
    span.textContent = char;
    el.appendChild(span);
  });
};

const setupTypography = () => {
  let heroIndex = 0;
  $$('.hero__col').forEach((col) => {
    splitChars(col, 'hch');
    $$('.hch', col).forEach((char) => char.style.setProperty('--i', heroIndex++));
  });
  $$('.rank__title').forEach((title) => {
    title.setAttribute('aria-label', title.textContent.trim());
    splitChars(title, 'ch');
    $$('.ch', title).forEach((char) => char.setAttribute('aria-hidden', 'true'));
  });

  // 背景を流れる社名
  const names = shrinesData.map((s) => `<span>${s.name}</span>`);
  const rows = $$('.about__row');
  if (rows[0]) rows[0].innerHTML = names.slice(0, 12).join('');
  if (rows[1]) rows[1].innerHTML = names.slice(11).join('');
};

/* ---------- リビール ---------- */
const setupReveal = () => {
  const targets = $$('.rv, .rank__title');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('is-in'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
  targets.forEach((target) => observer.observe(target));
};

/* ---------- スクロール連動 ---------- */
const setupScroll = () => {
  const bar = $('#bar');
  const hero = $('.hero');
  const heroImg = $('.hero__photo img');
  const ghost = $('.hero__ghost');
  const titles = $$('.rank__title');
  const rows = $$('.about__row');
  const navLinks = $$('.bar__nav a');
  const sections = navLinks.map((link) => $(link.getAttribute('href')));
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const heroH = hero ? hero.offsetHeight : 0;

    if (bar) bar.classList.toggle('is-solid', y > heroH - 90);

    if (!reducedMotion) {
      if (y < heroH) {
        if (heroImg) heroImg.style.setProperty('--py', `${(y * 0.2).toFixed(1)}px`);
        if (ghost) ghost.style.setProperty('--gy', `${(y * -0.18).toFixed(1)}px`);
      }
      titles.forEach((title) => {
        const rect = title.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        title.style.setProperty('--dx', `${(progress * Number(title.dataset.drift || 1) * window.innerWidth * 0.07).toFixed(1)}px`);
      });
      rows.forEach((row) => {
        const rect = row.parentNode.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;
        const progress = (vh - rect.top) / (vh + rect.height);
        row.style.setProperty('--mx', `${(progress * Number(row.dataset.row) * -window.innerWidth * 0.5).toFixed(1)}px`);
      });
    }

    let current = -1;
    sections.forEach((section, i) => {
      if (section && section.getBoundingClientRect().top < vh * 0.5) current = i;
    });
    const about = $('#about');
    if (about && about.getBoundingClientRect().top < vh * 0.5) current = -1;
    navLinks.forEach((link, i) => link.classList.toggle('is-current', i === current));
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
};

/* ---------- 木漏れ日に舞う塵 ---------- */
const setupDust = () => {
  const canvas = $('.hero__dust');
  const hero = $('.hero');
  if (!canvas || !hero || reducedMotion) return;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let running = false;
  let pointerX = 0;

  const motes = Array.from({ length: 54 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.6 + Math.random() * 1.9,
    vx: (Math.random() - 0.5) * 0.00012,
    vy: -(0.00006 + Math.random() * 0.00022),
    phase: Math.random() * Math.PI * 2,
    depth: 0.3 + Math.random() * 0.7
  }));

  const resize = () => {
    width = hero.clientWidth;
    height = hero.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  let last = performance.now();
  const frame = (now) => {
    if (!running) return;
    const dt = Math.min(now - last, 50);
    last = now;
    ctx.clearRect(0, 0, width, height);
    motes.forEach((mote) => {
      mote.x += mote.vx * dt + Math.sin(now * 0.0004 + mote.phase) * 0.00004 * dt;
      mote.y += mote.vy * dt;
      if (mote.y < -0.05) { mote.y = 1.05; mote.x = Math.random(); }
      if (mote.x < -0.05) mote.x = 1.05;
      if (mote.x > 1.05) mote.x = -0.05;
      const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(now * 0.0011 + mote.phase));
      const px = mote.x * width + pointerX * 26 * mote.depth;
      const py = mote.y * height;
      const radius = mote.r * mote.depth * 2.4;
      const glow = ctx.createRadialGradient(px, py, 0, px, py, radius * 3);
      glow.addColorStop(0, `rgba(255, 232, 178, ${(0.75 * twinkle * mote.depth).toFixed(3)})`);
      glow.addColorStop(1, 'rgba(255, 232, 178, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(px, py, radius * 3, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(frame);
  };

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX / window.innerWidth - 0.5;
  }, { passive: true });

  new IntersectionObserver(([entry]) => {
    const visible = entry.isIntersecting;
    if (visible && !running) {
      running = true;
      last = performance.now();
      requestAnimationFrame(frame);
    }
    running = visible;
  }).observe(hero);
};

document.addEventListener('DOMContentLoaded', () => {
  setupTypography();
  render();
  setupReveal();
  setupScroll();
  setupDust();

  // フォントが揃ってから幕を開ける
  const open = () => document.body.classList.add('is-ready');
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  fontsReady.then(() => setTimeout(open, 150));
  setTimeout(open, 1800);
});
