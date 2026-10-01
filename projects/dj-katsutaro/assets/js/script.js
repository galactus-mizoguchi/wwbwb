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

// hero sparkle motion graphics
(function () {
  var canvas = document.getElementById('sparkle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var colors = ['#f0c766', '#ff2e88', '#9b30ff', '#2de2ff'];
  var particles = [];
  var dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed(rect.width, rect.height);
  }

  function seed(w, h) {
    var count = Math.max(40, Math.min(110, Math.round((w * h) / 16000)));
    particles = [];
    for (var i = 0; i < count; i++) {
      particles.push(makeParticle(w, h, true));
    }
  }

  function makeParticle(w, h, randomY) {
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + 10,
      r: 1 + Math.random() * 2.4,
      speed: 0.25 + Math.random() * 0.6,
      drift: (Math.random() - 0.5) * 0.4,
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.02 + Math.random() * 0.03,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  }

  function drawSpark(p, w, h) {
    var alpha = 0.35 + 0.65 * ((Math.sin(p.twinkle) + 1) / 2);
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
    if (p.y < -10) {
      p.x = Math.random() * w;
      p.y = h + 10;
    }
  }

  function render() {
    var rect = canvas.parentElement.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);
    particles.forEach(function (p) { drawSpark(p, rect.width, rect.height); });
    if (!reduceMotion) requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  render();
})();
