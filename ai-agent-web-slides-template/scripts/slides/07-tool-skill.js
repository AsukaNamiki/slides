(function () {
  window.SlideRegistry.register({
    id: 's07-tool-skill',
    order: 20,
    className: 'slide message',
    html: `
      <h2>Skill（再利用可能な手順パッケージ）とは</h2>
      <div class="focus-grid">
        <article>
          <h3>何者か</h3>
          <p>プロンプト・判断条件・ツール連携手順をまとめた再利用可能な業務パッケージです。</p>
        </article>
        <article>
          <h3>何ができるか</h3>
          <ul class="goal-abc-list">
            <li>同じ品質で業務を再実行</li>
            <li>チームへ手順を引き継ぐ</li>
            <li>ノウハウを資産化する</li>
          </ul>
        </article>
        <article>
          <h3>使う場面</h3>
          <p>業務フローが固まってきた段階で、運用を安定化させるために使います。</p>
        </article>
      </div>

      <div class="api-flow">
        <div class="api-flow-source">
          <h3>AIアプリ<br /><span>エージェント</span></h3>
        </div>
        <div class="api-flow-arrow">→</div>
        <div class="api-flow-hub">
          <h3>Skill</h3>
          <p>手順パッケージ</p>
        </div>
        <div class="api-flow-arrow">→</div>
        <div class="api-flow-targets">
          <span class="api-target">スライド作成（pptx）</span>
          <span class="api-target">表計算レポート（xlsx）</span>
          <span class="api-target">文書整形（docx）</span>
          <span class="api-target">PDF生成（pdf）</span>
          <span class="api-target">議事録整理（Notion連携）</span>
        </div>
      </div>

      <p class="footnote">Skillは「仕組み化の単位」。公式Skillを導入するだけでも業務フローを半自動化できます。</p>
    `,
  });
})();
