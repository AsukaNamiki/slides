(function () {
  window.SlideRegistry.register({
    id: 's03-demo-intro',
    order: 6.5,
    className: 'slide message',
    html: `
      <h2>デモ：ブログ記事作成の自動化</h2>
      <p class="tool-flow-note">同じ業務を「中級」と「上級」で実装するとどう変わるか</p>
      <div class="example-grid" style="grid-template-columns: 1fr 1fr;">
        <article>
          <h3>中級デモ</h3>
          <p>AIツール（Codex CLI）に指示して<br />ブログ記事を1コマンドで生成</p>
          <ul class="goal-abc-list" style="margin-top:12px;">
            <li>対話形式でテーマを指示</li>
            <li>画像取得 + 記事生成</li>
            <li>Markdownファイルを出力</li>
          </ul>
          <p class="example-tool">手動実行 → 結果を自分で確認</p>
        </article>
        <article>
          <h3>上級デモ</h3>
          <p>メール受信をトリガーに<br />記事生成〜通知まで全自動</p>
          <ul class="goal-abc-list" style="margin-top:12px;">
            <li>Gmail監視 → LLMが依頼内容を判断</li>
            <li>記事生成 → 返信下書き作成</li>
            <li>Google Tasks追加 → Slack通知</li>
          </ul>
          <p class="example-tool">自動実行 → 人は確認・送信だけ</p>
        </article>
      </div>
      <p class="footnote">中級は「1つのツールで効率化」、上級は「複数ツール連携で自動化」。</p>
    `,
  });
})();
