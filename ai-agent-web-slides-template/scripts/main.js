(function () {
  /* セクション定義 */
  var SECTIONS = [
    { key: 'intro',   label: 'はじめに',       from: 1,  to: 8  },
    { key: 'basics',  label: 'AIの基礎',       from: 9,  to: 10 },
    { key: 'model',   label: '推論モデル',      from: 11, to: 15 },
    { key: 'tools',   label: 'ツール連携',      from: 16, to: 22 },
    { key: 'ui',      label: 'UI',             from: 23, to: 28 },
    { key: 'apply',   label: '業務適用',        from: 29, to: 32 },
    { key: 'future',  label: 'リスク管理',      from: 33, to: 35 },
    { key: 'summary', label: 'まとめ',          from: 36, to: 36 },
  ];

  function sectionFor(order) {
    for (var i = 0; i < SECTIONS.length; i++) {
      if (order >= SECTIONS[i].from && order <= SECTIONS[i].to) return SECTIONS[i];
    }
    return null;
  }

  function renderSlidesFromRegistry() {
    var root = document.querySelector('[data-component="slides-root"]');
    var registry = window.SlideRegistry || {};
    if (!root || !registry.getAll) return;

    var slideDefs = registry.getAll();
    while (root.firstChild) root.removeChild(root.firstChild);

    for (var i = 0; i < slideDefs.length; i++) {
      var def = slideDefs[i];
      var section = document.createElement('section');
      section.className = def.className || 'slide';
      section.setAttribute('data-order', def.order || 0);
      section.innerHTML = (def.html || '').trim();
      root.appendChild(section);
    }
  }

  /* パンくずナビを各スライドに挿入 */
  function insertBreadcrumbs() {
    var slides = document.querySelectorAll('[data-order]');
    slides.forEach(function (slide) {
      var order = parseInt(slide.getAttribute('data-order'), 10);
      /* タイトル(1)とまとめ(36)にはパンくず不要 */
      if (order <= 1 || order >= 36) return;

      var current = sectionFor(order);
      if (!current) return;

      var nav = document.createElement('nav');
      nav.className = 'breadcrumb';
      nav.setAttribute('aria-label', 'セクションナビ');

      var html = '';
      for (var i = 0; i < SECTIONS.length; i++) {
        var s = SECTIONS[i];
        if (s.key === 'summary') continue;
        var cls = 'bc-item';
        if (s.key === current.key) cls += ' bc-active';
        html += '<span class="' + cls + '">' + s.label + '</span>';
        if (i < SECTIONS.length - 2) html += '<span class="bc-sep">/</span>';
      }
      nav.innerHTML = html;
      slide.insertBefore(nav, slide.firstChild);
    });
  }

  /* タイトルページの目次を生成 */
  function renderHeroToc() {
    var container = document.querySelector('.hero-toc-inline');
    if (!container) return;

    var html = '<p class="hero-toc-heading">目次</p><div class="hero-toc-grid">';
    for (var i = 0; i < SECTIONS.length; i++) {
      var num = (i + 1 < 10 ? '0' : '') + (i + 1);
      html += '<div class="hero-toc-item">';
      html += '<span class="hero-toc-num">' + num + '</span>';
      html += '<span class="hero-toc-text">' + SECTIONS[i].label + '</span>';
      html += '</div>';
    }
    html += '</div>';
    container.innerHTML = html;
  }

  function initIntroSection(components, data) {
    var panels = document.querySelector('[data-component="intro-panels"]');
    var reference = document.querySelector('[data-component="intro-reference"]');
    if (components.renderIntroCards) {
      components.renderIntroCards(panels, data.introCards || []);
    }
    if (components.renderReferenceLine) {
      components.renderReferenceLine(reference, data.introReference || null);
    }
  }

  function initCommonFooter(settings) {
    var dateNode = document.querySelector('[data-component="footer-date"]');
    if (!dateNode) return;
    dateNode.textContent = settings.footerDatePlaceholder || 'YYYY/MM/DD';
  }

  function bootstrap() {
    var settings = window.SLIDE_SETTINGS || {};
    var core = window.SlideCore || {};
    var effects = window.SlideEffects || {};
    var components = window.SlideComponents || {};
    var data = window.SlideData || {};

    if (!core.initReveal || !effects.initLeafFallEffect) {
      throw new Error('Required slide modules are not loaded.');
    }

    renderSlidesFromRegistry();
    insertBreadcrumbs();
    renderHeroToc();
    initIntroSection(components, data);
    initCommonFooter(settings);

    var Reveal = core.initReveal(settings.reveal || {});
    effects.initLeafFallEffect({
      Reveal: Reveal,
      slideSelector: '.slide.hero',
      canvasSelector: '.leaf-canvas',
      effect: settings.heroLeafEffect || {},
    });
  }

  bootstrap();
})();
