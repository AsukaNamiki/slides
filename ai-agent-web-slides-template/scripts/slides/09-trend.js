(function () {
  window.SlideRegistry.register({
    id: 's09-trend',
    order: 33,
    className: 'slide message',
    html: `
      <h2>AIエージェントの今後（潮流）</h2>

      <div class="trend-timeline">
        <div class="trend-phase current">
          <h3>現在</h3>
          <p>対話中心</p>
          <ul class="goal-abc-list">
            <li>人が指示 → AIが回答</li>
            <li>Web/デスクトップが主流</li>
          </ul>
        </div>
        <div class="trend-arrow">→</div>
        <div class="trend-phase next">
          <h3>自律化</h3>
          <p>人の介在を削減</p>
          <ul class="goal-abc-list">
            <li>判断→実行→報告を自走</li>
            <li>サーバー上で常時稼働（OpenClaw）</li>
          </ul>
        </div>
        <div class="trend-arrow">→</div>
        <div class="trend-phase future">
          <h3>フィジカルAI</h3>
          <p>現実世界で実行</p>
          <ul class="goal-abc-list">
            <li>ロボット・機械にAIを組み込み</li>
            <li>ローカル推論で低遅延実行</li>
            <li>ブルーカラー領域へ拡大</li>
          </ul>
        </div>
      </div>

      <div class="trend-conditions">
        <h3>普及の条件</h3>
        <div class="trend-cond-tags">
          <span class="api-target">ローカル推論（ローカルLLM）</span>
          <span class="api-target">自律判断の信頼性</span>
          <span class="api-target">セキュリティ・責任設計</span>
          <span class="api-target">監査対応</span>
        </div>
      </div>

      <p class="footnote">技術的には大抵のことがAIで可能になってきました。重要度が増してくるのがセキュリティ・責任設計です。</p>
    `,
  });
})();
