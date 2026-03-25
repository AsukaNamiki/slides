(function () {
  const REVEAL_DEFAULTS = {
    width: 1600,
    height: 900,
    margin: 0.03,
    minScale: 0.2,
    maxScale: 2.0,
    hash: true,
    controls: true,
    progress: true,
    slideNumber: 'c / t',
    transition: 'slide',
    backgroundTransition: 'fade',
    center: false,
  };

  function initReveal(revealOptions) {
    if (!window.Reveal) {
      throw new Error('Reveal.js is not loaded.');
    }

    window.Reveal.initialize(
      Object.assign({}, REVEAL_DEFAULTS, revealOptions || {})
    );

    return window.Reveal;
  }

  window.SlideCore = window.SlideCore || {};
  window.SlideCore.initReveal = initReveal;
})();
