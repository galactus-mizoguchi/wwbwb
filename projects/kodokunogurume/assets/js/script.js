/**
 * 孤独のグルメ 伝票帳 - メインスクリプト
 * データ: assets/data/episodes.json（一話 = 一枚の伝票）
 */
(() => {
  'use strict';

  const DATA_PATH = 'assets/data/episodes.json';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const SERIES_SHORT = {
    s1: 'S1', s2: 'S2', s3: 'S3', s4: 'S4', s5: 'S5', s6: 'S6', s7: 'S7', s8: 'S8', s9: 'S9', s10: 'S10', s11: 'S11',
    sp: 'SP', web: '配信', sorezore: 'それぞれ', movie: '劇映画',
  };
  const MAP_VIEWS = {
    tokyo: [[35.57, 139.56], [35.80, 139.92]],
    kanto: [[34.95, 138.85], [36.45, 140.75]],
    japan: [[26.0, 127.5], [45.0, 145.5]],
  };

  const state = { series: 'all', genre: 'all', pref: 'all', openOnly: false, q: '' };
  let DATA = null;
  let GENRE_NAME = {};
  let map = null;
  let markerLayer = null;
  const markerByKey = new Map();

  // ------------------------------------------------------------------
  // helpers
  // ------------------------------------------------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const mains = (e) => e.shops.filter((s) => s.role === 'main');
  const sides = (e) => e.shops.filter((s) => s.role === 'side');
  const placeOf = (s) => s.pref || s.country;
  const geoKey = (s) => `${s.lat.toFixed(3)},${s.lng.toFixed(3)}`;
  const fmtDate = (d) => d.replace(/-/g, '.');

  function epLabel(e) {
    if (e.series === 'movie') return '劇場版';
    if (e.kind === 'special') return 'スペシャル';
    if (e.series === 'web') return `#${e.no}`;
    return `第${e.no}話`;
  }
  function headline(e) {
    if (e.series === 'movie') return e.title;
    return e.food || e.title;
  }

  // ------------------------------------------------------------------
  // filters
  // ------------------------------------------------------------------
  function haystack(e) {
    if (!e._hay) {
      e._hay = [e.title, e.food, GENRE_NAME[e.genre], ...e.shops.flatMap((s) => [s.name, s.area, s.pref, s.country, s.muni, ...s.dishes])]
        .join(' ').toLowerCase();
    }
    return e._hay;
  }
  // 「スペシャル」タブは各シーズン内の大晦日SP・特別編もまとめて表示する
  const inSeries = (e, id) => (id === 'sp' ? e.kind === 'special' && e.series !== 'movie' : e.series === id);

  function matches(e, { ignoreSeries = false } = {}) {
    if (!ignoreSeries && state.series !== 'all' && !inSeries(e, state.series)) return false;
    if (state.genre !== 'all' && e.genre !== state.genre) return false;
    if (state.pref !== 'all' && !e.shops.some((s) => placeOf(s) === state.pref)) return false;
    if (state.openOnly && !mains(e).some((s) => s.status === 'open')) return false;
    if (state.q) {
      const words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      const h = haystack(e);
      if (!words.every((w) => h.includes(w))) return false;
    }
    return true;
  }

  // ------------------------------------------------------------------
  // stats
  // ------------------------------------------------------------------
  function computeStats(eps) {
    const all = eps.flatMap((e) => e.shops);
    const uniq = new Map();
    all.forEach((s) => uniq.set(`${s.name}|${s.muni}`, s));
    const shops = [...uniq.values()];
    return {
      episodes: eps.length,
      shops: shops.length,
      dishes: all.reduce((n, s) => n + s.dishes.length, 0),
      prefs: new Set(all.map((s) => s.pref).filter(Boolean)).size,
      countries: new Set(all.map((s) => s.country).filter((c) => c !== '日本')).size,
      closed: shops.filter((s) => s.status !== 'open').length,
    };
  }

  function renderStats() {
    const st = computeStats(DATA.episodes);
    $$('[data-stat]').forEach((el) => { el.textContent = st[el.dataset.stat].toLocaleString(); });
  }

  // ------------------------------------------------------------------
  // ledger (slips)
  // ------------------------------------------------------------------
  function dishList(dishes, limit) {
    const head = dishes.slice(0, limit);
    const rest = dishes.slice(limit);
    const li = (d) => `<li>${esc(d)}</li>`;
    let html = `<ol class="slip__dishes">${head.map(li).join('')}</ol>`;
    if (rest.length) {
      html += `<details class="slip__more"><summary>ほか ${rest.length} 品を見る</summary><ol class="slip__dishes">${rest.map(li).join('')}</ol></details>`;
    }
    return html;
  }

  function hanko(s) {
    if (s.status === 'closed') return '<span class="hanko" title="閉店">閉店</span>';
    if (s.status === 'moved') return '<span class="hanko hanko--moved" title="移転">移転</span>';
    return '';
  }

  function shopNote(s) {
    const notes = [];
    if (s.note && !['閉店'].includes(s.note)) notes.push(s.note);
    return notes.length ? `<span class="slip__shopnote">${esc(notes.join('・'))}</span>` : '';
  }

  function slipHTML(e, idx) {
    const m = mains(e);
    const sd = sides(e);
    const multi = m.length > 1;
    const limit = multi ? 3 : 6;
    const title = headline(e);
    const allClosed = m.length && m.every((s) => s.status !== 'open');

    const blocks = m.map((s, i) => {
      const showPlace = multi || i === 0;
      return `
        ${showPlace ? `<p class="slip__place"><em>${esc(placeOf(s))}</em>${esc(s.area)}</p>` : ''}
        ${s.dishes.length ? `<div class="slip__table"><p class="slip__th"><span>品名</span><span>数量</span></p>${dishList(s.dishes, limit)}</div>` : ''}
        <div class="slip__shop">
          <p class="slip__shopname">${esc(s.name)}${shopNote(s)}</p>
          ${hanko(s)}
        </div>`;
    });

    const sideHTML = sd.length
      ? `<p class="slip__side"><b>寄り道</b>${sd.map((s) => `${esc(s.name)}${s.dishes.length ? `（${esc(s.dishes.slice(0, 2).join('・'))}）` : ''}${s.status !== 'open' ? '［閉店］' : ''}`).join('、')}</p>`
      : '';

    const sub = e.series === 'web' ? '<p class="slip__place">配信オリジナル</p>' : '';
    const target = m[0] || e.shops[0];

    return `
      <article class="slip${allClosed ? ' is-closed-all' : ''}" id="slip-${esc(e.id)}">
        <header class="slip__head">
          <span class="slip__kind">御会計</span>
          <span class="slip__series">${esc(SERIES_SHORT[e.series])} ${esc(epLabel(e))}</span>
          <time class="slip__date" datetime="${esc(e.date)}">${esc(fmtDate(e.date))}</time>
        </header>
        ${sub}
        <h3 class="slip__food${title.length > 26 ? ' slip__food--long' : ''}">${esc(title)}</h3>
        ${blocks.join('')}
        ${sideHTML}
        <footer class="slip__foot">
          <span class="slip__no">No.${String(idx + 1).padStart(4, '0')}</span>
          <span class="slip__genre">${esc(GENRE_NAME[e.genre] || '')}</span>
          <button type="button" class="slip__mapbtn" data-goto="${esc(geoKey(target))}">地図で見る</button>
        </footer>
      </article>`;
  }

  function renderLedger() {
    const list = DATA.episodes.filter((e) => matches(e));
    const order = new Map(DATA.episodes.map((e, i) => [e.id, i]));
    $('#slips').innerHTML = list.map((e) => slipHTML(e, order.get(e.id))).join('');
    $('#resultCount').textContent = list.length;
    $('#empty').hidden = list.length > 0;
    renderGenreChips();
  }

  function renderTabs() {
    const counts = {};
    DATA.series.forEach((s) => { counts[s.id] = DATA.episodes.filter((e) => inSeries(e, s.id)).length; });
    const tabs = [{ id: 'all', name: 'すべて', year: `${DATA.episodes.length}枚` }, ...DATA.series.map((s) => ({ ...s, year: `${s.year}・${counts[s.id] || 0}枚` }))];
    $('#seriesTabs').innerHTML = tabs.map((t) => `
      <button type="button" class="tab" role="tab" data-series="${esc(t.id)}" aria-selected="${t.id === state.series}">
        ${esc(t.name)}<small>${esc(t.year)}</small>
      </button>`).join('');
    $('#seriesTabs').addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-series]');
      if (!b) return;
      state.series = b.dataset.series;
      $$('#seriesTabs .tab').forEach((t) => t.setAttribute('aria-selected', String(t === b)));
      renderLedger();
    });
  }

  function renderGenreChips() {
    const base = DATA.episodes.filter((e) => {
      const g = state.genre; state.genre = 'all';
      const ok = matches(e);
      state.genre = g;
      return ok;
    });
    const counts = {};
    base.forEach((e) => { counts[e.genre] = (counts[e.genre] || 0) + 1; });
    const chips = [{ id: 'all', name: 'すべて', n: base.length }, ...DATA.genres.map((g) => ({ ...g, n: counts[g.id] || 0 }))];
    $('#genreChips').innerHTML = chips.map((c) => `
      <button type="button" class="chip" data-genre="${esc(c.id)}" aria-pressed="${c.id === state.genre}">${esc(c.name)}<b>${c.n}</b></button>`).join('');
  }

  function bindFilters() {
    $('#genreChips').addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-genre]');
      if (!b) return;
      state.genre = b.dataset.genre;
      renderLedger();
    });

    const prefs = {};
    DATA.episodes.forEach((e) => new Set(e.shops.map(placeOf)).forEach((p) => { prefs[p] = (prefs[p] || 0) + 1; }));
    const domestic = Object.keys(prefs).filter((p) => /[都道府県]$/.test(p)).sort((a, b) => prefs[b] - prefs[a]);
    const abroad = Object.keys(prefs).filter((p) => !/[都道府県]$/.test(p));
    $('#pref').insertAdjacentHTML('beforeend',
      `<optgroup label="国内">${domestic.map((p) => `<option value="${esc(p)}">${esc(p)}（${prefs[p]}）</option>`).join('')}</optgroup>` +
      `<optgroup label="海外">${abroad.map((p) => `<option value="${esc(p)}">${esc(p)}（${prefs[p]}）</option>`).join('')}</optgroup>`);
    $('#pref').addEventListener('change', (ev) => { state.pref = ev.target.value; renderLedger(); });
    $('#openOnly').addEventListener('change', (ev) => { state.openOnly = ev.target.checked; renderLedger(); });

    let t = 0;
    $('#q').addEventListener('input', (ev) => {
      clearTimeout(t);
      t = setTimeout(() => { state.q = ev.target.value.trim(); renderLedger(); }, 160);
    });

    $('#slips').addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-goto]');
      if (b) focusOnMap(b.dataset.goto);
    });
  }

  // ------------------------------------------------------------------
  // map
  // ------------------------------------------------------------------
  function groupShops(seriesId) {
    const groups = new Map();
    DATA.episodes.forEach((e) => {
      if (seriesId !== 'all' && !inSeries(e, seriesId)) return;
      e.shops.forEach((s) => {
        const k = geoKey(s);
        if (!groups.has(k)) groups.set(k, { key: k, lat: s.lat, lng: s.lng, items: [] });
        groups.get(k).items.push({ e, s });
      });
    });
    return [...groups.values()];
  }

  function popupHTML(g) {
    const first = g.items[0].s;
    const area = `${placeOf(first)} ${first.area}`;
    const items = g.items
      .slice()
      .sort((a, b) => (a.e.date < b.e.date ? -1 : 1))
      .map(({ e, s }) => `
        <li class="pop__item">
          <p class="pop__shop${s.status !== 'open' ? ' is-closed' : ''}">${esc(s.name)}${s.status === 'closed' ? '（閉店）' : s.status === 'moved' ? '（移転）' : ''}</p>
          <p class="pop__ep"><b>${esc(SERIES_SHORT[e.series])} ${esc(epLabel(e))}</b>${esc(headline(e))}${s.role === 'side' ? '（寄り道）' : ''}</p>
          <button type="button" class="pop__link" data-slip="${esc(e.id)}">伝票を見る</button>
        </li>`).join('');
    return `<p class="pop__area">${esc(area)}</p><ul class="pop__list">${items}</ul>`;
  }

  function iconFor(g) {
    const n = g.items.length;
    const closed = g.items.every(({ s }) => s.status !== 'open');
    const size = n > 1 ? 22 : 12;
    const cls = closed ? 'pin pin--closed' : 'pin';
    return L.divIcon({
      className: '',
      html: `<span class="${cls}">${n > 1 ? n : ''}</span>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
    });
  }

  function drawMarkers(seriesId) {
    markerLayer.clearLayers();
    markerByKey.clear();
    groupShops(seriesId).forEach((g) => {
      const mk = L.marker([g.lat, g.lng], { icon: iconFor(g), riseOnHover: true, keyboard: true, title: g.items[0].s.area })
        .bindPopup(() => popupHTML(g), { maxWidth: 300, autoPanPadding: [24, 72] });
      mk.addTo(markerLayer);
      markerByKey.set(g.key, mk);
    });
  }

  function setView(view) {
    $$('.seg__btn').forEach((b) => b.classList.toggle('is-active', b.dataset.view === view));
    if (view === 'world') {
      const pts = DATA.episodes.flatMap((e) => e.shops).filter((s) => s.country !== '日本').map((s) => [s.lat, s.lng]);
      pts.push([35.68, 139.76]);
      map.flyToBounds(pts, { padding: [40, 40], duration: reducedMotion ? 0 : 1.1 });
    } else {
      map.flyToBounds(MAP_VIEWS[view], { duration: reducedMotion ? 0 : 1.1 });
    }
  }

  function initMap() {
    if (typeof L === 'undefined') {
      $('#leaflet').innerHTML = '<p style="padding:24px;color:var(--cream-45)">地図を読み込めませんでした。</p>';
      return;
    }
    map = L.map('leaflet', { scrollWheelZoom: false, zoomSnap: 0.25, worldCopyJump: true, minZoom: 2 });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.fitBounds(MAP_VIEWS.tokyo);
    markerLayer = L.layerGroup().addTo(map);

    // ページのスクロールを奪わない：地図をクリックしたらホイールで拡大縮小
    map.on('click focus', () => map.scrollWheelZoom.enable());
    map.getContainer().addEventListener('mouseleave', () => map.scrollWheelZoom.disable());

    const sel = $('#mapSeries');
    sel.insertAdjacentHTML('beforeend', DATA.series.map((s) => `<option value="${esc(s.id)}">${esc(s.name)}</option>`).join(''));
    sel.addEventListener('change', () => drawMarkers(sel.value));
    drawMarkers('all');

    $$('.seg__btn').forEach((b) => b.addEventListener('click', () => setView(b.dataset.view)));

    map.getContainer().addEventListener('click', (ev) => {
      const b = ev.target.closest('[data-slip]');
      if (b) showSlip(b.dataset.slip);
    });
  }

  function focusOnMap(key) {
    if (!map) return;
    if ($('#mapSeries').value !== 'all') { $('#mapSeries').value = 'all'; drawMarkers('all'); }
    const mk = markerByKey.get(key);
    if (!mk) return;
    $('#map').scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    $$('.seg__btn').forEach((b) => b.classList.remove('is-active'));
    setTimeout(() => {
      map.flyTo(mk.getLatLng(), 15, { duration: reducedMotion ? 0 : 1.2 });
      map.once('moveend', () => {
        mk.openPopup();
        const pin = mk.getElement()?.querySelector('.pin');
        if (pin) { pin.classList.remove('is-hot'); void pin.offsetWidth; pin.classList.add('is-hot'); }
      });
    }, reducedMotion ? 0 : 450);
  }

  function showSlip(id) {
    let el = document.getElementById(`slip-${id}`);
    if (!el) {
      Object.assign(state, { series: 'all', genre: 'all', pref: 'all', openOnly: false, q: '' });
      $('#q').value = ''; $('#pref').value = 'all'; $('#openOnly').checked = false;
      $$('#seriesTabs .tab').forEach((t) => t.setAttribute('aria-selected', String(t.dataset.series === 'all')));
      renderLedger();
      el = document.getElementById(`slip-${id}`);
    }
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
    // 目印に、少しのあいだ枠線を付ける
    el.style.outline = '3px solid var(--lamp)';
    el.style.outlineOffset = '4px';
    setTimeout(() => { el.style.outline = ''; el.style.outlineOffset = ''; }, 2400);
  }

  // ------------------------------------------------------------------
  // towns
  // ------------------------------------------------------------------
  function renderTowns() {
    const towns = new Map();
    const prefs = new Map();
    const genres = new Map();
    DATA.episodes.forEach((e) => {
      const seenT = new Set();
      const seenP = new Set();
      mains(e).forEach((s) => {
        const tk = `${placeOf(s)}|${s.muni}`;
        if (!seenT.has(tk)) { seenT.add(tk); towns.set(tk, (towns.get(tk) || 0) + 1); }
        const p = placeOf(s);
        if (!seenP.has(p)) { seenP.add(p); prefs.set(p, (prefs.get(p) || 0) + 1); }
      });
      genres.set(e.genre, (genres.get(e.genre) || 0) + 1);
    });

    const top = [...towns.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15);
    const max = top[0][1];
    $('#townRank').innerHTML = top.map(([k, n]) => {
      const [p, m] = k.split('|');
      return `<li><p class="rank__name">${esc(m)}<small>${esc(p)}</small></p>
        <span class="rank__bar"><i style="width:${(n / max) * 100}%"></i></span>
        <span class="rank__num">${n}<i>回</i></span></li>`;
    }).join('');

    $('#prefRank').innerHTML = [...prefs.entries()].sort((a, b) => b[1] - a[1])
      .map(([p, n]) => `<li class="${/[都道府県]$/.test(p) ? '' : 'is-abroad'}">${esc(p)}<b>${n}</b></li>`).join('');

    const gmax = Math.max(...genres.values());
    $('#genreRank').innerHTML = DATA.genres.map((g) => ({ ...g, n: genres.get(g.id) || 0 })).sort((a, b) => b.n - a.n)
      .map((g) => `<li><span>${esc(g.name)}</span><span class="rank__bar"><i style="width:${(g.n / gmax) * 100}%"></i></span><b>${g.n}</b></li>`).join('');
  }

  // ------------------------------------------------------------------
  // chrome: bar + reveal
  // ------------------------------------------------------------------
  function initChrome() {
    const bar = $('#bar');
    const hero = $('.hero');
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => bar.classList.toggle('is-shown', !en.isIntersecting), { rootMargin: '-60px 0px 0px' }).observe(hero);
    } else {
      bar.classList.add('is-shown');
    }
  }

  // ------------------------------------------------------------------
  // boot
  // ------------------------------------------------------------------
  async function init() {
    try {
      const res = await fetch(DATA_PATH);
      DATA = await res.json();
    } catch (err) {
      $('#slips').innerHTML = '<p class="ledger__empty">伝票帳を読み込めませんでした。</p>';
      return;
    }
    GENRE_NAME = Object.fromEntries(DATA.genres.map((g) => [g.id, g.name]));
    renderStats();
    renderTabs();
    bindFilters();
    renderLedger();
    renderTowns();
    initMap();
    initChrome();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
