(function () {
  window.SlideRegistry.register({
    id: 's03-goal',
    order: 8,
    className: 'slide message',
    html: `
      <h2>今日のゴール</h2>
      <div class="goal-grid">
        <article>
          <h3>1. 基礎理解</h3>
          <p>生成AIの基礎と全体像を把握する。</p>
        </article>
        <article>
          <h3>2. 業務適用</h3>
          <p>自分の業務にどう当てはめるかをイメージできるようにする。</p>
        </article>
        <article>
          <h3>3. レベル判断</h3>
          <ul class="goal-abc-list">
            <li>初級: Web、デスクトップアプリの標準機能で誰でもできる（AIを使える梅竹コースの子に委託できる）</li>
            <li>中級: 公式MCP/Skill導入で特定のワークフローを効率化できる（本講座後に実践できる）</li>
            <li>上級: 複数のAPIやCLIなどと連携して複雑な業務フローを自動化する（専門家に相談）</li>
          </ul>
        </article>
      </div>
      <p class="footnote">講座終了時には、1つの業務を初級/中級/上級の3段階で判断できる状態を目指します。</p>
    `,
  });
})();
