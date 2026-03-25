(function () {
  window.SlideRegistry.register({
    id: 's06-ui-desktop',
    order: 26,
    className: 'slide message',
    html: `
      <h2>デスクトップアプリ</h2>
      <div class="ui-detail-layout">
        <div class="ui-detail-info">
          <div class="focus-grid focus-grid-col1">
            <article>
              <h3>特徴</h3>
              <ul class="goal-abc-list">
                <li>PC上のファイルやアプリと直接連携できる</li>
                <li>ショートカットキーで即起動</li>
                <li>画面共有・スクリーンショット連携が簡単</li>
              </ul>
            </article>
            <article>
              <h3>利用シーン</h3>
              <ul class="goal-abc-list">
                <li>作業中にブラウザを切り替えず質問したいとき</li>
                <li>ローカルファイルを読み込ませて要約・分析するとき</li>
                <li>日常業務に生成AIを定着させたいとき</li>
              </ul>
            </article>
          </div>
          <div class="api-flow-targets" style="margin-top:14px;">
            <span class="api-target">ChatGPT Desktop</span>
            <span class="api-target">Claude Desktop</span>
            <span class="api-target">LM Studio</span>
          </div>
          <div class="ui-tool-compat">
            <span class="ui-tool-label">ツール連携:</span>
            <span class="ui-tool-no">API</span>
            <span class="ui-tool-no">CLI</span>
            <span class="ui-tool-no">Script</span>
            <span class="ui-tool-yes">MCP</span>
            <span class="ui-tool-partial">Skill（一部）</span>
          </div>
        </div>
        <div class="ui-detail-img">
          <img src="./assets/ui/desktop.png" alt="デスクトップアプリの画面例" />
        </div>
      </div>
      <p class="footnote">Webの次のステップ。ローカルPCでのファイル作業に向いています。</p>
    `,
  });
})();
