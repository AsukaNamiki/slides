(function () {
  window.SlideRegistry.register({
    id: 's09-caution',
    order: 35,
    className: 'slide message caution',
    html: `
      <h2>注意喚起: 便利さの裏で「事故」は実際に起きている</h2>

      <div class="caution-cases">
        <article class="caution-card">
          <div class="caution-card-header">
            <span class="caution-badge danger">暴走</span>
            <span class="caution-date">2026-02</span>
          </div>
          <h3>OpenClaw メール大量削除</h3>
          <p>メール整理を依頼したエージェントが停止指示を無視し、メールを大量削除。</p>
          <p class="caution-lesson">教訓: 破壊的操作（削除・送信・更新）は常時自動実行にしない</p>
          <a class="caution-link" href="https://techcrunch.com/2026/02/23/a-meta-ai-security-researcher-said-an-openclaw-agent-ran-amok-on-her-inbox/" target="_blank" rel="noopener noreferrer">TechCrunch 報道</a>
        </article>
        <article class="caution-card">
          <div class="caution-card-header">
            <span class="caution-badge leak">漏えい</span>
            <span class="caution-date">2025</span>
          </div>
          <h3>MCP経由の情報漏えい</h3>
          <p>悪意あるMCPサーバーや外部入力を経由し、エージェントが私的データを漏えいするフローが研究者により再現。</p>
          <p class="caution-lesson">教訓: 信頼できるMCPだけ接続・最小権限・外部入力の検疫</p>
          <a class="caution-link" href="https://invariantlabs.ai/blog/mcp-github-vulnerability" target="_blank" rel="noopener noreferrer">Invariant Labs 実証1</a>
          <a class="caution-link" href="https://invariantlabs.ai/blog/whatsapp-mcp-exploited" target="_blank" rel="noopener noreferrer">Invariant Labs 実証2</a>
        </article>
        <article class="caution-card">
          <div class="caution-card-header">
            <span class="caution-badge malware">悪性配布</span>
            <span class="caution-date">2026-02</span>
          </div>
          <h3>ClawHub 悪性スキル配布</h3>
          <p>人気スキルに見せかけたマルウェア配布が確認。VirusTotal分析で悪性挙動を多数検出。</p>
          <p class="caution-lesson">教訓: 人気順で信頼しない・実行前に検証・業務端末に直入れしない</p>
          <a class="caution-link" href="https://blog.virustotal.com/2026/02/from-automation-to-infection-how.html" target="_blank" rel="noopener noreferrer">VirusTotal 分析</a>
          <a class="caution-link" href="https://1password.com/blog/from-magic-to-malware-how-openclaws-agent-skills-become-an-attack-surface" target="_blank" rel="noopener noreferrer">1Password 事例報告</a>
        </article>
      </div>

      <div class="caution-rules">
        <h3>導入時の注意事項</h3>
        <div class="caution-rule-tags">
          <span class="caution-rule-tag">削除・送信・課金は人の承認を必須化</span>
          <span class="caution-rule-tag">機密データの取り扱いルールを明確化</span>
          <span class="caution-rule-tag">重要情報は必ず裏取り</span>
          <span class="caution-rule-tag">利用禁止範囲を明文化</span>
          <span class="caution-rule-tag">信頼済み連携のみ導入</span>
        </div>
      </div>
    `,
  });
})();
