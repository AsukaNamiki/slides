(function () {
  if (window.SlideRegistry) return;

  const entries = [];

  function register(slideDef) {
    if (!slideDef || !slideDef.id) {
      throw new Error('Slide definition must include an id.');
    }
    entries.push(slideDef);
  }

  function getAll() {
    return entries
      .slice()
      .sort(function (a, b) {
        return (a.order || 0) - (b.order || 0);
      });
  }

  window.SlideRegistry = {
    register,
    getAll,
  };
})();
