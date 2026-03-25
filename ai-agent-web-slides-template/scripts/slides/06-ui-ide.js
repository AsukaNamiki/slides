(function () {
  window.SlideRegistry.register({
    id: 's06-ui-ide',
    order: 25,
    className: 'slide message',
    html: `
      <h2>IDE（統合開発環境）</h2>
      <div class="ui-detail-layout">
        <div class="ui-detail-info">
          <div class="focus-grid focus-grid-col1">
            <article>
              <h3>特徴</h3>
              <ul class="goal-abc-list">
                <li>コード編集とAI支援が同じ画面で完結</li>
                <li>ファイル構造を理解した上で提案してくれる</li>
                <li>MCP/Skillとの連携がしやすい</li>
              </ul>
            </article>
            <article>
              <h3>利用シーン</h3>
              <ul class="goal-abc-list">
                <li>コードやスクリプトを書きながらAIに相談するとき</li>
                <li>プロジェクト全体を見渡した修正・生成をしたいとき</li>
                <li>ツール連携の設定や検証をするとき</li>
              </ul>
            </article>
          </div>
          <div class="api-flow-targets" style="margin-top:14px;">
            <span class="api-target">Cursor</span>
            <span class="api-target">Kiro</span>
            <span class="api-target">Cline</span>
            <span class="api-target">Gemini Code Assist</span>
          </div>
          <div class="ui-tool-compat">
            <span class="ui-tool-label">ツール連携:</span>
            <span class="ui-tool-yes">API</span>
            <span class="ui-tool-yes">CLI</span>
            <span class="ui-tool-yes">Script</span>
            <span class="ui-tool-yes">MCP</span>
            <span class="ui-tool-yes">Skill</span>
          </div>
        </div>
        <div class="ui-detail-img">
          <img src="./assets/ui/ide.png" alt="IDEの画面例" />
        </div>
      </div>
      <p class="footnote">開発者・自動化担当者向け。ツール連携の構築に最も適しています。</p>
    `,
  });
})();
