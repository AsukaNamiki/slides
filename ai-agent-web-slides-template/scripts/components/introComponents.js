(function () {
  function clearNode(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function renderIntroCards(container, cards) {
    if (!container || !Array.isArray(cards)) return;
    clearNode(container);

    for (const card of cards) {
      const article = document.createElement('article');
      article.className = 'intro-card';

      const h4 = document.createElement('h4');
      h4.textContent = card.title;
      article.appendChild(h4);

      const ul = document.createElement('ul');
      for (const item of card.items || []) {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      }

      article.appendChild(ul);
      container.appendChild(article);
    }
  }

  function renderReferenceLine(container, reference) {
    if (!container || !reference) return;
    clearNode(container);

    const strong = document.createElement('strong');
    strong.textContent = `${reference.label}:`;
    container.appendChild(strong);
    container.appendChild(document.createTextNode(' '));

    const link = document.createElement('a');
    link.href = reference.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = reference.url;
    container.appendChild(link);
  }

  window.SlideComponents = window.SlideComponents || {};
  window.SlideComponents.renderIntroCards = renderIntroCards;
  window.SlideComponents.renderReferenceLine = renderReferenceLine;
})();
