/* ==========================================================================
   宵町ネオ 公式サイト
   ========================================================================== */

(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.remove('no-js');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 残光街の営業時間（JST 0:00〜5:00）
  const OPEN_HOUR = 0;
  const CLOSE_HOUR = 5;
  const STORAGE_KEY = 'yoimachi-neo:breaker';

  /* ------------------------------------------------------------------------
     ユーティリティ
     ------------------------------------------------------------------------ */

  // 日本時間の「時・分・曜日」を取得する
  const getJstNow = () => {
    const now = new Date();
    const jst = new Date(now.getTime() + (now.getTimezoneOffset() + 9 * 60) * 60 * 1000);
    return {
      hour: jst.getHours(),
      minute: jst.getMinutes(),
      day: jst.getDay(),
    };
  };

  // localStorage はプライベートモード等で例外になることがあるため保護する
  const storage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        // 保存できなくても表示には影響しない
      }
    },
  };

  /* ------------------------------------------------------------------------
     ヘッダー：スクロールで背景を付ける
     ------------------------------------------------------------------------ */
  const header = document.querySelector('.site-header');

  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  /* ------------------------------------------------------------------------
     ブレーカー：ネオンの点灯／消灯
     ------------------------------------------------------------------------ */
  const breaker = document.getElementById('breaker');
  const breakerState = document.getElementById('breaker-state');

  const setBreaker = (isOn) => {
    document.body.classList.toggle('is-off', !isOn);
    breaker.setAttribute('aria-pressed', String(isOn));
    breakerState.textContent = isOn ? 'ON' : 'OFF';
    storage.set(STORAGE_KEY, isOn ? 'on' : 'off');
  };

  setBreaker(storage.get(STORAGE_KEY) !== 'off');

  breaker.addEventListener('click', () => {
    setBreaker(breaker.getAttribute('aria-pressed') !== 'true');
  });

  /* ------------------------------------------------------------------------
     営業中／準備中の札（JSTで判定）
     ------------------------------------------------------------------------ */
  const openSign = document.getElementById('open-sign');
  const openSignEn = document.getElementById('open-sign-en');
  const openSignJa = document.getElementById('open-sign-ja');
  const openSignNote = document.getElementById('open-sign-note');

  const formatDuration = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}時間${m}分` : `${m}分`;
  };

  const updateOpenSign = () => {
    const { hour, minute } = getJstNow();
    const isOpen = hour >= OPEN_HOUR && hour < CLOSE_HOUR;
    const nowMinutes = hour * 60 + minute;
    const pad = (n) => String(n).padStart(2, '0');
    const clock = `${pad(hour)}:${pad(minute)}`;

    openSign.dataset.state = isOpen ? 'open' : 'closed';
    openSignEn.textContent = isOpen ? 'OPEN' : 'CLOSED';
    openSignJa.textContent = isOpen ? '営業中' : '準備中';

    if (isOpen) {
      const rest = CLOSE_HOUR * 60 - nowMinutes;
      openSignNote.innerHTML = `残光街時間 <strong>${clock}</strong>　閉店まであと <strong>${formatDuration(rest)}</strong>`;
    } else {
      const rest = 24 * 60 - nowMinutes;
      openSignNote.innerHTML = `残光街時間 <strong>${clock}</strong>　開店まであと <strong>${formatDuration(rest)}</strong>`;
    }

    // ヘアピンの札も連動させる（解説用の複製にも反映）
    document.querySelectorAll('.hairpin').forEach((pin) => {
      pin.classList.toggle('is-closed', !isOpen);
    });
    document.querySelectorAll('.hairpin-text').forEach((text) => {
      text.textContent = isOpen ? '営業中' : '準備中';
    });
  };

  /* ------------------------------------------------------------------------
     本日の配信をハイライト
     深夜（5時まで）は「前日の夜」の番組として扱う
     ------------------------------------------------------------------------ */
  const highlightToday = () => {
    const { hour, day } = getJstNow();
    const showDay = hour < CLOSE_HOUR ? (day + 6) % 7 : day;

    document.querySelectorAll('.menu-item').forEach((item) => {
      item.classList.toggle('is-today', Number(item.dataset.day) === showDay);
    });
  };

  /* ------------------------------------------------------------------------
     ネオン文字の接触不良
     ------------------------------------------------------------------------ */
  const neonChars = [...document.querySelectorAll('.neon-char')];

  const flicker = (el) => {
    el.classList.remove('is-flicker');
    // アニメーションを最初から再生し直すため、レイアウトを一度確定させる
    void el.getBoundingClientRect();
    el.classList.add('is-flicker');
  };

  neonChars.forEach((char) => {
    char.addEventListener('click', () => flicker(char));
    char.addEventListener('animationend', () => char.classList.remove('is-flicker'));
  });

  const scheduleRandomFlicker = () => {
    const wait = 2500 + Math.random() * 4500;
    window.setTimeout(() => {
      if (!document.body.classList.contains('is-off') && !document.hidden) {
        const target = neonChars[Math.floor(Math.random() * neonChars.length)];
        flicker(target);
      }
      scheduleRandomFlicker();
    }, wait);
  };

  /* ------------------------------------------------------------------------
     立ち絵：ネオン管を描くように点灯
     ------------------------------------------------------------------------ */
  const heroFigure = document.querySelector('.hero-figure .neo-figure');

  const drawFigure = () => {
    const strokes = heroFigure.querySelectorAll('.tube path, .tube rect, .tube circle');

    strokes.forEach((stroke, index) => {
      const length = Math.ceil(stroke.getTotalLength());
      stroke.style.setProperty('--len', length);
      stroke.style.setProperty('--delay', `${0.15 + index * 0.035}s`);
    });

    heroFigure.classList.add('is-drawing');

    // 描画が終わったら通常状態に戻す（枠の点線などを復元するため）
    const total = 1600 + 150 + strokes.length * 35 + 200;
    window.setTimeout(() => {
      heroFigure.classList.remove('is-drawing');
      strokes.forEach((stroke) => {
        stroke.style.removeProperty('--len');
        stroke.style.removeProperty('--delay');
      });
    }, total);
  };

  /* ------------------------------------------------------------------------
     立ち絵解説：ヒーローの立ち絵を複製し、パーツを強調表示
     ------------------------------------------------------------------------ */
  const PART_MAP = {
    hair: ['hair', 'hair-tip'],
    hairpin: ['hairpin'],
    collar: ['collar', 'tie', 'apron'],
    glass: ['glass', 'soda', 'cream', 'cherry', 'hand'],
    cord: ['cord'],
  };

  const setupDesignFigure = () => {
    const layout = document.querySelector('.design-layout');
    const parts = [...document.querySelectorAll('.design-part')];
    if (!layout || !heroFigure) {
      return;
    }

    const figure = document.createElement('div');
    figure.className = 'design-figure';
    figure.setAttribute('aria-hidden', 'true');

    const clone = heroFigure.cloneNode(true);
    clone.classList.remove('is-drawing');
    // ID の重複を避ける（フィルターやグラデーションは元の定義を参照する）
    clone.querySelectorAll('defs, title, desc').forEach((el) => el.remove());
    clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
    clone.removeAttribute('aria-labelledby');
    clone.removeAttribute('role');
    clone.querySelectorAll('[style]').forEach((el) => el.removeAttribute('style'));

    figure.appendChild(clone);
    layout.prepend(figure);

    const focusPart = (key) => {
      const targets = PART_MAP[key] || [];
      figure.classList.toggle('has-focus', targets.length > 0);
      clone.querySelectorAll('[data-part]').forEach((el) => {
        el.classList.toggle('is-focus', targets.includes(el.dataset.part));
      });
      parts.forEach((part) => {
        part.classList.toggle('is-active', part.dataset.highlight === key);
      });
    };

    parts.forEach((part) => {
      const button = part.querySelector('button');
      const key = part.dataset.highlight;
      button.addEventListener('mouseenter', () => focusPart(key));
      button.addEventListener('focus', () => focusPart(key));
      button.addEventListener('click', () => focusPart(key));
    });

    document.querySelector('.design-parts').addEventListener('mouseleave', () => focusPart(null));
  };

  /* ------------------------------------------------------------------------
     スクロールで出現・数字のカウントアップ
     ------------------------------------------------------------------------ */
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      el.textContent = String(Math.round(target * eased));
      if (progress < 1) {
        window.requestAnimationFrame(tick);
      }
    };

    window.requestAnimationFrame(tick);
  };

  const setupReveal = () => {
    const items = document.querySelectorAll('[data-reveal]');

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    // Bento などの並びは少しずつ時間差で出す
    document.querySelectorAll('.bento, .design-parts, .timeline').forEach((group) => {
      group.querySelectorAll('[data-reveal]').forEach((item, index) => {
        item.style.setProperty('--reveal-delay', `${(index % 4) * 0.08}s`);
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add('is-visible');
        entry.target.querySelectorAll('.count-up').forEach(countUp);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    items.forEach((item) => observer.observe(item));
  };

  /* ------------------------------------------------------------------------
     ストーリーの巨大文字をスクロールに合わせて横に流す
     ------------------------------------------------------------------------ */
  const storyGiant = document.querySelector('.story-giant');
  const story = document.querySelector('.story');

  const updateStoryGiant = () => {
    if (!storyGiant || prefersReducedMotion) {
      return;
    }
    const rect = story.getBoundingClientRect();
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    const clamped = Math.min(Math.max(progress, 0), 1);
    storyGiant.style.setProperty('--shift', `${(0.5 - clamped) * 60}vw`);
  };

  /* ------------------------------------------------------------------------
     カラーパレット：クリックでコピー
     ------------------------------------------------------------------------ */
  const toast = document.getElementById('toast');
  let toastTimer = null;

  const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add('is-shown');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-shown'), 1800);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    // 非HTTPS環境向けのフォールバック
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  };

  document.querySelectorAll('.swatch').forEach((swatch) => {
    swatch.addEventListener('click', async () => {
      const color = swatch.dataset.color.toUpperCase();
      try {
        await copyText(color);
        showToast(`${color} をコピーしました`);
      } catch (error) {
        showToast(`コピーできませんでした（${color}）`);
      }
    });
  });

  /* ------------------------------------------------------------------------
     初期化
     ------------------------------------------------------------------------ */
  let ticking = false;
  const onScroll = () => {
    if (ticking) {
      return;
    }
    ticking = true;
    window.requestAnimationFrame(() => {
      updateHeader();
      updateStoryGiant();
      ticking = false;
    });
  };

  updateHeader();
  updateOpenSign();
  highlightToday();
  setupDesignFigure();
  setupReveal();
  updateStoryGiant();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.setInterval(() => {
    updateOpenSign();
    highlightToday();
  }, 30 * 1000);

  if (!prefersReducedMotion) {
    drawFigure();
    scheduleRandomFlicker();
  }
})();
