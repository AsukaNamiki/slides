(function () {
  window.SlideRegistry.register({
    id: 's07-tool-mcp',
    order: 19,
    className: 'slide message',
    html: `
      <h2>MCP（Model Context Protocol）とは</h2>
      <div class="focus-grid">
        <article>
          <h3>何者か</h3>
          <p>AIから外部ツールを呼び出すための共通接続ルールです。</p>
        </article>
        <article>
          <h3>何ができるか</h3>
          <ul class="goal-abc-list">
            <li>接続方式を標準化する</li>
            <li>ツール追加時の実装を簡単にする</li>
            <li>AIエージェントの拡張をしやすくする</li>
          </ul>
        </article>
        <article>
          <h3>使う場面</h3>
          <p>使いたいサービスのMCPサーバーが公開されていれば、すぐに導入できます。</p>
        </article>
      </div>

      <div class="api-flow">
        <div class="api-flow-source">
          <h3>AIアプリ<br /><span>エージェント</span></h3>
        </div>
        <div class="api-flow-arrow">→</div>
        <div class="api-flow-hub">
          <h3>MCPサーバー</h3>
          <p>共通接続ルール</p>
        </div>
        <div class="api-flow-arrow">→</div>
        <div class="api-flow-targets">
          <span class="api-target">Slack</span>
          <span class="api-target">Notion</span>
          <span class="api-target">freee</span>
          <span class="api-target">Shopify</span>
        </div>
      </div>

      <p class="footnote">多くの企業が生成AI向けにMCPサーバーを公開しています。API同様に調べてみると、業務システムと簡単に連携できるかもしれません。</p>
    `,
  });
})();
