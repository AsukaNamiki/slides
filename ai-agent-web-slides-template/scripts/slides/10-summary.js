(function () {
  window.SlideRegistry.register({
    id: 's10-summary',
    order: 34,
    className: 'slide hero',
    html: `
      <div class="hero-bg"></div>
      <canvas class="leaf-canvas" aria-hidden="true"></canvas>
      <h2>まとめ</h2>
      <div class="summary-grid">
        <article class="summary-card">
          <span class="summary-num">1</span>
          <h3>全体像を理解する</h3>
          <p>入口 → 推論 → 判断と実行の流れで、生成AIシステムの構造を把握しました。</p>
        </article>
        <article class="summary-card">
          <span class="summary-num">2</span>
          <h3>要素ごとに選び方を知る</h3>
          <p>推論モデル・ツール連携（API/CLI/Script/MCP/Skill）・UIは用途起点で選びます。</p>
        </article>
        <article class="summary-card">
          <span class="summary-num">3</span>
          <h3>レベルで仕分ける</h3>
          <p>初級（標準機能）→ 中級（Skill/MCP導入）→ 上級（専門家に相談）で業務を分類します。</p>
        </article>
        <article class="summary-card">
          <span class="summary-num">4</span>
          <h3>リスクを知って使う</h3>
          <p>ハルシネーション・情報漏えい・暴走リスクを理解し、最小権限と人の承認で守ります。</p>
        </article>
      </div>
      <p class="footnote">今回は一般的に使える概念や考え方をメインにお伝えしました。個別具体の設定方法等については別途ご相談ください。</p>

      <div class="survey-box">
        <img class="survey-qr" src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https%3A%2F%2Fforms.gle%2FQDwfjdTtPnpYrbGu5" alt="アンケートQRコード" />
        <div class="survey-text">
          <h3>アンケートにご協力ください</h3>
          <a href="https://forms.gle/QDwfjdTtPnpYrbGu5" target="_blank" rel="noopener noreferrer">https://forms.gle/QDwfjdTtPnpYrbGu5</a>
        </div>
      </div>
    `,
  });
})();
