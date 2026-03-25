(function () {
  window.SlideRegistry.register({
    id: 's06-ui-web',
    order: 25,
    className: 'slide message',
    html: `
      <h2>Webアプリ</h2>
      <div class="ui-detail-layout">
        <div class="ui-detail-info">
          <div class="focus-grid focus-grid-col1">
            <article>
              <h3>特徴</h3>
              <ul class="goal-abc-list">
                <li>ブラウザだけで使える（インストール不要）</li>
                <li>アカウント登録ですぐ開始</li>
                <li>スマホ・タブレットからもアクセス可</li>
              </ul>
            </article>
            <article>
              <h3>利用シーン</h3>
              <ul class="goal-abc-list">
                <li>初めて生成AIを試すとき</li>
                <li>外出先・移動中にさっと質問したいとき</li>
              </ul>
            </article>
          </div>
          <div class="api-flow-targets" style="margin-top:14px;">
            <span class="api-target">ChatGPT</span>
            <span class="api-target">Gemini</span>
            <span class="api-target">Claude</span>
            <span class="api-target">Perplexity</span>
          </div>
          <div class="ui-tool-compat">
            <span class="ui-tool-label">ツール連携:</span>
            <span class="ui-tool-no">API</span>
            <span class="ui-tool-no">CLI</span>
            <span class="ui-tool-no">Script</span>
            <span class="ui-tool-no">MCP</span>
            <span class="ui-tool-partial">Skill（一部）</span>
          </div>
        </div>
        <div class="ui-detail-img">
          <img src="./assets/ui/web.png" alt="Webアプリの画面例" />
        </div>
      </div>
      <p class="footnote">最も手軽な入口。まずはここから始めるのがおすすめです。</p>
    `,
  });
})();
