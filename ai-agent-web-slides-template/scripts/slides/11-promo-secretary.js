(function () {
  window.SlideRegistry.register({
    id: 's11-promo-secretary',
    order: 37,
    className: 'slide',
    html: `
      <h2>2. あなただけのAI秘書</h2>
      <div class="promo-detail promo-vertical">
        <div class="promo-top-row">
          <p class="promo-highlight-sm">あなただけのAI秘書を<br>いつものワークスペースに導入</p>
          <ul class="promo-features-compact">
            <li>業務知識やフローを教え込むことができます</li>
            <li>Slackなど普段使いのツールと連携</li>
          </ul>
          <div class="promo-pricing-compact">
            <p class="promo-price-main">初期費用 <strong>10万円</strong> + 月額 <strong>5万円</strong></p>
            <p class="promo-price-note">※サーバ運用費用込み / APIコストは別途</p>
          </div>
        </div>
        <div class="promo-image-large">
          <img src="assets/ui/Slack.png" alt="Slack連携イメージ" class="promo-img-full" onerror="this.parentElement.style.display='none'">
        </div>
      </div>
    `,
  });
})();
