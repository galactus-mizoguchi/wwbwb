// go to top
document.addEventListener('DOMContentLoaded', function () {
  var pagetop = document.getElementById('go-to-top');
  if (pagetop) {
    window.addEventListener('scroll', function () {
      pagetop.classList.toggle('hidden', window.scrollY <= 100);
    });
    pagetop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // smooth scroll for in-page links
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

// full-page party motion graphics: rising sparkles + falling confetti + glints
(function () {
  var canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var colors = ['#f0c766', '#ff2e88', '#9b30ff', '#2de2ff', '#ffffff'];
  var particles = [];
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed(w, h);
  }

  function seed(w, h) {
    var sparkCount = Math.max(36, Math.min(90, Math.round((w * h) / 22000)));
    var confettiCount = Math.max(10, Math.min(26, Math.round((w * h) / 70000)));
    var glintCount = Math.max(6, Math.min(16, Math.round((w * h) / 120000)));
    particles = [];
    for (var i = 0; i < sparkCount; i++) particles.push(makeSpark(w, h));
    for (var j = 0; j < confettiCount; j++) particles.push(makeConfetti(w, h));
    for (var k = 0; k < glintCount; k++) particles.push(makeGlint(w, h));
  }

  function makeSpark(w, h) {
    return {
      type: 'spark',
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 2.6,
      speed: 0.3 + Math.random() * 0.8,
      drift: (Math.random() - 0.5) * 0.5,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.02 + Math.random() * 0.04,
      color: pick(colors),
    };
  }

  function makeConfetti(w, h, top) {
    return {
      type: 'confetti',
      x: Math.random() * w,
      y: top ? -10 : Math.random() * h,
      w: 5 + Math.random() * 5,
      h: 3 + Math.random() * 3,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.12,
      fall: 0.6 + Math.random() * 1.1,
      drift: (Math.random() - 0.5) * 1.1,
      sway: Math.random() * Math.PI * 2,
      color: pick(colors),
    };
  }

  function makeGlint(w, h) {
    return {
      type: 'glint',
      x: Math.random() * w,
      y: Math.random() * h,
      size: 5 + Math.random() * 6,
      rot: Math.random() * Math.PI,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.03 + Math.random() * 0.03,
      drift: (Math.random() - 0.5) * 0.25,
      color: pick(colors),
    };
  }

  function drawSpark(p, w, h) {
    var alpha = 0.3 + 0.7 * ((Math.sin(p.twinkle) + 1) / 2);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    p.y -= p.speed;
    p.x += p.drift;
    p.twinkle += p.twinkleSpeed;
    if (p.y < -10) { p.x = Math.random() * w; p.y = h + 10; }
  }

  function drawConfetti(p, w, h) {
    ctx.save();
    ctx.globalAlpha = 0.85;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();

    p.y += p.fall;
    p.sway += 0.05;
    p.x += p.drift + Math.sin(p.sway) * 0.6;
    p.rot += p.rotSpeed;
    if (p.y > h + 10) { p.x = Math.random() * w; p.y = -10; }
  }

  function drawGlint(p, w, h) {
    var alpha = 0.25 + 0.75 * ((Math.sin(p.twinkle) + 1) / 2);
    var s = p.size * (0.6 + 0.4 * ((Math.sin(p.twinkle) + 1) / 2));
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = p.color;
    ctx.beginPath();
    ctx.moveTo(-s, 0); ctx.lineTo(s, 0);
    ctx.moveTo(0, -s); ctx.lineTo(0, s);
    ctx.stroke();
    ctx.restore();

    p.twinkle += p.twinkleSpeed;
    p.y -= p.drift;
    if (p.y < -10) p.y = h + 10;
  }

  function render() {
    var w = window.innerWidth, h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);
    particles.forEach(function (p) {
      if (p.type === 'spark') drawSpark(p, w, h);
      else if (p.type === 'confetti') drawConfetti(p, w, h);
      else drawGlint(p, w, h);
    });
    if (!reduceMotion) requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  render();
})();
