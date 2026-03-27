(function () {
  window.SlideRegistry.register({
    id: 's11-promo-survey',
    order: 39,
    className: 'slide hero',
    html: `
      <div class="hero-bg"></div>
      <canvas class="leaf-canvas" aria-hidden="true"></canvas>
      <h2>アンケートにご協力ください</h2>
      <div class="survey-box survey-box-large">
        <img class="survey-qr survey-qr-large" src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https%3A%2F%2Fforms.gle%2FQDwfjdTtPnpYrbGu5" alt="アンケートQRコード" />
        <div class="survey-text">
          <p class="survey-thanks">本日はありがとうございました！</p>
          <a href="https://forms.gle/QDwfjdTtPnpYrbGu5" target="_blank" rel="noopener noreferrer" class="survey-link-large">https://forms.gle/QDwfjdTtPnpYrbGu5</a>
        </div>
      </div>
    `,
  });
})();
