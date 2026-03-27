(function () {
  window.SlideRegistry.register({
    id: 's11-promo-intro',
    order: 35,
    className: 'slide',
    html: `
      <h2>3つのサービスを始めます</h2>
      <div class="promo-grid">
        <article class="promo-card">
          <span class="promo-num">1</span>
          <h3>個別ITコンサル</h3>
          <p>週1ミーティングで業務フローをヒアリング。<br>手取り足取りサポートします。</p>
        </article>
        <article class="promo-card">
          <span class="promo-num">2</span>
          <h3>あなただけのAI秘書</h3>
          <p>いつものワークスペースに<br>あなた専用のAI秘書を導入。</p>
        </article>
        <article class="promo-card">
          <span class="promo-num">3</span>
          <h3>レベニューシェア型<br>アプリ開発</h3>
          <p>あなたの欲しいアプリを<br>無料で開発します。</p>
        </article>
      </div>
    `,
  });
})();
