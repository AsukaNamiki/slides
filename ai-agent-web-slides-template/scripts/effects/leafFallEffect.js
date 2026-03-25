(function () {
  const EFFECT_DEFAULTS = {
    palette: ['#0f9d58', '#35c98a', '#0b6e3d', '#8fe7be'],
    leafCount: 26,
    sizeMin: 9,
    sizeMax: 26,
    speedMin: 0.3,
    speedMax: 1.2,
    driftMin: -0.16,
    driftMax: 0.16,
    wobbleAmpMin: 5,
    wobbleAmpMax: 19,
    wobbleFreqMin: 0.0018,
    wobbleFreqMax: 0.006,
    rotationSpeedMin: -0.025,
    rotationSpeedMax: 0.025,
    alphaMin: 0.18,
    alphaMax: 0.52,
  };

  function initLeafFallEffect(options) {
    const opts = options || {};
    const Reveal = opts.Reveal;
    const slideSelector = opts.slideSelector || '.slide.hero';
    const canvasSelector = opts.canvasSelector || '.leaf-canvas';
    const effect = opts.effect || {};

    if (!Reveal) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroSlides = document.querySelectorAll(slideSelector);
    if (!heroSlides.length) return;

    heroSlides.forEach(function (hero) {
      const canvas = hero.querySelector(canvasSelector);
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      initSingleLeafEffect(Reveal, hero, canvas, ctx, effect);
    });
  }

  function initSingleLeafEffect(Reveal, hero, canvas, ctx, effect) {

    const config = Object.assign({}, EFFECT_DEFAULTS, effect);
    const leaves = [];
    let width = 1;
    let height = 1;
    let dpr = 1;
    let rafId = 0;
    let running = false;
    let lastTs = 0;

    const rand = (min, max) => Math.random() * (max - min) + min;

    const createLeaf = (inView = false) => ({
      x: rand(-80, width + 80),
      y: inView ? rand(0, height) : rand(-height * 0.6, -20),
      size: rand(config.sizeMin, config.sizeMax),
      speed: rand(config.speedMin, config.speedMax),
      drift: rand(config.driftMin, config.driftMax),
      wobbleAmp: rand(config.wobbleAmpMin, config.wobbleAmpMax),
      wobbleFreq: rand(config.wobbleFreqMin, config.wobbleFreqMax),
      phase: rand(0, Math.PI * 2),
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(config.rotationSpeedMin, config.rotationSpeedMax),
      alpha: rand(config.alphaMin, config.alphaMax),
      color: config.palette[Math.floor(rand(0, config.palette.length))],
    });

    const resetLeaves = (inView) => {
      leaves.length = 0;
      for (let i = 0; i < config.leafCount; i += 1) {
        leaves.push(createLeaf(inView));
      }
    };

    const resizeCanvas = () => {
      const rect = hero.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawLeaf = (leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rot);
      ctx.globalAlpha = leaf.alpha;
      ctx.fillStyle = leaf.color;

      const s = leaf.size;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.62);
      ctx.bezierCurveTo(s * 0.68, -s * 0.38, s * 0.52, s * 0.56, 0, s * 0.74);
      ctx.bezierCurveTo(-s * 0.52, s * 0.56, -s * 0.68, -s * 0.38, 0, -s * 0.62);
      ctx.fill();

      ctx.globalAlpha = Math.max(leaf.alpha - 0.12, 0.08);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.42);
      ctx.lineTo(0, s * 0.52);
      ctx.stroke();
      ctx.restore();
    };

    const tick = (ts) => {
      if (!running) return;
      if (!lastTs) lastTs = ts;

      const dt = Math.min((ts - lastTs) / 16.67, 2.4);
      lastTs = ts;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < leaves.length; i += 1) {
        const leaf = leaves[i];
        leaf.y += leaf.speed * dt;
        leaf.x += leaf.drift * dt + Math.sin(ts * leaf.wobbleFreq + leaf.phase) * leaf.wobbleAmp * 0.02;
        leaf.rot += leaf.rotSpeed * dt;
        drawLeaf(leaf);

        if (leaf.y > height + 45 || leaf.x < -110 || leaf.x > width + 110) {
          leaves[i] = createLeaf(false);
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      resizeCanvas();
      if (!leaves.length) resetLeaves(true);
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(rafId);
      rafId = 0;
      ctx.clearRect(0, 0, width, height);
    };

    const sync = (event) => {
      const currentSlide = event?.currentSlide || Reveal.getCurrentSlide();
      if (currentSlide === hero) {
        start();
      } else {
        stop();
      }
    };

    window.addEventListener('resize', resizeCanvas);
    Reveal.on('ready', sync);
    Reveal.on('slidechanged', sync);

    resizeCanvas();
    resetLeaves(true);
    sync();
  }

  window.SlideEffects = window.SlideEffects || {};
  window.SlideEffects.initLeafFallEffect = initLeafFallEffect;
})();
