(function () {
  window.SlideRegistry.register({
    id: 's08-level-beginner',
    order: 28,
    className: 'slide message',
    html: `
      <h2>初級でできること（具体例）</h2>
      <p class="tool-flow-note">Web / デスクトップアプリの標準機能だけで実施（APIキー発行なし）</p>
      <div class="example-grid">
        <article>
          <h3>会議後の整理</h3>
          <p>議事録の要約、ToDo抽出、フォロー文面作成</p>
          <p class="example-tool">例: ChatGPT / Gemini に会議メモを貼って要約</p>
        </article>
        <article>
          <h3>営業資料の準備</h3>
          <p>提案書の要点抽出、提案メール下書き、比較表作成</p>
          <p class="example-tool">例: Claude にPDFを読み込ませて要点整理</p>
        </article>
        <article>
          <h3>日報・週報作成</h3>
          <p>活動ログの要約、報告文の整形、見出し構成案</p>
          <p class="example-tool">例: ChatGPT / Gemini でメモから報告文を生成</p>
        </article>
        <article>
          <h3>情報収集・比較</h3>
          <p>複数記事の比較、論点整理、意思決定用の観点表</p>
          <p class="example-tool">例: Gemini Deep Research / Perplexity で網羅的に調査</p>
        </article>
        <article>
          <h3>顧客対応の下書き</h3>
          <p>問い合わせ返信案、FAQ候補、文体変換</p>
          <p class="example-tool">例: ChatGPT に過去回答を渡して返信案を生成</p>
        </article>
        <article>
          <h3>ファイル活用</h3>
          <p>PDF/Word/Excelを読み込み、要点整理やチェック観点抽出</p>
          <p class="example-tool">例: Claude Desktop にローカルファイルを読み込ませて分析</p>
        </article>
      </div>
      <p class="footnote">まずはここから。標準機能だけでも日常業務の多くを効率化できます。</p>
    `,
  });
})();
