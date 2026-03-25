(function () {
  window.SlideRegistry.register({
    id: 's07-tool-cli',
    order: 17,
    className: 'slide message',
    html: `
      <h2>CLI（Command Line Interface）とは</h2>
      <div class="focus-grid">
        <article>
          <h3>何者か</h3>
          <p>テキスト命令（コマンド）で処理を実行するツール。GUIなしで動く軽量な実行部品です。</p>
        </article>
        <article>
          <h3>何ができるか</h3>
          <ul class="goal-abc-list">
            <li>1コマンドで処理を即実行</li>
            <li>Scriptやスケジューラに組み込める</li>
            <li>操作ログが残り再現しやすい</li>
          </ul>
        </article>
        <article>
          <h3>使う場面</h3>
          <p>対話UIよりも速度と再現性を優先したいとき。自動化の部品として使います。</p>
        </article>
      </div>

      <div class="api-flow">
        <div class="api-flow-source">
          <h3>ユーザー<br /><span>/ Script</span></h3>
        </div>
        <div class="api-flow-arrow">→</div>
        <div class="api-flow-hub">
          <h3>CLI</h3>
          <p>コマンド実行</p>
        </div>
        <div class="api-flow-arrow">→</div>
        <div class="api-flow-targets">
          <span class="api-target">Google Workspace CLI</span>
          <span class="api-target">clasp（Google Apps Script）</span>
          <span class="api-target">Slack CLI</span>
          <span class="api-target">Shopify CLI</span>
          <span class="api-target">Salesforce CLI</span>
        </div>
      </div>

      <p class="footnote">CLI単体は「1回の実行部品」。繰り返しや定期実行はScriptやスケジューラと組み合わせます。</p>
    `,
  });
})();
