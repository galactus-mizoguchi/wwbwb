// DJ KATSUTARO ― Official Golden Website
(() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

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
    let index = 0;
    $$('.hero__line').forEach((line) => {
      splitChars(line, 'hch');
      $$('.hch', line).forEach((char) => char.style.setProperty('--i', index++));
    });
    $$('.sec-head__title').forEach((title) => {
      title.setAttribute('aria-label', title.textContent.trim());
      splitChars(title, 'ch');
      $$('.ch', title).forEach((char) => char.setAttribute('aria-hidden', 'true'));
    });
  };

  /* ---------- 数字のカウントアップ ---------- */
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    if (reducedMotion || !Number.isFinite(target)) return;
    // 年号は下二桁だけを回す
    const from = el.hasAttribute('data-plain') ? target - 17 : 0;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      el.textContent = Math.round(from + (target - from) * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- リビール ---------- */
  const setupReveal = () => {
    const targets = $$('.rv, .sec-head__title');
    const counters = $$('[data-count]');
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
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach((target) => observer.observe(target));

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((counter) => counterObserver.observe(counter));
  };

  /* ---------- 再生中トラックの切り替え ---------- */
  const setupPlayer = () => {
    const track = $('#player-track');
    if (!track || reducedMotion) return;
    const tracks = [
      'Put Your Hands Up For 落語',
      'Tokyo Nights',
      'Neon Samurai',
      'Rising Sun',
      'Electric Sakura',
      'Infinite Energy'
    ];
    let index = 0;
    setInterval(() => {
      index = (index + 1) % tracks.length;
      track.classList.add('is-out');
      setTimeout(() => {
        track.textContent = tracks[index];
        track.classList.remove('is-out');
      }, 450);
    }, 5200);
  };

  /* ---------- スクロール・ポインタ連動 ---------- */
  const setupMotion = () => {
    const hero = $('.hero');
    const photo = $('.hero__photo img');
    const spot = $('.hero__spot');
    const titles = $$('.sec-head__title');
    const toTop = $('#go-to-top');
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (toTop) toTop.classList.toggle('is-shown', y > 400);
      if (reducedMotion) return;
      if (hero && photo && y < hero.offsetHeight + 60) {
        photo.style.setProperty('--py', `${(y * 0.12).toFixed(1)}px`);
      }
      titles.forEach((title) => {
        const rect = title.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        // 画面中央で定位置に収まり、離れるほど右へ流れる
        const offset = Math.abs(rect.top + rect.height / 2 - vh / 2) / vh;
        title.style.setProperty('--dx', `${(offset * window.innerWidth * 0.1).toFixed(1)}px`);
      });
    };

    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', update);
    update();

    if (toTop) {
      toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));
    }

    // スポットライトがカーソルを追う
    if (hero && spot && finePointer && !reducedMotion) {
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        spot.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        spot.style.setProperty('--my', `${event.clientY - rect.top}px`);
      }, { passive: true });
    }
  };

  /* ---------- 初期化 ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    setupTypography();
    setupReveal();
    setupPlayer();
    setupMotion();

    // 視差軽減の設定では背景動画を止める
    const heroVideo = $('#hero-bg-video');
    if (heroVideo && reducedMotion) {
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
    }

    // フォントが揃ってから幕を開ける
    const open = () => document.body.classList.add('is-ready');
    const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fontsReady.then(() => setTimeout(open, 120));
    setTimeout(open, 1800);
  });
})();
