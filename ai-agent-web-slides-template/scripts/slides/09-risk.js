(function () {
  window.SlideRegistry.register({
    id: 's09-risk',
    order: 32,
    className: 'slide message',
    html: `
      <h2>認識しておくべきリスク</h2>
      <p class="tool-flow-note">生成AIの活用が広がるほど、以下のリスクが顕在化します</p>

      <div class="risk-grid">
        <article class="risk-card">
          <span class="risk-icon">🎯</span>
          <h3>ハルシネーション</h3>
          <p>もっともらしいが事実と異なる回答を生成する。重要情報は必ず裏取りが必要。</p>
        </article>
        <article class="risk-card">
          <span class="risk-icon">🔓</span>
          <h3>情報漏えい</h3>
          <p>入力した機密データがモデル学習に使われる、または外部に流出するリスク。利用規約とデータポリシーの確認が必須。</p>
        </article>
        <article class="risk-card">
          <span class="risk-icon">⚖️</span>
          <h3>著作権・ライセンス</h3>
          <p>生成物が既存著作物と類似する可能性。商用利用時はライセンス条件の確認が必要。</p>
        </article>
        <article class="risk-card">
          <span class="risk-icon">🤖</span>
          <h3>エージェントの暴走</h3>
          <p>自律型エージェントが意図しない操作を実行。削除・送信・課金など破壊的操作の制御が重要。</p>
        </article>
        <article class="risk-card">
          <span class="risk-icon">🧩</span>
          <h3>サプライチェーン攻撃</h3>
          <p>悪意あるMCPサーバーやSkillを経由した攻撃。信頼できるソースのみ導入する。</p>
        </article>
        <article class="risk-card">
          <span class="risk-icon">👤</span>
          <h3>責任の所在</h3>
          <p>AIの出力に基づく判断の責任は誰が負うか。最終判断は人が担う原則を明確化する。</p>
        </article>
      </div>

      <p class="footnote">リスクを知った上で使うのと、知らずに使うのでは結果が大きく変わります。</p>
    `,
  });
})();
