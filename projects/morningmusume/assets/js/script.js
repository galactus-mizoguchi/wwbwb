/**
 * モーニング娘。いまむかし - メインスクリプト
 */

// ============================================
// 定数・設定
// ============================================

const DATA_PATH = 'assets/data/members.json';
const FOUNDED_YEAR = 1997;

// 名前をローマ字に変換するマッピング
const NAME_TO_ROMAJI = {
  '中澤裕子': 'Yuko Nakazawa',
  '福田明日香': 'Asuka Fukuda',
  '石黒彩': 'Aya Ishiguro',
  '飯田圭織': 'Kaori Iida',
  '安倍なつみ': 'Natsumi Abe',
  '保田圭': 'Kei Yasuda',
  '矢口真里': 'Mari Yaguchi',
  '市井紗耶香': 'Sayaka Ichii',
  '後藤真希': 'Maki Goto',
  '石川梨華': 'Rika Ishikawa',
  '吉澤ひとみ': 'Hitomi Yoshizawa',
  '辻希美': 'Nozomi Tsuji',
  '加護亜依': 'Ai Kago',
  '高橋愛': 'Ai Takahashi',
  '紺野あさ美': 'Asami Konno',
  '小川麻琴': 'Makoto Ogawa',
  '新垣里沙': 'Risa Niigaki',
  '藤本美貴': 'Miki Fujimoto',
  '亀井絵里': 'Eri Kamei',
  '道重さゆみ': 'Sayumi Michishige',
  '田中れいな': 'Reina Tanaka',
  '久住小春': 'Koharu Kusumi',
  '光井愛佳': 'Aika Mitsui',
  'ジュンジュン': 'Junjun',
  'リンリン': 'Linlin',
  '譜久村聖': 'Mizuki Fukumura',
  '生田衣梨奈': 'Erina Ikuta',
  '鞘師里保': 'Riho Sayashi',
  '鈴木香音': 'Kanon Suzuki',
  '飯窪春菜': 'Haruna Iikubo',
  '石田亜佑美': 'Ayumi Ishida',
  '佐藤優樹': 'Masaki Sato',
  '工藤遥': 'Haruka Kudo',
  '小田さくら': 'Sakura Oda',
  '尾形春水': 'Haruka Ogata',
  '野中美希': 'Miki Nonaka',
  '牧野真莉愛': 'Maria Makino',
  '羽賀朱音': 'Akane Haga',
  '加賀楓': 'Kaede Kaga',
  '横山玲奈': 'Reina Yokoyama',
  '森戸知沙希': 'Chisaki Morito',
  '北川莉央': 'Rio Kitagawa',
  '岡村ほまれ': 'Homare Okamura',
  '山﨑愛生': 'Mei Yamazaki',
  '櫻井梨央': 'Rio Sakurai',
  '井上春華': 'Haruka Inoue',
  '弓桁朱琴': 'Akane Yugeta'
};

// ============================================
// 状態
// ============================================

let membersData = [];
let visibleMembers = [];
let modalIndex = 0;
let modalTrigger = null;
let modalTimer = 0;
const filterState = { generation: 'all', status: 'all' };

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================
// ユーティリティ関数
// ============================================

/**
 * 日付をフォーマットする (YYYY.MM.DD)
 */
const formatDate = (dateString) => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

/**
 * 年齢を計算する
 */
const calculateAge = (birthDateString) => {
  if (!birthDateString) return null;
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
};

/**
 * 序数を取得する (1st, 2nd, 3rd, 4th...)
 */
const getOrdinal = (n) => {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
};

/**
 * 在籍期間を「X年Yヶ月」で返す
 */
const formatTenure = (member) => {
  const from = new Date(member.joinDate);
  const to = member.graduateDate ? new Date(member.graduateDate) : new Date();
  let months = (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth());
  if (to.getDate() < from.getDate()) months--;
  months = Math.max(months, 0);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return `${years ? `${years}年` : ''}${rest || !years ? `${rest}ヶ月` : ''}`;
};

const isActive = (member) => member.graduateDate === null;
const pad2 = (n) => String(n).padStart(2, '0');

// ============================================
// リビール
// ============================================

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 })
  : null;

const reveal = (el) => {
  if (revealObserver) revealObserver.observe(el);
  else el.classList.add('is-in');
};

// ============================================
// 文字分割
// ============================================

const splitChars = (el, className) => {
  let index = 0;
  [...el.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const fragment = document.createDocumentFragment();
      [...node.textContent.trim()].forEach((char) => {
        const span = document.createElement('span');
        span.className = className;
        span.style.setProperty('--i', index++);
        span.setAttribute('aria-hidden', 'true');
        span.textContent = char;
        fragment.appendChild(span);
      });
      el.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      node.classList.add(className);
      node.style.setProperty('--i', index++);
      node.setAttribute('aria-hidden', 'true');
    }
  });
};

const setupTypography = () => {
  $$('.hero__main, .hero__sub').forEach((el) => splitChars(el, 'hch'));
  $$('.sec-head__title').forEach((title) => {
    title.setAttribute('aria-label', title.textContent.trim());
    splitChars(title, 'ch');
    reveal(title);
  });
};

// ============================================
// データ読み込み
// ============================================

/**
 * メンバーデータを読み込む
 */
const loadMembersData = async () => {
  try {
    const response = await fetch(DATA_PATH);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    membersData = data.members || [];
    renderLights();
    renderStats();
    renderChart();
    renderFooterDeco();
    applyFilters();
  } catch (error) {
    console.error('メンバーデータの読み込みに失敗しました:', error);
    const grid = $('#membersGrid');
    if (grid) grid.innerHTML = '<p class="members-empty">データの読み込みに失敗しました。</p>';
  }
};

// ============================================
// ヒーロー：ペンライトと数字
// ============================================

/**
 * 客席のペンライトを並べる（47本）
 */
const renderLights = () => {
  const stage = $('#lights');
  if (!stage) return;
  const total = membersData.length;
  stage.innerHTML = '';
  membersData.forEach((member, i) => {
    const row = (i * 17) % 5; // 0が最前列
    const light = document.createElement('button');
    light.type = 'button';
    light.className = 'light';
    light.setAttribute('aria-label', `${member.name}（${member.colorName}）`);
    light.style.cssText = [
      `--c:${member.color}`,
      `--x:${((((i * 37) % total) + 0.5) / total * 100).toFixed(2)}%`,
      `--y:${4 + row * 15}%`,
      `--s:${(1.2 - row * 0.14).toFixed(2)}`,
      `--o:${(1 - row * 0.11).toFixed(2)}`,
      `--z:${5 - row}`,
      `--dur:${(1.9 + ((i * 13) % 9) * 0.16).toFixed(2)}s`,
      `--delay:-${((i * 7) % 11) * 0.21}s`,
      `--amp:${8 + ((i * 5) % 7)}deg`,
      `--ld:${(1.5 + ((i * 11) % total) * 0.024).toFixed(2)}s`
    ].join(';');
    light.innerHTML = `<span class="light__stick"></span><span class="light__name">${member.name}</span>`;
    light.addEventListener('click', () => {
      visibleMembers = membersData;
      showMemberModal(member, light);
    });
    stage.appendChild(light);
  });
};

/**
 * 数字を数え上げる
 */
const countUp = (el, target) => {
  if (reducedMotion) {
    el.textContent = target;
    return;
  }
  const start = performance.now();
  const duration = 1600;
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 4)));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const renderStats = () => {
  const values = {
    members: membersData.length,
    generations: new Set(membersData.map((member) => member.generation)).size,
    active: membersData.filter(isActive).length,
    years: new Date().getFullYear() - FOUNDED_YEAR
  };
  $$('[data-stat]').forEach((el) => {
    const target = values[el.dataset.stat];
    el.textContent = target;
    setTimeout(() => countUp(el, target), 1700);
  });
};

// ============================================
// 年表
// ============================================

const renderChart = () => {
  const inner = $('#chartInner');
  if (!inner) return;
  const now = new Date();
  const startYear = FOUNDED_YEAR;
  const endYear = now.getFullYear() + 1;
  const years = endYear - startYear;
  const start = new Date(startYear, 0, 1).getTime();
  const span = new Date(endYear, 0, 1).getTime() - start;
  const ratio = (dateString) => (new Date(dateString).getTime() - start) / span;

  const yearLabels = [];
  for (let i = 0; i < years; i += 2) {
    yearLabels.push(`<span class="${i === 0 ? 'is-major' : ''}" style="--l:${(i / years * 100).toFixed(3)}%">${startYear + i}</span>`);
  }

  let previousGeneration = null;
  const rows = membersData.map((member, i) => {
    const from = ratio(member.joinDate);
    const to = member.graduateDate ? ratio(member.graduateDate) : (now.getTime() - start) / span;
    const first = member.generation !== previousGeneration;
    previousGeneration = member.generation;
    return `
      <button type="button" class="crow${first ? ' crow--first' : ''}${isActive(member) ? ' crow--active' : ''}" data-id="${member.id}" data-generation="${member.generation}"
        style="--c:${member.color};--l:${(from * 100).toFixed(3)}%;--w:${((to - from) * 100).toFixed(3)}%;--i:${i}"
        aria-label="${member.name}　${formatDate(member.joinDate)}から${member.graduateDate ? formatDate(member.graduateDate) : '現在'}まで">
        <span class="crow__name"><i class="crow__gen">${member.generation}期</i>${member.name}</span>
        <span class="crow__track"><span class="crow__bar"></span></span>
      </button>`;
  }).join('');

  inner.style.setProperty('--years', years);
  inner.style.setProperty('--now', ((now.getTime() - start) / span).toFixed(4));
  inner.innerHTML = `
    <div class="chart__axis">
      <div class="chart__corner">むかし</div>
      <div class="chart__years">${yearLabels.join('')}</div>
    </div>
    <div class="chart__rows">
      <div class="chart__now" aria-hidden="true"></div>
      ${rows}
    </div>`;

  $$('.crow', inner).forEach((row) => {
    row.addEventListener('click', () => {
      const member = membersData.find((item) => item.id === Number(row.dataset.id));
      visibleMembers = membersData;
      showMemberModal(member, row);
    });
  });
};

/**
 * 絞り込みに合わせて年表の行を強調する
 */
const updateChartHighlight = (matched) => {
  const chart = $('#chart');
  if (!chart) return;
  const ids = new Set(matched.map((member) => member.id));
  const filtered = matched.length !== membersData.length;
  chart.classList.toggle('has-dim', filtered);
  $$('.crow', chart).forEach((row) => row.classList.toggle('is-dim', filtered && !ids.has(Number(row.dataset.id))));
};

// ============================================
// メンバー一覧
// ============================================

/**
 * メンバー数を更新する
 */
const updateMembersCount = (count) => {
  const countEl = $('#membersCount');
  if (countEl) countEl.textContent = `— ${count} Members —`;
};

/**
 * メンバーカードを作成する
 */
const createMemberCard = (member, index) => {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'member-card';
  card.style.setProperty('--member-color', member.color);
  card.style.setProperty('--d', `${(index % 5) * 0.06}s`);

  const active = isActive(member);
  const romaji = NAME_TO_ROMAJI[member.name] || '';
  const dateRange = member.graduateDate
    ? `${formatDate(member.joinDate)}～${formatDate(member.graduateDate)}`
    : `${formatDate(member.joinDate)}～`;

  card.setAttribute('aria-label', `${member.name}の詳細を開く`);
  card.innerHTML = `
    <span class="member-card__top">
      <span class="member-pen" aria-hidden="true"></span>
      <span class="member-number">${pad2(member.generation)}</span>
    </span>
    <span class="member-name">${member.name}</span>
    <span class="member-name-en">${romaji ? `<b>${romaji}</b> / ` : ''}"${member.nickname}"</span>
    <span class="member-card__foot">
      <span class="member-dates">${dateRange}</span>
      <span class="member-status ${active ? 'active' : 'graduated'}">${active ? 'Active' : 'Graduated'}</span>
    </span>
  `;

  card.addEventListener('click', () => showMemberModal(member, card));
  return card;
};

/**
 * メンバー一覧を期ごとに表示する
 */
const renderMembers = (members) => {
  const grid = $('#membersGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!members.length) {
    grid.innerHTML = '<p class="members-empty">該当するメンバーはいません。</p>';
    updateMembersCount(0);
    return;
  }

  const groups = new Map();
  members.forEach((member) => {
    if (!groups.has(member.generation)) groups.set(member.generation, []);
    groups.get(member.generation).push(member);
  });

  groups.forEach((list, generation) => {
    const section = document.createElement('section');
    section.className = 'gen';
    section.innerHTML = `
      <header class="gen__head">
        <h3 class="gen__no">${pad2(generation)}<small>期</small></h3>
        <p class="gen__meta"><b>${formatDate(list[0].joinDate)}</b> 加入　<b>${list.length}</b>名</p>
        <p class="gen__dots" aria-hidden="true">${list.map((member) => `<i style="--c:${member.color}"></i>`).join('')}</p>
      </header>
      <div class="gen__grid"></div>
    `;
    const cards = $('.gen__grid', section);
    list.forEach((member, index) => {
      const card = createMemberCard(member, index);
      cards.appendChild(card);
      reveal(card);
    });
    grid.appendChild(section);
  });

  updateMembersCount(members.length);
};

/**
 * 絞り込みを反映する
 */
const applyFilters = () => {
  visibleMembers = membersData.filter((member) => {
    const generationOk = filterState.generation === 'all' || member.generation === Number(filterState.generation);
    const statusOk = filterState.status === 'all'
      || (filterState.status === 'active' ? isActive(member) : !isActive(member));
    return generationOk && statusOk;
  });
  renderMembers(visibleMembers);
  updateChartHighlight(visibleMembers);
};

// ============================================
// モーダル
// ============================================

const fillModal = (member) => {
  const modal = $('#memberModal');
  const modalBody = $('#modalBody');
  const active = isActive(member);
  const romaji = NAME_TO_ROMAJI[member.name] || '';
  const age = calculateAge(member.birthDate);

  $('.modal-content', modal).style.setProperty('--member-color', member.color);
  modalBody.style.setProperty('--member-color', member.color);
  modalBody.innerHTML = `
    <div class="modal-top">
      <span class="member-pen" aria-hidden="true"></span>
      <span class="modal-number">${pad2(member.generation)}<small>期</small></span>
    </div>
    <h2 class="modal-name">${member.name}</h2>
    <p class="modal-name-en">${romaji}</p>
    <div class="modal-badges">
      <span class="modal-generation">${member.generation}${getOrdinal(member.generation)} Generation</span>
      <span class="member-status ${active ? 'active' : 'graduated'}">${active ? 'Active' : 'Graduated'}</span>
      <span class="modal-tenure">在籍 ${formatTenure(member)}</span>
    </div>
    <div class="modal-details">
      <div class="modal-detail-item">
        <span class="modal-detail-label">Color</span>
        <span class="modal-detail-value">
          <span class="modal-color-indicator" style="background-color: ${member.color}"></span>
          ${member.colorName}
        </span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Nickname</span>
        <span class="modal-detail-value">${member.nickname}</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Birthday</span>
        <span class="modal-detail-value">${formatDate(member.birthDate)}（${age}歳）</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Birthplace</span>
        <span class="modal-detail-value">${member.birthplace}</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Blood Type</span>
        <span class="modal-detail-value">${member.bloodType}型</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Height</span>
        <span class="modal-detail-value">${member.height} cm</span>
      </div>
      <div class="modal-detail-item">
        <span class="modal-detail-label">Join</span>
        <span class="modal-detail-value">${formatDate(member.joinDate)}</span>
      </div>
      ${member.graduateDate ? `
      <div class="modal-detail-item">
        <span class="modal-detail-label">Graduate</span>
        <span class="modal-detail-value">${formatDate(member.graduateDate)}</span>
      </div>
      ` : ''}
    </div>
    <div class="modal-description">
      ${member.description}
    </div>
  `;

  modalBody.classList.remove('is-swapping');
  void modalBody.offsetWidth;
  modalBody.classList.add('is-swapping');
  $('.modal-content', modal).scrollTop = 0;
};

/**
 * モーダルを表示する
 */
const showMemberModal = (member, trigger = null) => {
  const modal = $('#memberModal');
  if (!modal || !member) return;
  clearTimeout(modalTimer);
  if (!visibleMembers.includes(member)) visibleMembers = membersData;
  modalIndex = visibleMembers.indexOf(member);
  modalTrigger = trigger;
  modal.hidden = false;
  fillModal(member);
  document.body.classList.add('is-locked');
  requestAnimationFrame(() => {
    modal.classList.add('active');
    $('#modalClose').focus({ preventScroll: true });
  });
};

/**
 * モーダルを閉じる
 */
const closeModal = () => {
  const modal = $('#memberModal');
  if (!modal || modal.hidden) return;
  modal.classList.remove('active');
  document.body.classList.remove('is-locked');
  modalTimer = setTimeout(() => { modal.hidden = true; }, 460);
  if (modalTrigger && document.contains(modalTrigger)) modalTrigger.focus({ preventScroll: true });
};

const stepModal = (direction) => {
  if (!visibleMembers.length) return;
  modalIndex = (modalIndex + direction + visibleMembers.length) % visibleMembers.length;
  fillModal(visibleMembers[modalIndex]);
};

// ============================================
// イベントハンドラー設定
// ============================================

/**
 * フィルターボタンのイベントを設定
 */
const setupFilters = () => {
  const generationButtons = $$('.filter-btn');
  generationButtons.forEach((button) => {
    button.addEventListener('click', () => {
      generationButtons.forEach((other) => {
        const active = other === button;
        other.classList.toggle('active', active);
        other.setAttribute('aria-pressed', String(active));
      });
      filterState.generation = button.dataset.generation;
      applyFilters();
    });
  });

  const statusButtons = $$('.status-btn');
  statusButtons.forEach((button) => {
    button.addEventListener('click', () => {
      statusButtons.forEach((other) => {
        const active = other === button;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', String(active));
      });
      filterState.status = button.dataset.status;
      applyFilters();
    });
  });
};

/**
 * モーダルのイベントを設定
 */
const setupModal = () => {
  const modal = $('#memberModal');
  const modalClose = $('#modalClose');
  if (!modalClose || !modal) return;

  modalClose.addEventListener('click', closeModal);
  $('.modal-overlay', modal).addEventListener('click', closeModal);
  $('#modalPrev').addEventListener('click', () => stepModal(-1));
  $('#modalNext').addEventListener('click', () => stepModal(1));

  // キーボード操作（ESCで閉じる、左右で前後のメンバーへ）
  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') stepModal(-1);
    if (event.key === 'ArrowRight') stepModal(1);
  });
};

/**
 * フッターにメンバーカラーの灯りを並べる
 */
const renderFooterDeco = () => {
  const deco = $('#footerDeco');
  if (!deco) return;
  deco.innerHTML = membersData
    .map((member, i) => `<i style="--c:${member.color};--dur:${(1.1 + (i % 7) * 0.2).toFixed(1)}s;--delay:-${(i % 5) * 0.3}s"></i>`)
    .join('');
};

// ============================================
// 初期化
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  setupTypography();
  $$('.rv').forEach(reveal);
  setupFilters();
  setupModal();
  loadMembersData();

  // フォントが揃ってから幕を開ける
  const open = () => document.body.classList.add('is-ready');
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  fontsReady.then(() => setTimeout(open, 150));
  setTimeout(open, 1800);
});
