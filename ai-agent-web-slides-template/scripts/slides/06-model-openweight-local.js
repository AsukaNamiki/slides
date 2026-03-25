(function () {
  window.SlideRegistry.register({
    id: 's06-model-openweight-local',
    order: 13,
    className: 'slide message',
    html: `
      <h2>推論モデルの選び方: 初期投資ができるなら、オープンウェイトをローカル運用</h2>
      <div class="goal-grid">
        <article>
          <h3>1. 向いているケース</h3>
          <ul class="goal-abc-list">
            <li>機密情報を外部クラウドに出したくない</li>
            <li>API従量課金を避けて使い倒したい</li>
            <li>GPU/サーバーの初期投資を許容できる</li>
            <li>サーバの運用ができる</li>
          </ul>
        </article>
        <article>
          <h3>2. ローカル実行可能なモデル(例)</h3>
          <ul class="goal-abc-list">
            <li>Qwen3 8B / 14B</li>
            <li>Gemma 3 4B / 12B</li>
            <li>Llama 3.1 8B Instruct</li>
            <li>DeepSeek-R1 Distill Qwen 7B / 14B</li>
          </ul>
        </article>
      </div>
      
        <h3>参考: NVIDIA DGX Spark</h3>
        <p>ローカルLLM向けの高性能デスクトップAI計算機。初期投資は80万円ほどかかりますが、社内環境で安全に無限に使い倒したい場合の選択肢です。計算機は高騰していますし、今の内に購入しておくと良いかもです。</p>
        <p><a href="https://www.nvidia.com/ja-jp/products/workstations/dgx-spark/" target="_blank" rel="noopener noreferrer">公式ページ: NVIDIA DGX Spark</a></p>
      
    `,
  });
})();
