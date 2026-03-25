(function () {
  window.SlideRegistry.register({
    id: 's08-abc',
    order: 27,
    className: 'slide message',
    html: `
      <h2>業務適用レベルについて</h2>

      <div class="level-chart">
        <!-- 横軸ヘッダー -->
        <div class="level-header">
          <span class="level-label">初級</span>
          <span class="level-label">中級</span>
          <span class="level-label">上級</span>
        </div>
        <div class="level-axis">
          <div class="level-tick" style="left:33.3%;"></div>
          <div class="level-tick" style="left:66.6%;"></div>
        </div>

        <!-- 各UI行 -->
        <div class="level-row">
          <div class="level-row-label">Web</div>
          <div class="level-row-track">
            <div class="level-bar" style="left:0%; width:33.3%;"></div>
          </div>
        </div>
        <div class="level-row">
          <div class="level-row-label">デスクトップ</div>
          <div class="level-row-track">
            <div class="level-bar" style="left:0%; width:50%;"></div>
          </div>
        </div>
        <div class="level-row">
          <div class="level-row-label">IDE</div>
          <div class="level-row-track">
            <div class="level-bar bar-mid" style="left:33.3%; width:50%;"></div>
          </div>
        </div>
        <div class="level-row">
          <div class="level-row-label">CLI</div>
          <div class="level-row-track">
            <div class="level-bar bar-high" style="left:50%; width:50%;"></div>
          </div>
        </div>
      </div>

      <div class="level-desc">
        <div class="level-desc-item">
          <h3>初級</h3>
          <p>Web、デスクトップアプリの標準機能で誰でもできる（AIを使える梅竹コースの子に委託できる）</p>
        </div>
        <div class="level-desc-item">
          <h3>中級</h3>
          <p>公式MCP/Skill導入で特定のワークフローを効率化できる（本講座後に実践できる）</p>
        </div>
        <div class="level-desc-item">
          <h3>上級</h3>
          <p>複数のAPIやCLIなどと連携して複雑な業務フローを自動化する。ローカルLLMの採用や自律型エージェントの構築も含む（専門家に相談）</p>
        </div>
      </div>
    `,
  });
})();
