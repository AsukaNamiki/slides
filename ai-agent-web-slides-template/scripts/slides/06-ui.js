  (function () {
    window.SlideRegistry.register({
      id: 's06-ui',
      order: 22,
      className: 'slide message ui-detail',
      html: `
        <h2>入口：「使いやすさ」と「柔軟性」のトレードオフ</h2>
        <div class="spectrum">
          <div class="left">使いやすい</div>
          <div class="bar"><span></span></div>
          <div class="right">柔軟性が高い</div>
        </div>
        <div class="ui-matrix-wrap">
          <table class="ui-matrix" aria-label="提供企業とUI別の代表製品">
            <thead>
              <tr>
                <th>提供企業</th>
                <th>Web</th>
                <th>デスクトップ</th>
                <th>IDE</th>
                <th>CLI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Google系</th>
                <td>Gemini</td>
                <td>専用デスクトップAIアプリは現状なし</td>
                <td>Gemini Code Assist</td>
                <td>Gemini CLI</td>
              </tr>
              <tr>
                <th>OpenAI系</th>
                <td>ChatGPT<br />Codex Web</td>
                <td>ChatGPT Desktop<br />Codex App</td>
                <td>Codex（IDE連携）</td>
                <td>Codex CLI</td>
              </tr>
              <tr>
                <th>Anthropic系</th>
                <td>Claude</td>
                <td>Claude Desktop</td>
                <td>Claude Code（IDE連携）</td>
                <td>Claude Code</td>
              </tr>
              <tr>
                <th>その他</th>
                <td>Perplexity</td>
                <td>LM Studio</td>
                <td>Cursor<br />Cline</td>
                <td>Ollama<br />Aider</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="footnote">使っているモデルのWebアプリから、カスタマイズの高度化に合わせて右に寄せていくと良いです。</p>
      `,
    });
  })();
