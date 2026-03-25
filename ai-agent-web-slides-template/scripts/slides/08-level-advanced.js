(function () {
  window.SlideRegistry.register({
    id: 's08-level-advanced',
    order: 32,
    className: 'slide message',
    html: `
      <h2>上級でできること（具体例）</h2>
      <p class="tool-flow-note">複数API/CLI連携・ローカルLLM・自律型エージェント構築（専門家に相談）</p>
      <div class="example-grid">
        <article>
          <h3>SNS競合ウォッチの自動化</h3>
          <p>X/YouTube API → データ取得 → 要点抽出Script → 毎朝サマリーをSlackに自動配信</p>
          <p class="example-tool">例: X API + YouTube Data API + Python Script</p>
        </article>
        <article>
          <h3>領収書 → 会計登録</h3>
          <p>Gmail API → 領収書メール収集 → 内容抽出 → freee APIで仕訳候補を自動登録</p>
          <p class="example-tool">例: Gmail API + freee API + Python Script</p>
        </article>
        <article>
          <h3>社内DB連携の業務自動化</h3>
          <p>社内APIと複数CLIを組み合わせ、独自の業務フローを端から端まで自動化</p>
          <p class="example-tool">例: 社内REST API + Salesforce CLI + カスタムScript</p>
        </article>
        <article>
          <h3>ローカルLLMの社内運用</h3>
          <p>機密データを外部に出さず、社内サーバーでLLMを運用。GPU投資が必要</p>
          <p class="example-tool">例: Ollama + Qwen3 / Llama 3.1 + NVIDIA DGX Spark</p>
        </article>
        <article>
          <h3>自律型エージェントの構築</h3>
          <p>人の都度指示を減らし、判断→実行→報告を自走するエージェントを設計・運用</p>
          <p class="example-tool">例: Claude Code / Codex CLI でエージェント実装</p>
        </article>
        <article>
          <h3>複合ワークフローの統合</h3>
          <p>MCP + Script + 複数APIを組み合わせ、部門横断の業務プロセスを一気通貫で自動化</p>
          <p class="example-tool">例: 複数MCP Server + カスタムScript + 社内API群</p>
        </article>
      </div>
      <p class="footnote">この領域は設計・セキュリティ・運用の専門知識が必要です。専門家への相談を推奨します。</p>
    `,
  });
})();
