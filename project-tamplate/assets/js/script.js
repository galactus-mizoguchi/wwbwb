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

const STORAGE_KEY = 'our_22_shrines_progress';

function loadProgress() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveProgress(visitedIds) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(visitedIds));
  updateStats();
}

function updateStats() {
  const visited = loadProgress();
  const countSpan = document.getElementById('visited-count');
  const totalSpan = document.getElementById('total-count');
  const percentSpan = document.getElementById('percent');

  const total = shrinesData.length;
  const current = visited.length;

  if (countSpan) countSpan.textContent = current;
  if (totalSpan) totalSpan.textContent = total;
  if (percentSpan) percentSpan.textContent = Math.round((current / total) * 100);
}

function toggleVisit(id) {
  let visited = loadProgress();
  if (visited.includes(id)) {
    visited = visited.filter(v => v !== id);
  } else {
    visited.push(id);
  }
  saveProgress(visited);
  render();
}

function createCard(shrine, isVisited) {
  const div = document.createElement('div');
  div.className = `shrine-card ${isVisited ? 'visited' : ''}`;
  div.onclick = (e) => {
    // Prevent toggling when clicking the map button or website button
    if (e.target.closest('.map-button') || e.target.closest('.website-button')) return;
    toggleVisit(shrine.id);
  };

  let websiteButtonHtml = '';
  if (shrine.website) {
    websiteButtonHtml = `
      <a href="${shrine.website}" target="_blank" class="website-button" title="公式サイト">
        WEB
      </a>
    `;
  }

  div.innerHTML = `
    <div class="shrine-crest" style="background-image: url('assets/img/crests/${shrine.crest}.png')"></div>
    <div class="shrine-content">
      <div class="shrine-header">
        <span class="province-label">${shrine.province}</span>
        <span class="classification-label">${shrine.classification}</span>
      </div>
      <h3 class="shrine-name">${shrine.name}</h3>
      
      <div class="kami-section">
        <div class="kami-label">御祭神</div>
        <div class="kami-name">${shrine.kami}</div>
      </div>
      
      <div class="shrine-footer">
        <div class="shrine-address">${shrine.address}</div>
        <div class="shrine-actions">
          ${websiteButtonHtml}
          <a href="${shrine.mapLink}" target="_blank" class="map-button" title="Google Mapsで開く">
            MAP
          </a>
        </div>
      </div>
    </div>
  `;
  return div;
}

function render() {
  const visited = loadProgress();

  const containers = {
    upper: document.getElementById('upper-list'),
    middle: document.getElementById('middle-list'),
    lower: document.getElementById('lower-list')
  };

  // Clear current content
  for (const key in containers) {
    if (containers[key]) containers[key].innerHTML = '';
  }

  shrinesData.forEach(shrine => {
    const isVisited = visited.includes(shrine.id);
    const card = createCard(shrine, isVisited);
    if (containers[shrine.rank]) {
      containers[shrine.rank].appendChild(card);
    }
  });

  updateStats();
}

document.addEventListener('DOMContentLoaded', () => {
  render();
});
