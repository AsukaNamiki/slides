(function () {
  window.SlideRegistry.register({
    id: 's04-ai-basics',
    order: 7,
    className: 'slide message',
    html: `
      <h2>そもそもAIとは（Artificial Intelligence）</h2>
      <p class="ai-structure-note">内包関係: AI ⊃ 機械学習 ⊃ 生成AI ⊃ AIエージェント</p>
      <div class="ai-nesting-canvas">
        <div class="ai-box box-ai">
          <h3>AI</h3>
          <p>知的作業を再現する技術全体</p>
          <div class="ai-box box-ml">
            <h3>機械学習</h3>
            <p>過去データのパターンを学び、予測や分類に使う手法</p>
            <div class="ai-box box-gen">
              <h3>生成AI</h3>
              <p>文章・画像などを生成する領域</p>
              <div class="ai-core">
                <h3>AIエージェント</h3>
                <p>目標に沿って複数作業を連続実行</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="footnote">重要: 出力は確率的。最終判断は人が行う。</p>
    `,
  });
})();
