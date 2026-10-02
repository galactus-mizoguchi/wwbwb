// smooth scroll for in-page links
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});

// hero motion graphics: drowsy "Z"s rise, then get zapped awake by lightning
(function () {
  var canvas = document.getElementById('zap-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;

  // pre-rendered glow sprites (fast: avoids per-shape shadowBlur)
  var glowSprites = {};
  function makeGlowSprite(color) {
    var size = 128, r = size / 2;
    var sc = document.createElement('canvas');
    sc.width = size; sc.height = size;
    var sctx = sc.getContext('2d');
    var g = sctx.createRadialGradient(r, r, 0, r, r, r);
    g.addColorStop(0, color);
    g.addColorStop(0.25, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, size, size);
    return sc;
  }
  var COLORS = ['#ffffff', '#5a8cff', '#e50044', '#ffd9a0', '#7fe8ff', '#ff3b5c', '#eaf2ff'];
  COLORS.forEach(function (c) { glowSprites[c] = makeGlowSprite(c); });
  function blitGlow(color, x, y, size, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = 'screen';
    ctx.drawImage(glowSprites[color], x - size / 2, y - size / 2, size, size);
    ctx.restore();
  }

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // insomniac city: windows that stay lit all night, flickering neon-bright
  var windowLights = [];
  for (var w = 0; w < 50; w++) {
    var neon = Math.random() < 0.25;
    windowLights.push({
      x: Math.random(),
      y: 0.38 + Math.random() * 0.42,
      size: neon ? 30 + Math.random() * 22 : 11 + Math.random() * 8,
      color: neon
        ? (Math.random() < 0.5 ? '#ff3b5c' : '#7fe8ff')
        : (Math.random() < 0.6 ? '#ffd9a0' : '#eaf2ff'),
      base: neon ? 0.45 + Math.random() * 0.35 : 0.35 + Math.random() * 0.4,
      flickerSpeed: 0.0015 + Math.random() * 0.004,
      flickerPhase: Math.random() * Math.PI * 2,
      glitchAt: 600 + Math.random() * 4000,
      glitchT: 0,
    });
  }

  // glaring light-streaks raking across the skyline, like glints off glass and traffic
  var streaks = [];
  var streakColors = ['#ffd9a0', '#7fe8ff', '#ff3b5c', '#ffffff'];
  function spawnStreak() {
    var dir = Math.random() < 0.5 ? 1 : -1;
    var len = 140 + Math.random() * 260;
    return {
      y: 0.12 + Math.random() * 0.55,
      len: len,
      dir: dir,
      speed: (0.00035 + Math.random() * 0.00045),
      width: 1.5 + Math.random() * 2.5,
      color: streakColors[Math.floor(Math.random() * streakColors.length)],
      alpha: 0.35 + Math.random() * 0.4,
      progress: dir > 0 ? -0.15 : 1.15,
    };
  }
  for (var st = 0; st < 3; st++) streaks.push(spawnStreak());
  var nextStreakAt = 400;

  // ambient drifting sparks (neurons firing — staying awake)
  var sparks = [];
  for (var i = 0; i < 36; i++) {
    sparks.push({
      x: Math.random(), y: Math.random(),
      r: 1 + Math.random() * 2,
      speed: 0.05 + Math.random() * 0.1,
      drift: (Math.random() - 0.5) * 0.02,
      twinkle: Math.random() * Math.PI * 2,
      color: Math.random() < 0.7 ? '#ffffff' : '#5a8cff',
    });
  }

  // rising "Z" glyphs that periodically get struck by a lightning zap
  var glyphs = ['Z', 'z', 'Zzz'];
  var zs = [];
  function spawnZ() {
    return {
      x: 0.1 + Math.random() * 0.8,
      y: 1.05 + Math.random() * 0.3,
      size: 22 + Math.random() * 30,
      speed: 0.012 + Math.random() * 0.012,
      sway: Math.random() * Math.PI * 2,
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
      state: 'rising', // rising -> zapped -> gone
      zapT: 0,
      sparkBurst: [],
    };
  }
  for (var j = 0; j < 9; j++) {
    var z = spawnZ();
    z.y = Math.random(); // scatter initial positions through the frame
    zs.push(z);
  }

  var nextZapAt = 1200 + Math.random() * 1500;
  var lastTime = null;
  var lightning = null; // { x, y, life }

  function triggerZap(target) {
    target.state = 'zapped';
    target.zapT = 0;
    var bx = target.x * W, by = target.y * H;
    var segments = [{ x: bx + (Math.random() - 0.5) * 40, y: -10 }];
    var steps = 5;
    for (var s = 1; s <= steps; s++) {
      segments.push({
        x: bx + (Math.random() - 0.5) * 60 * (1 - s / steps),
        y: by * (s / steps),
      });
    }
    lightning = { points: segments, life: 1 };
    for (var k = 0; k < 14; k++) {
      var a = Math.random() * Math.PI * 2;
      var sp = 0.8 + Math.random() * 2.2;
      target.sparkBurst.push({
        x: bx, y: by,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
        life: 1, color: Math.random() < 0.5 ? '#e50044' : '#ffffff',
      });
    }
  }

  function step(now) {
    if (lastTime === null) lastTime = now;
    var dt = Math.min(64, now - lastTime);
    lastTime = now;

    ctx.clearRect(0, 0, W, H);

    // insomniac windows — flicker on a slow sine plus the occasional quick glitch
    windowLights.forEach(function (lt) {
      lt.flickerPhase += dt * lt.flickerSpeed;
      var flicker = lt.base + lt.base * 0.6 * ((Math.sin(lt.flickerPhase) + 1) / 2);
      lt.glitchAt -= dt;
      if (lt.glitchAt <= 0) {
        lt.glitchT = 90;
        lt.glitchAt = 2500 + Math.random() * 5000;
      }
      if (lt.glitchT > 0) { lt.glitchT -= dt; flicker *= 0.15; }
      blitGlow(lt.color, lt.x * W, lt.y * H, lt.size, Math.min(1, flicker));
    });

    // glaring light streaks sweeping the skyline
    nextStreakAt -= dt;
    if (nextStreakAt <= 0 && streaks.length < 5) {
      streaks.push(spawnStreak());
      nextStreakAt = 900 + Math.random() * 1600;
    }
    streaks.forEach(function (s) {
      s.progress += s.dir * s.speed * dt;
      var cx = s.progress * W;
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = s.alpha;
      var grad = ctx.createLinearGradient(cx - s.len / 2, 0, cx + s.len / 2, 0);
      grad.addColorStop(0, 'rgba(255,255,255,0)');
      grad.addColorStop(0.5, s.color);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = s.width;
      ctx.beginPath();
      ctx.moveTo(cx - s.len / 2, s.y * H);
      ctx.lineTo(cx + s.len / 2, s.y * H);
      ctx.stroke();
      ctx.restore();
    });
    streaks = streaks.filter(function (s) { return s.progress > -0.2 && s.progress < 1.2; });

    // ambient sparks
    sparks.forEach(function (p) {
      p.y -= p.speed * (dt / 1000);
      p.x += p.drift * (dt / 1000);
      if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
      p.twinkle += dt * 0.003;
      var alpha = 0.3 + 0.5 * ((Math.sin(p.twinkle) + 1) / 2);
      blitGlow(p.color, p.x * W, p.y * H, p.r * 10, alpha);
    });

    // rising / zapped Z glyphs
    ctx.save();
    ctx.font = '900 1em "Noto Sans JP", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    zs.forEach(function (g) {
      if (g.state === 'rising') {
        g.y -= g.speed * (dt / 1000);
        g.sway += dt * 0.001;
        var x = (g.x + Math.sin(g.sway) * 0.02) * W;
        var y = g.y * H;
        ctx.save();
        ctx.globalAlpha = 0.65;
        ctx.fillStyle = '#dce6ff';
        ctx.font = '900 ' + g.size + 'px "Noto Sans JP", sans-serif';
        ctx.fillText(g.glyph, x, y);
        ctx.restore();
        if (g.y < -0.15 && !reduceMotion) {
          Object.assign(g, spawnZ());
          g.y = 1.05 + Math.random() * 0.2;
        }
      } else if (g.state === 'zapped') {
        g.zapT += dt;
        var flash = Math.max(0, 1 - g.zapT / 160);
        if (flash > 0) {
          var zx = g.x * W, zy = g.y * H;
          ctx.save();
          ctx.globalAlpha = flash;
          ctx.fillStyle = '#ffffff';
          ctx.font = '900 ' + (g.size * 1.1) + 'px "Noto Sans JP", sans-serif';
          ctx.fillText(g.glyph, zx, zy);
          ctx.restore();
        }
        g.sparkBurst.forEach(function (sp) {
          sp.x += sp.vx; sp.y += sp.vy; sp.vy += 0.05; sp.life -= dt / 420;
          if (sp.life > 0) blitGlow(sp.color, sp.x, sp.y, 26, sp.life);
        });
        g.sparkBurst = g.sparkBurst.filter(function (sp) { return sp.life > 0; });
        if (g.zapT > 500 && g.sparkBurst.length === 0) {
          Object.assign(g, spawnZ());
        }
      }
    });
    ctx.restore();

    // lightning flash
    if (lightning) {
      lightning.life -= dt / 140;
      if (lightning.life > 0) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, lightning.life);
        ctx.strokeStyle = '#eaf1ff';
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        lightning.points.forEach(function (pt, idx) {
          if (idx === 0) ctx.moveTo(pt.x, pt.y); else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();
        ctx.restore();
      } else {
        lightning = null;
      }
    }

    // schedule next zap on a rising glyph
    nextZapAt -= dt;
    if (nextZapAt <= 0 && !reduceMotion) {
      var candidates = zs.filter(function (g) { return g.state === 'rising'; });
      if (candidates.length) {
        triggerZap(candidates[Math.floor(Math.random() * candidates.length)]);
      }
      nextZapAt = 1400 + Math.random() * 1800;
    }

    requestAnimationFrame(step);
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(step);
})();
