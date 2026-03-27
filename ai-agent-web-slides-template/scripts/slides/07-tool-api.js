(function () {
  window.SlideRegistry.register({
    id: 's07-tool-api',
    order: 16,
    className: 'slide message',
    html: `
      <h2>API（Application Programming Interface）とは</h2>
      <div class="focus-grid">
        <article>
          <h3>何者か</h3>
          <p>システム同士をつなぐ公式の受付窓口です。</p>
        </article>
        <article>
          <h3>何ができるか</h3>
          <ul class="goal-abc-list">
            <li>メールや予定を取得する</li>
            <li>表データを更新する</li>
            <li>顧客情報を登録する</li>
          </ul>
        </article>
        <article>
          <h3>使う場面</h3>
          <p>外部システムと連携したいときに有効です。</p>
        </article>
      </div>

      <div class="api-flow">
        <div class="api-flow-source">
          <h3>AIアプリ</h3>
        </div>
        <div class="api-flow-arrow">→</div>
        <div class="api-flow-hub">
          <h3>API</h3>
          <p>公式の受付窓口</p>
        </div>
        <div class="api-flow-arrow">→</div>
        <div class="api-flow-targets">
          <span class="api-target">Gmail / Sheets / Drive</span>
          <span class="api-target">Outlook / Teams / SharePoint</span>
          <span class="api-target">Slack</span>
          <span class="api-target">Notion</span>
          <span class="api-target">X（旧Twitter）</span>
          <span class="api-target">YouTube</span>
        </div>
      </div>

      <p class="footnote">意外と多くのサービスがAPIに対応しています。「この作業、自動化したいな」と思ったら、まずAPI対応を調べてみるのも手です。</p>
    `,
  });
})();
