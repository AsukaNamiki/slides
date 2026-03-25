(function () {
  window.SlideRegistry.register({
    id: 's08-level-intermediate',
    order: 31,
    className: 'slide message',
    html: `
      <h2>中級でできること（具体例）</h2>
      <p class="tool-flow-note">公式Skill / MCPサーバーを導入して業務フローを半自動化</p>
      <div class="example-grid">
        <article>
          <h3>会議メモ → 議事録配布</h3>
          <p>録音文字起こし → 要約/ToDo抽出Skill → Notionに議事録とタスク一覧を自動登録</p>
          <p class="example-tool">例: Codex notion-meeting-intelligence Skill</p>
        </article>
        <article>
          <h3>企画メモ → スライド初稿</h3>
          <p>箇条書き下書き → スライド生成Skill → 発表用スライドの初稿を自動作成</p>
          <p class="example-tool">例: Claude Agent Skill（pptx）/ Codex slides Skill</p>
        </article>
        <article>
          <h3>月次データ → レポート</h3>
          <p>CSV → 表計算Skill → 集計表とコメント付き報告案を自動生成</p>
          <p class="example-tool">例: Claude Agent Skill（xlsx）/ Codex spreadsheet Skill</p>
        </article>
        <article>
          <h3>下書き → 配布文書</h3>
          <p>メモ → 文書整形Skill → 体裁統一・見出し整理された配布用文書へ</p>
          <p class="example-tool">例: Claude Agent Skill（docx）</p>
        </article>
        <article>
          <h3>Slack通知の自動化</h3>
          <p>Slack MCP → 特定チャンネルへの定型投稿や情報収集をAIから実行</p>
          <p class="example-tool">例: Slack MCP Server をClaude Desktopに接続</p>
        </article>
        <article>
          <h3>会計処理の効率化</h3>
          <p>freee MCP → 仕訳候補の自動登録、経費データの取り込み</p>
          <p class="example-tool">例: freee-mcp をClaude Desktopに接続</p>
        </article>
      </div>
      <p class="footnote">独自開発なしでも、入力→処理→出力の一連作業をかなり短縮できます。</p>
    `,
  });
})();
