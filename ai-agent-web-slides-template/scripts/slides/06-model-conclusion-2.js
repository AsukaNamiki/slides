(function () {
  window.SlideRegistry.register({
    id: 's06-model-conclusion-2',
    order: 12,
    className: 'slide message',
    html: `
      <h2>推論モデルの選び方: コスト重視なら中華系モデルも</h2>
      <div class="goal-grid">
        <article>
          <h3>1. 代表的な候補</h3>
          <ul class="goal-abc-list">
            <li>Qwen（Alibaba）</li>
            <li>DeepSeek</li>
            <li>GLM（Zhipu AI）</li>
          </ul>
        </article>
        <article>
          <h3>2. 使う前に見るポイント</h3>
          <ul class="goal-abc-list">
            <li>API料金とトークン単価</li>
            <li>応答速度と安定性</li>
            <li>日本語での実用性</li>
          </ul>
        </article>
        <article>
          <h3>3. 位置づけ</h3>
          <ul class="goal-abc-list">
            <li>まずは大手3社で開始</li>
            <li>コスト課題が出たら比較検討</li>
          </ul>
        </article>
      </div>
      <p class="footnote">コスト改善を狙う場合は、用途を限定して段階的に導入するのが安全です。</p>
    `,
  });
})();