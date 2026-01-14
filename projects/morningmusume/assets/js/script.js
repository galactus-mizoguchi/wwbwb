/**
 * モーニング娘。いまむかし - メインスクリプト
 */

// ============================================
// 定数・設定
// ============================================

const DATA_PATH = 'assets/data/members.json';

// 名前をローマ字に変換するマッピング
const NAME_TO_ROMAJI = {
  '中澤裕子': 'Yuko Nakazawa',
  '福田明日香': 'Asuka Fukuda',
  '石黒彩': 'Aya Ishiguro',
  '飯田香織': 'Kaori Iida',
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
// グローバル変数
// ============================================

let membersData = [];

// ============================================
// ユーティリティ関数
// ============================================

/**
 * 日付をフォーマットする (YYYY.MM.DD)
 * @param {string} dateString - ISO形式の日付文字列
 * @returns {string} フォーマットされた日付
 */
function formatDate(dateString) {
  if (!dateString) return '—';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

/**
 * 年齢を計算する
 * @param {string} birthDateString - ISO形式の生年月日文字列
 * @returns {number|null} 年齢
 */
function calculateAge(birthDateString) {
  if (!birthDateString) return null;
  const today = new Date();
  const birthDate = new Date(birthDateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

/**
 * 序数を取得する (1st, 2nd, 3rd, 4th...)
 * @param {number} n - 数値
 * @returns {string} 序数
 */
function getOrdinal(n) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}

// ============================================
// データ読み込み
// ============================================

/**
 * メンバーデータを読み込む
 */
async function loadMembersData() {
  try {
    const response = await fetch(DATA_PATH);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    membersData = data.members || [];
    renderMembers(membersData);
    updateMembersCount(membersData.length);
  } catch (error) {
    console.error('メンバーデータの読み込みに失敗しました:', error);
    const grid = document.getElementById('membersGrid');
    if (grid) {
      grid.innerHTML = '<p style="text-align: center; color: var(--text-light);">データの読み込みに失敗しました。</p>';
    }
  }
}

// ============================================
// UI更新関数
// ============================================

/**
 * メンバー数を更新する
 * @param {number} count - メンバー数
 */
function updateMembersCount(count) {
  const countEl = document.getElementById('membersCount');
  if (countEl) {
    countEl.textContent = `— ${count} Members —`;
  }
}

/**
 * メンバー一覧を表示する
 * @param {Array} members - メンバー配列
 */
function renderMembers(members) {
  const grid = document.getElementById('membersGrid');
  if (!grid) return;

  grid.innerHTML = '';
  members.forEach((member) => {
    const card = createMemberCard(member);
    grid.appendChild(card);
  });

  updateMembersCount(members.length);
}

/**
 * メンバーカードを作成する
 * @param {Object} member - メンバーオブジェクト
 * @returns {HTMLElement} カード要素
 */
function createMemberCard(member) {
  const card = document.createElement('article');
  card.className = 'member-card';
  card.style.setProperty('--member-color', member.color);
  
  const isActive = member.graduateDate === null;
  const statusClass = isActive ? 'active' : 'graduated';
  const statusText = isActive ? 'Active' : 'Graduated';
  const genNumber = String(member.generation).padStart(2, '0');
  const romaji = NAME_TO_ROMAJI[member.name] || '';

  const dateRange = member.graduateDate 
    ? `${formatDate(member.joinDate)}～${formatDate(member.graduateDate)}`
    : `${formatDate(member.joinDate)}～`;

  card.innerHTML = `
    <span class="member-number">${genNumber}</span>
    <h2 class="member-name">${member.name}</h2>
    <div class="member-name-border" style="border-color: ${member.color}"></div>
    <p class="member-name-en">${romaji} / "${member.nickname}"</p>
    <div class="member-dates">
      <span>${dateRange}</span>
    </div>
    <span class="member-status ${statusClass}">${statusText}</span>
  `;

  card.addEventListener('click', () => showMemberModal(member));
  return card;
}

/**
 * モーダルを表示する
 * @param {Object} member - メンバーオブジェクト
 */
function showMemberModal(member) {
  const modal = document.getElementById('memberModal');
  const modalBody = document.getElementById('modalBody');
  if (!modal || !modalBody) return;
  
  const isActive = member.graduateDate === null;
  const statusClass = isActive ? 'active' : 'graduated';
  const statusText = isActive ? 'Active' : 'Graduated';
  const genNumber = String(member.generation).padStart(2, '0');
  const romaji = NAME_TO_ROMAJI[member.name] || '';
  const age = calculateAge(member.birthDate);
  const ordinal = getOrdinal(member.generation);

  modalBody.innerHTML = `
    <span class="modal-number">${genNumber}</span>
    <h2 class="modal-name">${member.name}</h2>
    <p class="modal-name-en">${romaji}</p>
    <div class="modal-badges">
      <span class="modal-generation">${member.generation}${ordinal} Generation</span>
      <span class="member-status ${statusClass}">${statusText}</span>
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

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * モーダルを閉じる
 */
function closeModal() {
  const modal = document.getElementById('memberModal');
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// ============================================
// イベントハンドラー設定
// ============================================

/**
 * フィルターボタンのイベントを設定
 */
function setupFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // アクティブ状態を更新
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // フィルターを適用
      const generation = button.dataset.generation;
      if (generation === 'all') {
        renderMembers(membersData);
      } else {
        const filtered = membersData.filter(member => 
          member.generation === parseInt(generation)
        );
        renderMembers(filtered);
      }
    });
  });
}

/**
 * モーダルのイベントを設定
 */
function setupModal() {
  const modalClose = document.getElementById('modalClose');
  const modal = document.getElementById('memberModal');
  
  if (!modalClose || !modal) return;

  modalClose.addEventListener('click', closeModal);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  });

  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ============================================
// 初期化
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  loadMembersData();
  setupFilters();
  setupModal();
});
