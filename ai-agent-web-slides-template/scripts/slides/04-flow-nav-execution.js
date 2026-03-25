(function () {
  window.SlideRegistry.register({
    id: 's04-flow-nav-execution',
    order: 14,
    className: 'slide message',
    html: `
      <h2>次の解説: 判断と実行（ツール連携）</h2>
      <div class="agent-flow">
        <div class="agent-node skip">
          <h3>入口</h3>
          <p>依頼の受付</p>
        </div>
        <div class="agent-arrow">→</div>
        <div class="agent-node skip">
          <h3>前処理と制御</h3>
          <p>入力整形・安全確認・分岐</p>
        </div>
        <div class="agent-arrow">→</div>
        <div class="agent-node skip">
          <h3>推論</h3>
          <p>モデル呼び出し</p>
        </div>
        <div class="agent-arrow">→</div>
        <div class="agent-node focus nav-highlight">
          <h3>判断と実行</h3>
          <p>外部処理の実行</p>
        </div>
        <div class="agent-arrow">→</div>
        <div class="agent-node skip">
          <h3>出力と記録</h3>
          <p>回答返却・ログ保存</p>
        </div>
      </div>
      <p class="footnote">推論結果をどう外部につなぐか。ツール連携の全体像と各要素を解説します。</p>
    `,
  });
})();
