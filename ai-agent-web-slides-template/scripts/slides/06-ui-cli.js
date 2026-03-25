(function () {
  window.SlideRegistry.register({
    id: 's06-ui-cli',
    order: 28,
    className: 'slide message',
    html: `
      <h2>ターミナル / CLI</h2>
      <div class="ui-detail-layout">
        <div class="ui-detail-info">
          <div class="focus-grid focus-grid-col1">
            <article>
              <h3>特徴</h3>
              <ul class="goal-abc-list">
                <li>テキスト命令だけで操作（最も軽量）</li>
                <li>複数タスクの並行実行・無人実行が可能</li>
                <li>スクリプトやスケジューラとの組み合わせに強い</li>
              </ul>
            </article>
            <article>
              <h3>利用シーン</h3>
              <ul class="goal-abc-list">
                <li>夜間・定期の自動処理を回したいとき</li>
                <li>複数の作業を同時並行で進めたいとき</li>
                <li>サーバー上でGUIなしに実行したいとき</li>
              </ul>
            </article>
          </div>
          <div class="api-flow-targets" style="margin-top:14px;">
            <span class="api-target">Claude Code</span>
            <span class="api-target">Gemini CLI</span>
            <span class="api-target">Codex CLI</span>
            <span class="api-target">Aider</span>
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
          <img src="./assets/ui/cli.png" alt="CLIの画面例" />
        </div>
      </div>
      <p class="footnote">柔軟性が最も高い。並行化・無人実行まで狙うならこの選択肢です。</p>
    `,
  });
})();
