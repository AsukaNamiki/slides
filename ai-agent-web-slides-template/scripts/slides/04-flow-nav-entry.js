(function () {
  window.SlideRegistry.register({
    id: 's04-flow-nav-entry',
    order: 23,
    className: 'slide message',
    html: `
      <h2>次の解説: 入口（ユーザーインターフェース）</h2>
      <div class="agent-flow">
        <div class="agent-node focus nav-highlight">
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
        <div class="agent-node skip">
          <h3>判断と実行</h3>
          <p>外部処理の実行</p>
        </div>
        <div class="agent-arrow">→</div>
        <div class="agent-node skip">
          <h3>出力と記録</h3>
          <p>回答返却・ログ保存</p>
        </div>
      </div>
      <p class="footnote">どこから使うか。UIの選び方と各種インターフェースを解説します。</p>
    `,
  });
})();
