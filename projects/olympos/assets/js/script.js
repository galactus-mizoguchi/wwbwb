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

// DOM Elements
const grid = document.getElementById('gods-grid');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');

// Modal Contents
const mImg = document.getElementById('modal-img');
const mJpName = document.getElementById('modal-jp-name');
const mEngName = document.getElementById('modal-eng-name');
const mTitle = document.getElementById('modal-title');
const mDesc = document.getElementById('modal-desc');
const mSymbols = document.getElementById('modal-symbols');

// 初期化処理
window.addEventListener('DOMContentLoaded', () => {
  // ローディング画面の制御
  setTimeout(() => {
    const loader = document.getElementById('loading');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.pointerEvents = 'none';
    }

    // ヒーローコンテンツのアニメーション開始
    const heroContent = document.getElementById('hero-content');
    if (heroContent) {
      heroContent.classList.add('visible');
    }
  }, 1500);

  // フィルタリング初期化
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGods(btn.dataset.filter);
    });
  });

  renderGods();
  createParticles();
  initTimeline();
});

// タイムラインアニメーション初期化
function initTimeline() {
  const items = document.querySelectorAll('.timeline-content');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => observer.observe(item));
}

// カードの生成
function renderGods(filter = 'all') {
  grid.innerHTML = '';

  const filteredData = filter === 'all'
    ? godsData
    : godsData.filter(god => god.gender === filter);

  filteredData.forEach((god, index) => {
    const card = document.createElement('div');
    card.className = 'god-card';
    card.onclick = () => openModal(god);

    // 遅延表示アニメーション用のスタイル
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    card.innerHTML = `
      <div class="god-image-container">
        <img src="${god.img}" alt="${god.name}" class="god-image">
        <div class="card-overlay"></div>
      </div>
      
      <div class="card-content">
        <p class="card-eng-name eng-font">${god.engName}</p>
        <h3 class="card-name eng-font">${god.name}</h3>
        <p class="card-description">${god.title}</p>
        <div class="card-divider"></div>
      </div>
      
      <div class="card-icon">
        <svg xmlns="http://www.w3.org/2000/svg" style="width: 1.5rem; height: 1.5rem;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
      </div>
    `;

    grid.appendChild(card);

    // スクロール検知によるフェードイン
    observeElement(card, index * 100);
  });
}

// Intersection Observerの設定
function observeElement(element, delay) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  observer.observe(element);
}

/* Oracle Logic */
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

let currentQIndex = 0;
let scores = { "Leader": 0, "Wisdom": 0, "Passion": 0, "Nature": 0 };

function startOracle() {
  document.getElementById('oracle-start').style.display = 'none';
  document.getElementById('oracle-quiz').style.display = 'block';
  currentQIndex = 0;
  scores = { "Leader": 0, "Wisdom": 0, "Passion": 0, "Nature": 0 };
  showQuestion();
}

function showQuestion() {
  const q = oracleQuestions[currentQIndex];
  document.getElementById('q-number').textContent = currentQIndex + 1;
  document.getElementById('q-text').textContent = q.text;

  const optionsDiv = document.getElementById('q-options');
  optionsDiv.innerHTML = '';

  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.onclick = () => handleAnswer(opt.type);
    optionsDiv.appendChild(btn);
  });
}

function handleAnswer(type) {
  scores[type]++;
  currentQIndex++;

  if (currentQIndex < oracleQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('oracle-quiz').style.display = 'none';

  // Find max score
  let maxType = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  // Get random god from type
  const candidates = godTypes[maxType];
  const godId = candidates[Math.floor(Math.random() * candidates.length)];
  const god = godsData.find(g => g.id === godId);

  const resultDiv = document.getElementById('oracle-result');
  resultDiv.style.display = 'block';
  resultDiv.innerHTML = `
    <div class="text-center oracle-result">
      <p class="oracle-result-title">YOUR GUARDIAN GOD</p>
      <h3 class="oracle-result-name">${god.name}</h3>
      <div class="oracle-avatar">
        <img src="${god.img}" class="w-full h-full object-cover">
      </div>
      <p class="oracle-result-desc">${god.title}</p>
      <button onclick="location.reload()" class="text-sm text-slate-500 hover:text-white transition-colors">
        最初に戻る
      </button>
    </div>
  `;
}

// モーダルを開く
function openModal(god) {
  mImg.src = god.img;
  mJpName.textContent = god.name;
  mEngName.textContent = god.engName;
  mTitle.textContent = god.title;
  mDesc.textContent = god.desc;
  mSymbols.textContent = god.symbols;

  modal.classList.add('active');
  modal.querySelector('#modal-content').style.transform = 'scale(1)';
  document.body.style.overflow = 'hidden';
}

// モーダルを閉じる
function closeModal() {
  modal.classList.remove('active');
  modal.querySelector('#modal-content').style.transform = 'scale(0.95)';
  setTimeout(() => {
    mImg.src = '';
    document.body.style.overflow = 'auto';
  }, 300);
}

modalClose.onclick = closeModal;
modalOverlay.onclick = closeModal;

// Escキーで閉じる
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ナビゲーションバーの背景制御
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// パーティクル生成
function createParticles() {
  const container = document.getElementById('particles-container');
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');

    // ランダムな位置とサイズ
    const size = Math.random() * 3 + 1;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}vw`;

    // ランダムなアニメーション遅延と時間
    p.style.animationDuration = `${Math.random() * 10 + 10}s`;
    p.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(p);
  }
}
