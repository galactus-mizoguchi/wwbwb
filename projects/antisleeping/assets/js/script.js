/* 不眠運動 -ANTI SLEEPING- */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var body = doc.body;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  /* ---------- 文字分割 ---------- */
  function splitChars(el, cls) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = doc.createDocumentFragment();
          Array.from(child.textContent).forEach(function (c) {
            if (!c.trim()) { frag.appendChild(doc.createTextNode(c)); return; }
            var s = doc.createElement('span');
            s.className = cls;
            s.style.setProperty('--i', i++);
            s.textContent = c;
            frag.appendChild(s);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== 'BR') {
          walk(child);
        }
      });
    })(el);
  }

  $$('[data-split]').forEach(function (el) {
    el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ''));
    splitChars(el, 'ch');
    $$('.ch', el).forEach(function (c) { c.setAttribute('aria-hidden', 'true'); });
  });
  $$('.hero__line').forEach(function (el) { splitChars(el, 'hch'); });
  $$('.hch').forEach(function (c, i) {
    c.style.setProperty('--i', i);
    if (c.textContent === '眠') c.classList.add('hch--sleep');
  });

  /* ---------- スクロールリビール ---------- */
  var targets = $$('.rv, [data-split]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('is-in'); });
  }

  /* ---------- 時計と覚醒記録 ---------- */
  var clockEl = $('[data-clock]');
  var msgEl = $('[data-clock-msg]');
  var awakeEls = $$('[data-awake]');
  var t0 = Date.now();

  function clockMsg(h) {
    if (h < 5) return '深夜の覚醒、実に結構。その調子です。';
    if (h < 9) return '眠らずに迎える朝は格別です。';
    if (h < 17) return '日中の覚醒は当然の義務です。';
    if (h < 23) return '夜はこれから。本番です。';
    return 'まもなく正念場。寝るな。';
  }
  function tick() {
    var now = new Date();
    if (clockEl) clockEl.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
    if (msgEl) msgEl.textContent = clockMsg(now.getHours());
    var s = Math.floor((Date.now() - t0) / 1000);
    var str = pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60);
    awakeEls.forEach(function (el) { el.textContent = str; });
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- まぶた：開眼と居眠り検知 ---------- */
  var lids = $('.lids');
  var ry = 0;
  var lidRaf = 0;
  var openRy = function () { return window.innerHeight * 1.35; };
  var easeOutExpo = function (p) { return p === 1 ? 1 : 1 - Math.pow(2, -10 * p); };
  var easeInOut = function (p) { return p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; };
  var easeIn = function (p) { return p * p; };

  function setRy(v) {
    ry = v;
    lids.style.setProperty('--ry', Math.max(v, 0.01).toFixed(2) + 'px');
  }
  function tween(to, dur, ease, done) {
    cancelAnimationFrame(lidRaf);
    var from = ry, start = performance.now();
    lids.classList.remove('is-open');
    (function step(now) {
      var p = Math.min(Math.max((now - start) / dur, 0), 1);
      setRy(from + (to - from) * ease(p));
      if (p < 1) lidRaf = requestAnimationFrame(step);
      else if (done) done();
    })(start);
  }
  function fullyOpen() {
    cancelAnimationFrame(lidRaf);
    setRy(openRy());
    lids.classList.add('is-open');
  }
  function awaken() {
    if (body.classList.contains('is-awake')) return;
    body.classList.add('is-awake');
  }

  if (reduced || !lids) {
    awaken();
  } else {
    var h = window.innerHeight;
    var started = false;
    var startOpen = function () {
      if (started) return;
      started = true;
      // ぱち、ぱち、と瞬いてから見開く
      tween(h * 0.13, 420, easeInOut, function () {
        tween(h * 0.025, 240, easeInOut, function () {
          awaken();
          tween(openRy(), 1300, easeOutExpo, fullyOpen);
        });
      });
    };
    var fontsReady = (doc.fonts && doc.fonts.ready) ? doc.fonts.ready : Promise.resolve();
    fontsReady.then(function () { setTimeout(startOpen, 250); });
    setTimeout(startOpen, 1600);
    // rAFが止まっている環境（背面タブ等）でも必ず開く
    setTimeout(function () { if (!lids.classList.contains('is-open') && !dozing) { awaken(); fullyOpen(); } }, 4200);
  }

  var IDLE_MS = 25000;
  var CLOSE_MS = 9000;
  var idleTimer = 0;
  var dozing = false;
  var dozeCount = 0;
  var dozeEl = $('[data-doze]');
  var slapTimer = 0;

  function startDoze() {
    if (reduced || doc.hidden || !lids) return;
    dozing = true;
    setRy(window.innerHeight * 0.74);
    tween(0, CLOSE_MS, easeIn);
    body.classList.add('is-dozing');
  }
  function resetIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(startDoze, IDLE_MS);
  }
  function onActivity() {
    if (dozing) {
      dozing = false;
      body.classList.remove('is-dozing');
      dozeCount++;
      if (dozeEl) {
        dozeEl.textContent = dozeCount;
        dozeEl.parentNode.classList.add('is-bump');
      }
      body.classList.remove('is-slapped');
      void body.offsetWidth;
      body.classList.add('is-slapped');
      clearTimeout(slapTimer);
      slapTimer = setTimeout(function () { body.classList.remove('is-slapped'); }, 950);
      tween(openRy(), 260, easeOutExpo, fullyOpen);
    }
    resetIdle();
  }
  if (!reduced && lids) {
    ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'].forEach(function (ev) {
      window.addEventListener(ev, onActivity, { passive: true });
    });
    resetIdle();
  }

  var title = doc.title;
  doc.addEventListener('visibilitychange', function () {
    doc.title = doc.hidden ? '……寝たのですか？ | 不眠運動' : title;
    if (!doc.hidden) resetIdle();
  });

  /* ---------- 眼球の追従 ---------- */
  var eye = $('.eye');
  var logoEye = $('.logo__eye');
  function lookAt(x, y) {
    if (eye) {
      var r = eye.getBoundingClientRect();
      var dx = (x - (r.left + r.width / 2)) / window.innerWidth;
      var dy = (y - (r.top + r.height / 2)) / window.innerHeight;
      eye.style.setProperty('--ix', (Math.max(-1, Math.min(1, dx * 2.2)) * 62).toFixed(1) + 'px');
      eye.style.setProperty('--iy', (Math.max(-1, Math.min(1, dy * 2.2)) * 26).toFixed(1) + 'px');
    }
    if (logoEye) {
      var l = logoEye.getBoundingClientRect();
      var lx = (x - (l.left + l.width / 2)) / window.innerWidth;
      var ly = (y - (l.top + l.height / 2)) / window.innerHeight;
      logoEye.style.setProperty('--lx', (Math.max(-1, Math.min(1, lx * 2)) * 7).toFixed(1) + 'px');
      logoEye.style.setProperty('--ly', (Math.max(-1, Math.min(1, ly * 2)) * 2.5).toFixed(1) + 'px');
    }
  }
  window.addEventListener('pointermove', function (e) { lookAt(e.clientX, e.clientY); }, { passive: true });

  /* ---------- スクロール連動 ---------- */
  var header = $('.site-header');
  var bar = $('.progress i');
  var heroImg = $('.hero__bg img');
  var hero = $('.hero');
  var navLinks = $$('.nav a');
  var sections = navLinks.map(function (a) { return $(a.getAttribute('href')); });
  var ticking = false;

  function onScroll() {
    ticking = false;
    var y = window.pageYOffset;
    var max = root.scrollHeight - window.innerHeight;
    if (bar) bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (!reduced && hero && y < hero.offsetHeight) {
      if (heroImg) heroImg.style.setProperty('--py', (y * 0.22).toFixed(1) + 'px');
      if (eye) eye.style.setProperty('--ey', (y * -0.12).toFixed(1) + 'px');
    }
    // タッチ端末では眼が画面中央を見下ろす
    if (!finePointer && eye) lookAt(window.innerWidth / 2, window.innerHeight * (0.5 + Math.min(y / 400, 1) * 0.5));
    var current = -1;
    sections.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < window.innerHeight * 0.45) current = i; });
    navLinks.forEach(function (a, i) { a.classList.toggle('is-current', i === current); });
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- 睡眠被害算定器 ---------- */
  var range = $('#age');
  if (range) {
    var ageOut = $('[data-age-out]');
    var yEl = $('[data-lost-y]'), mEl = $('[data-lost-m]'), dEl = $('[data-lost-d]');
    var updateCalc = function () {
      var age = +range.value;
      var months = Math.round(age * 12 / 3);
      ageOut.textContent = age;
      yEl.textContent = Math.floor(months / 12);
      mEl.textContent = months % 12;
      dEl.textContent = Math.round(age * 365.25 / 3).toLocaleString('ja-JP');
      range.style.setProperty('--v', ((age - range.min) / (range.max - range.min) * 100).toFixed(2) + '%');
    };
    range.addEventListener('input', updateCalc);
    updateCalc();
  }

  /* ---------- カードの傾きと光 ---------- */
  if (finePointer && !reduced) {
    $$('[data-tilt]').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        card.style.setProperty('--ry', ((px - .5) * 5).toFixed(2) + 'deg');
        card.style.setProperty('--rx', ((.5 - py) * 5).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }
})();
