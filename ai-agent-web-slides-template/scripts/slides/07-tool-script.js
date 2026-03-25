(function () {
  window.SlideRegistry.register({
    id: 's07-tool-script',
    order: 18,
    className: 'slide message',
    html: `
      <h2>Script（スクリプト）とは</h2>
      <div class="focus-grid">
        <article>
          <h3>何者か</h3>
          <p>API/CLIなどを順番に呼び出して、一連の作業を自動実行する手順書です。</p>
        </article>
        <article>
          <h3>何ができるか</h3>
          <ul class="goal-abc-list">
            <li>日次・週次処理を自動化</li>
            <li>複数ツールの処理を連結</li>
            <li>人的ミスを減らす</li>
          </ul>
        </article>
        <article>
          <h3>使う場面</h3>
          <p>「毎回同じ作業」を見つけたら、最初にScript化を検討します。</p>
        </article>
      </div>

      <div class="api-flow">
        <div class="api-flow-source">
          <h3>ユーザー<br /><span>/ スケジューラ</span></h3>
        </div>
        <div class="api-flow-arrow">→</div>
        <div class="api-flow-hub">
          <h3>Script</h3>
          <p>自動実行の手順書</p>
        </div>
        <div class="api-flow-arrow">→</div>
        <div class="api-flow-targets">
          <span class="api-target">API呼び出し</span>
          <span class="api-target">CLIコマンド実行</span>
          <span class="api-target">Pythonなどのコード処理</span>
          <span class="api-target">ファイル操作</span>
          <span class="api-target">データ変換・集計</span>
        </div>
      </div>

      <p class="footnote">Scriptは自動化の入口です。まず1業務・1手順から始めるのが安全です。</p>
    `,
  });
})();
