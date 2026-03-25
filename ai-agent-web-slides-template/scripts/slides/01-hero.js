(function () {
  window.SlideRegistry.register({
    id: 's01-hero',
    order: 1,
    className: 'slide hero',
    html: `
      <div class="hero-bg"></div>
      <canvas class="leaf-canvas" aria-hidden="true"></canvas>
      <p class="tag">AI Agent Utilization Lecture</p>
      <h1>非エンジニアのための<br />AIエージェント活用講座</h1>
      <p class="lead">現役ITエンジニアが解説するAI活用リテラシー</p>
      <div class="hero-toc-inline" data-component="hero-toc-inline"></div>
    `,
  });
})();
