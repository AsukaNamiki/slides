(function () {
  window.SlideRegistry.register({
    id: 's04-flow',
    order: 8,
    className: 'slide message',
    html: `
      <h2>AIエージェントの構成要素（処理フロー）</h2>
      <div class="agent-flow">
        <div class="agent-node focus">
          <h3>入口</h3>
          <p>依頼の受付</p>
        </div>
        <div class="agent-arrow">→</div>
        <div class="agent-node skip">
          <h3>前処理と制御</h3>
          <p>入力整形・安全確認・分岐</p>
        </div>
        <div class="agent-arrow">→</div>
        <div class="agent-node focus">
          <h3>推論</h3>
          <p>モデル呼び出し</p>
        </div>
        <div class="agent-arrow">→</div>
        <div class="agent-node focus">
          <h3>判断と実行</h3>
          <p>外部処理の実行</p>
        </div>
        <div class="agent-arrow">→</div>
        <div class="agent-node skip">
          <h3>出力と記録</h3>
          <p>回答返却・ログ保存</p>
        </div>
      </div>
      <p class="agent-side-note">判断と実行 → 外部システム・データ</p>
      <p class="footnote">今回の講座重点: <strong>入口</strong>・<strong>推論</strong>・<strong>判断と実行</strong>。前処理と制御 / 出力と記録はテクニカルでエンジニア領域のため、本講座では省略します。</p>
    `,
  });
})();
