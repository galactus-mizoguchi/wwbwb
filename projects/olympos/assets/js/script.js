// 12神のデータ
const godsData = [
  {
    id: 1,
    name: "ゼウス",
    engName: "ZEUS",
    title: "神々の王・天空と雷の神",
    desc: "オリンポス十二神の主神であり、全知全能の存在。クロノスを倒し、兄弟たちと世界を分かち合った。正義と法を司り、浮気性な一面もあるが、神々と人間の秩序を守る絶対的な権力者。",
    symbols: "雷霆（ケラウノス）、鷲、オークの木",
    // 彫像
    img: "assets/img/zeus.png",
    category: "Sky",
    gender: "Male"
  },
  {
    id: 2,
    name: "ヘラ",
    engName: "HERA",
    title: "結婚と出産の女神・神々の女王",
    desc: "ゼウスの妻であり姉。結婚生活の守護神として崇められる。極めて嫉妬深く、ゼウスの愛人やその子供たちには容赦ない制裁を加えることで知られるが、その威厳はオリンポス随一である。",
    symbols: "孔雀、王冠、ザクロ、ライオン",
    // 孔雀の羽（象徴）
    img: "assets/img/hera.png",
    category: "Queen",
    gender: "Female"
  },
  {
    id: 3,
    name: "ポセイドン",
    engName: "POSEIDON",
    title: "海と地震の神",
    desc: "ゼウスの兄。三叉の矛（トリアイナ）を振るい、海を自在に操り、地震を引き起こす。気性が荒く、船乗りたちからは畏怖と崇拝の対象となっている。馬の創造者とも言われる。",
    symbols: "三叉の矛、馬、イルカ、魚",
    // 荒れ狂う海
    img: "assets/img/poseidon.png",
    category: "Sea",
    gender: "Male"
  },
  {
    id: 4,
    name: "デメテル",
    engName: "DEMETER",
    title: "豊穣と農耕の女神",
    desc: "大地の生産力を司る母なる神。娘のペルセポネが冥界に連れ去られた際、悲しみのあまり地上を不毛の冬に変えた。彼女の恩恵なくして人間は生きていくことができない。",
    symbols: "麦の穂、松明、豊穣の角",
    // 小麦畑
    img: "assets/img/demeter.png",
    category: "Harvest",
    gender: "Female"
  },
  {
    id: 5,
    name: "アテナ",
    engName: "ATHENA",
    title: "知恵と戦術の女神",
    desc: "ゼウスの頭から武装した姿で生まれた。アテナイの守護神。力任せの戦いではなく、知略を用いた戦いを司る。また、機織りや工芸の守護者でもあり、理知的で冷静な女神。",
    symbols: "フクロウ、オリーブ、アイギスの盾",
    // フクロウ（象徴）
    img: "assets/img/athena.png",
    category: "Wisdom",
    gender: "Female"
  },
  {
    id: 6,
    name: "アポロン",
    engName: "APOLLO",
    title: "太陽・音楽・予言の神",
    desc: "理想的な美しさを持つ青年神。竪琴の名手であり、ミューズたちを率いて芸術を司る。また、弓の名手でもあり、疫病をもたらす一方で医術の神でもある多面的な性質を持つ。",
    symbols: "竪琴、月桂樹、弓矢、太陽",
    // 神殿と太陽
    img: "assets/img/apollo.png",
    category: "Sun",
    gender: "Male"
  },
  {
    id: 7,
    name: "アルテミス",
    engName: "ARTEMIS",
    title: "狩猟と純潔の女神・月の神",
    desc: "アポロンの双子の妹。森と野生動物の守護神であり、優れた弓の使い手。純潔を重んじ、男性を近づけない。夜の森をニンフたちと共に駆け巡る、美しくも厳しい女神。",
    symbols: "弓矢、鹿、月、柏の木",
    // 森と鹿
    img: "assets/img/artemis.jpg",
    category: "Hunt",
    gender: "Female"
  },
  {
    id: 8,
    name: "アレス",
    engName: "ARES",
    title: "軍神・戦争の神",
    desc: "戦場における狂乱と破壊を司る。アテナとは対照的に、血なまぐさい暴力を好むため、他の神々からは疎まれることも多いが、その勇猛さはスパルタなどで崇拝された。",
    symbols: "槍、盾、兜、犬、ハゲタカ",
    // 兜（スパルタ）
    img: "assets/img/ares.jpg",
    category: "War",
    gender: "Male"
  },
  {
    id: 9,
    name: "アフロディーテ",
    engName: "APHRODITE",
    title: "愛と美の女神",
    desc: "海の泡から生まれたとされる、最高の美貌を持つ女神。神々や人間の心を惑わし、恋に落とす力を持つ。エロス（キューピッド）を従え、愛の喜びと苦しみをもたらす。",
    symbols: "鳩、バラ、リンゴ、鏡",
    // 美しい彫像
    img: "assets/img/aphrodite.jpg",
    category: "Love",
    gender: "Female"
  },
  {
    id: 10,
    name: "ヘパイストス",
    engName: "HEPHAESTUS",
    title: "炎と鍛冶の神",
    desc: "神々の武器や宮殿を作り出す卓越した職人。容姿は醜いが、その技術は右に出るものがいない。アフロディーテの夫となるが、その結婚生活は多難であった。",
    symbols: "金槌、金床、火、火山",
    // 炎と鉄
    img: "assets/img/hephaestus.jpg",
    category: "Fire",
    gender: "Male"
  },
  {
    id: 11,
    name: "ヘルメス",
    engName: "HERMES",
    title: "伝令神・旅人と商人の守護神",
    desc: "翼のあるサンダルを履き、風のように空を駆ける神々のメッセンジャー。弁舌に優れ、商売や泥棒、発明の神でもある。死者の魂を冥界へ導く役割も担うトリックスター。",
    symbols: "ケーリュケイオン（杖）、翼のあるサンダル",
    // 翼のある像
    img: "assets/img/hermes.jpg",
    category: "Speed",
    gender: "Male"
  },
  {
    id: 12,
    name: "ディオニュソス",
    engName: "DIONYSUS",
    title: "豊穣とブドウ酒の神",
    desc: "ワインと酩酊、演劇を司る神。人々を陶酔させ、日常の束縛から解放する力を持つ。熱狂的な信者を連れて各地を放浪し、葡萄栽培を広めた。",
    symbols: "ブドウ、杯、キヅタ、ヒョウ",
    // 葡萄とワイン
    img: "assets/img/dionysos.jpg",
    category: "Wine",
    gender: "Male"
  }
];

/* Oracle Data */
const oracleQuestions = [
  {
    text: "あなたが最も大切にしているものは？",
    options: [
      { text: "圧倒的な力と権威", type: "Leader" },
      { text: "知恵と真実", type: "Wisdom" },
      { text: "情熱と愛", type: "Passion" },
      { text: "自然との調和", type: "Nature" }
    ]
  },
  {
    text: "休日の理想的な過ごし方は？",
    options: [
      { text: "友人を集めてパーティー", type: "Passion" },
      { text: "一人で静かに読書や創作", type: "Wisdom" },
      { text: "海や山へ出かける", type: "Nature" },
      { text: "将来の計画を練る", type: "Leader" }
    ]
  },
  {
    text: "もし魔法が使えるなら？",
    options: [
      { text: "天候を操る", type: "Leader" },
      { text: "植物を育てる", type: "Nature" },
      { text: "人の心を操る", type: "Passion" },
      { text: "未来を見通す", type: "Wisdom" }
    ]
  }
];

// Type to God ID mapping
const godTypes = {
  "Leader": [1, 2, 3], // Zeus, Hera, Poseidon
  "Wisdom": [5, 6, 11], // Athena, Apollo, Hermes
  "Passion": [8, 9, 12], // Ares, Aphrodite, Dionysus
  "Nature": [4, 7, 10] // Demeter, Artemis, Hephaestus
};

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

/* ---------- 開幕 ---------- */
const setupLoader = () => {
  const counter = $('[data-loader-count]');
  const open = () => document.body.classList.add('is-ready');
  if (reducedMotion || !counter) {
    open();
    return;
  }
  let step = 0;
  const timer = setInterval(() => {
    step += 1;
    counter.textContent = ROMAN[Math.min(step, ROMAN.length - 1)];
    if (step >= ROMAN.length - 1) {
      clearInterval(timer);
      setTimeout(open, 320);
    }
  }, 85);
  // 念のための保険
  setTimeout(open, 3200);
};

/* ---------- 文字分割 ---------- */
const splitChars = (el, className) => {
  const text = el.textContent.trim();
  el.textContent = '';
  [...text].forEach((char, i) => {
    if (char === ' ') {
      el.appendChild(document.createTextNode(' '));
      return;
    }
    const span = document.createElement('span');
    span.className = className;
    span.style.setProperty('--i', i);
    span.textContent = char;
    el.appendChild(span);
  });
};

const setupTypography = () => {
  $$('.hero__word').forEach((word) => splitChars(word, 'hch'));
  $$('.sec-head__title').forEach((title) => {
    title.setAttribute('aria-label', title.textContent.trim());
    splitChars(title, 'ch');
    $$('.ch', title).forEach((char) => char.setAttribute('aria-hidden', 'true'));
  });
};

/* ---------- 十二神の円環 ---------- */
const buildRing = () => {
  const ring = $('#hero-ring');
  if (!ring) return;
  const marks = godsData.map((god, i) => `
    <g transform="rotate(${i * 30} 500 500)">
      <line x1="500" y1="92" x2="500" y2="116"/>
      <text class="ring__num" x="500" y="74" text-anchor="middle">${ROMAN[i]}</text>
      <text class="ring__name" x="500" y="152" text-anchor="middle">${god.engName}</text>
    </g>`).join('');
  ring.innerHTML = `
    <svg viewBox="0 0 1000 1000">
      <circle class="ring__faint" cx="500" cy="500" r="470"/>
      <circle cx="500" cy="500" r="408"/>
      <circle class="ring__dash" cx="500" cy="500" r="330"/>
      ${marks}
    </svg>`;
};

/* ---------- 星空 ---------- */
const setupStars = () => {
  const canvas = $('.hero__stars');
  const hero = $('.hero');
  if (!canvas || !hero || reducedMotion) return;
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = 0;
  let height = 0;
  let running = false;
  let meteor = null;
  let nextMeteor = performance.now() + 3500;

  const stars = Array.from({ length: 170 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.3 + Math.random() * 1.2,
    phase: Math.random() * Math.PI * 2,
    speed: 0.0006 + Math.random() * 0.0016,
    gold: Math.random() < 0.3
  }));

  const resize = () => {
    width = hero.clientWidth;
    height = hero.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const frame = (now) => {
    if (!running) return;
    ctx.clearRect(0, 0, width, height);
    stars.forEach((star) => {
      const alpha = 0.15 + 0.85 * Math.abs(Math.sin(now * star.speed + star.phase));
      ctx.fillStyle = star.gold ? `rgba(244, 225, 174, ${alpha.toFixed(3)})` : `rgba(238, 236, 255, ${(alpha * 0.8).toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(star.x * width, star.y * height, star.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 流れ星
    if (!meteor && now > nextMeteor) {
      meteor = { x: Math.random() * width * 0.8 + width * 0.2, y: Math.random() * height * 0.35, born: now };
    }
    if (meteor) {
      const t = (now - meteor.born) / 900;
      if (t >= 1) {
        meteor = null;
        nextMeteor = now + 4000 + Math.random() * 6000;
      } else {
        const headX = meteor.x - t * 360;
        const headY = meteor.y + t * 170;
        const tail = ctx.createLinearGradient(headX, headY, headX + 150, headY - 70);
        tail.addColorStop(0, `rgba(244, 225, 174, ${(1 - t).toFixed(3)})`);
        tail.addColorStop(1, 'rgba(244, 225, 174, 0)');
        ctx.strokeStyle = tail;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(headX + 150, headY - 70);
        ctx.stroke();
      }
    }
    requestAnimationFrame(frame);
  };

  resize();
  window.addEventListener('resize', resize);
  new IntersectionObserver(([entry]) => {
    const visible = entry.isIntersecting;
    if (visible && !running) {
      running = true;
      requestAnimationFrame(frame);
    }
    running = visible;
  }).observe(hero);
};

/* ---------- リビール ---------- */
const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
  : null;

const reveal = (el) => {
  if (revealObserver) revealObserver.observe(el);
  else el.classList.add('is-in');
};

/* ---------- 神々のカード ---------- */
const grid = $('#gods-grid');

const renderGods = (filter = 'all') => {
  if (!grid) return;
  grid.innerHTML = '';
  const filtered = filter === 'all' ? godsData : godsData.filter((god) => god.gender === filter);

  filtered.forEach((god, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'god god-card';
    card.style.setProperty('--d', `${(index % 4) * 0.08}s`);
    card.setAttribute('aria-label', `${god.name}（${god.engName}）の伝承を開く`);
    card.innerHTML = `
      <span class="god__img"><img src="${god.img}" alt="" loading="lazy"></span>
      <span class="god__no">${ROMAN[god.id - 1]}</span>
      <span class="god__cat">${god.category}</span>
      <span class="god__meta">
        <span class="god__eng">${god.engName}</span>
        <span class="god__jp">${god.name}</span>
        <span class="god__title">${god.title}</span>
        <span class="god__more">VIEW</span>
      </span>
    `;
    card.addEventListener('click', () => openModal(god.id, card));
    grid.appendChild(card);
    reveal(card);
  });
};

const setupFilters = () => {
  const buttons = $$('.filter');
  buttons.forEach((button) => {
    const key = button.dataset.filter;
    const count = key === 'all' ? godsData.length : godsData.filter((god) => god.gender === key).length;
    const badge = $('sup', button);
    if (badge) badge.textContent = count;
    button.addEventListener('click', () => {
      buttons.forEach((other) => {
        const active = other === button;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', String(active));
      });
      renderGods(key);
    });
  });
};

/* ---------- 神々の詳細（モーダル） ---------- */
const modal = $('#modal');
let modalIndex = 0;
let modalTrigger = null;
let modalTimer = 0;

const fillModal = (index) => {
  const god = godsData[index];
  modalIndex = index;
  const img = $('#modal-img');
  img.src = god.img;
  img.alt = god.name;
  $('#modal-no').textContent = ROMAN[index];
  $('#modal-eng-name').textContent = god.engName;
  $('#modal-eng-label').textContent = god.engName;
  $('#modal-jp-name').textContent = god.name;
  $('#modal-title').textContent = god.title;
  $('#modal-desc').textContent = god.desc;
  $('#modal-symbols').innerHTML = god.symbols.split('、').map((symbol) => `<li>${symbol}</li>`).join('');
  $('#modal-index').textContent = String(index + 1).padStart(2, '0');

  modal.classList.remove('is-swapping');
  void modal.offsetWidth;
  modal.classList.add('is-swapping');
  const text = $('.modal__text', modal);
  if (text) text.scrollTop = 0;
};

const openModal = (godId, trigger = null) => {
  const index = godsData.findIndex((god) => god.id === Number(godId));
  if (index < 0 || !modal) return;
  clearTimeout(modalTimer);
  modalTrigger = trigger;
  modal.hidden = false;
  fillModal(index);
  document.body.classList.add('is-locked');
  requestAnimationFrame(() => {
    modal.classList.add('is-active');
    $('#modal-close').focus({ preventScroll: true });
  });
};

const closeModal = () => {
  if (!modal || modal.hidden) return;
  modal.classList.remove('is-active');
  document.body.classList.remove('is-locked');
  modalTimer = setTimeout(() => {
    modal.hidden = true;
    $('#modal-img').src = '';
  }, 520);
  if (modalTrigger && document.contains(modalTrigger)) modalTrigger.focus({ preventScroll: true });
};

const stepModal = (direction) => {
  fillModal((modalIndex + direction + godsData.length) % godsData.length);
};

const setupModal = () => {
  if (!modal) return;
  $('#modal-close').addEventListener('click', closeModal);
  $('#modal-overlay').addEventListener('click', closeModal);
  $('#modal-prev').addEventListener('click', () => stepModal(-1));
  $('#modal-next').addEventListener('click', () => stepModal(1));
  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') stepModal(-1);
    if (event.key === 'ArrowRight') stepModal(1);
  });
  // 系譜から神々の詳細へ
  $$('[data-god]').forEach((node) => {
    node.addEventListener('click', () => openModal(node.dataset.god, node));
  });
};

/* ---------- 神託 ---------- */
let currentQIndex = 0;
let scores = { "Leader": 0, "Wisdom": 0, "Passion": 0, "Nature": 0 };

const showPanel = (name) => {
  $$('.oracle__panel').forEach((panel) => {
    const active = panel.dataset.panel === name;
    panel.hidden = !active;
    panel.classList.toggle('is-active', active);
  });
};

const showQuestion = () => {
  const question = oracleQuestions[currentQIndex];
  $('#q-number').textContent = currentQIndex + 1;
  $('#q-text').textContent = question.text;
  $('#q-dots').innerHTML = oracleQuestions
    .map((_, i) => `<i class="${i <= currentQIndex ? 'is-done' : ''}"></i>`)
    .join('');

  const options = $('#q-options');
  options.innerHTML = '';
  question.options.forEach((option, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option option-btn';
    button.style.setProperty('--i', i);
    button.innerHTML = `<i>${'ABCD'[i]}</i><span>${option.text}</span>`;
    button.addEventListener('click', () => handleAnswer(option.type));
    options.appendChild(button);
  });

  // 設問が変わるたびにパネルを再生する
  const panel = $('#oracle-quiz');
  panel.classList.remove('is-active');
  void panel.offsetWidth;
  panel.classList.add('is-active');
};

const startOracle = () => {
  currentQIndex = 0;
  scores = { "Leader": 0, "Wisdom": 0, "Passion": 0, "Nature": 0 };
  showPanel('quiz');
  showQuestion();
};

const handleAnswer = (type) => {
  scores[type] += 1;
  currentQIndex += 1;
  if (currentQIndex < oracleQuestions.length) showQuestion();
  else showResult();
};

const showResult = () => {
  // 最も得点の高いタイプから、守護神を一柱選ぶ
  const maxType = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
  const candidates = godTypes[maxType];
  const godId = candidates[Math.floor(Math.random() * candidates.length)];
  const god = godsData.find((item) => item.id === godId);

  const result = $('#oracle-result');
  result.innerHTML = `
    <p class="oracle__label oracle-result-title">YOUR GUARDIAN GOD</p>
    <div class="oracle__avatar oracle-avatar"><img src="${god.img}" alt="${god.name}"></div>
    <p class="oracle__eng">${god.engName}</p>
    <h3 class="oracle__name oracle-result-name">${god.name}</h3>
    <p class="oracle__title oracle-result-desc">${god.title}</p>
    <div class="oracle__actions">
      <button type="button" class="btn" data-oracle-detail><span>伝承を見る</span><i aria-hidden="true"></i></button>
      <button type="button" class="btn btn--ghost" data-oracle-reset><span>最初に戻る</span></button>
    </div>
  `;
  $('[data-oracle-detail]', result).addEventListener('click', (event) => openModal(god.id, event.currentTarget));
  $('[data-oracle-reset]', result).addEventListener('click', () => showPanel('start'));
  showPanel('result');
};

const setupOracle = () => {
  const begin = $('#oracle-begin');
  if (begin) begin.addEventListener('click', startOracle);
};

/* ---------- ナビゲーション ---------- */
const setupNav = () => {
  const nav = $('#navbar');
  const toggle = $('#nav-toggle');
  if (!nav || !toggle) return;
  const setOpen = (open) => {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    document.body.classList.toggle('is-locked', open);
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
  $$('.nav__links a', nav).forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
  });
};

/* ---------- スクロール連動 ---------- */
const setupScroll = () => {
  const nav = $('#navbar');
  const progress = $('.nav__progress i');
  const hero = $('.hero');
  const sky = $('.hero__sky img');
  const content = $('.hero__content');
  const ring = $('#hero-ring');
  const titles = $$('.sec-head__title');
  const chron = $('#chron');
  const links = $$('.nav__links a');
  const sections = links.map((link) => $(link.getAttribute('href')));
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;

    if (nav) nav.classList.toggle('is-scrolled', y > 40);
    if (progress) progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);

    if (!reducedMotion) {
      if (hero && y < hero.offsetHeight) {
        if (sky) sky.style.setProperty('--py', `${(y * 0.22).toFixed(1)}px`);
        if (content) content.style.setProperty('--cy', `${(y * -0.16).toFixed(1)}px`);
        if (ring) ring.style.setProperty('--rs', (1 + y / hero.offsetHeight * 0.35).toFixed(3));
      }
      titles.forEach((title) => {
        const rect = title.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        // 画面中央で定位置に収まり、離れるほど右へ流れる（左端で欠けないように）
        const offset = Math.abs(rect.top + rect.height / 2 - vh / 2) / vh;
        title.style.setProperty('--dx', `${(offset * window.innerWidth * 0.09).toFixed(1)}px`);
      });
    }

    if (chron) {
      const rect = chron.getBoundingClientRect();
      chron.style.setProperty('--cp', clamp((vh * 0.62 - rect.top) / rect.height, 0, 1).toFixed(4));
    }

    let current = -1;
    sections.forEach((section, i) => {
      if (section && section.getBoundingClientRect().top < vh * 0.5) current = i;
    });
    links.forEach((link, i) => link.classList.toggle('is-current', i === current));
  };

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
};

/* ---------- 初期化 ---------- */
window.addEventListener('DOMContentLoaded', () => {
  setupTypography();
  buildRing();
  setupFilters();
  renderGods();
  setupModal();
  setupOracle();
  setupNav();
  $$('.rv, .sec-head__title, .chron__item').forEach(reveal);
  setupScroll();
  setupStars();
  setupLoader();
});
