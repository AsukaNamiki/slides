(function () {
  window.SlideRegistry.register({
    id: 's05-models',
    order: 12,
    className: 'slide message model-chaos',
    html: `
      <h2>推論モデル選定の課題</h2>
      <p class="model-question">結局何を使えば良いの...？</p>
      <div class="model-chaos-stage">
        <div class="model-chaos-glow" aria-hidden="true"></div>
        <span class="model-chip" style="--x:15%; --y:18%; --r:-12deg;">Gemini</span>
        <span class="model-chip" style="--x:24%; --y:42%; --r:8deg;">Claude</span>
        <span class="model-chip" style="--x:36%; --y:16%; --r:-6deg;">Nemotron</span>
        <span class="model-chip" style="--x:50%; --y:32%; --r:11deg;">ChatGPT</span>
        <span class="model-chip" style="--x:63%; --y:18%; --r:-9deg;">Qwen</span>
        <span class="model-chip" style="--x:77%; --y:38%; --r:7deg;">DeepSeek</span>
        <span class="model-chip" style="--x:87%; --y:21%; --r:-11deg;">Llama</span>
        <span class="model-chip" style="--x:17%; --y:66%; --r:9deg;">Grok</span>
        <span class="model-chip" style="--x:33%; --y:58%; --r:-7deg;">Gemma</span>
        <span class="model-chip" style="--x:45%; --y:74%; --r:6deg;">Mistral</span>
        <span class="model-chip" style="--x:58%; --y:60%; --r:-8deg;">o3</span>
        <span class="model-chip" style="--x:70%; --y:70%; --r:13deg;">Sonnet</span>
        <span class="model-chip" style="--x:83%; --y:57%; --r:-10deg;">Mixtral</span>
        <span class="model-chip" style="--x:27%; --y:84%; --r:8deg;">Command R+</span>
        <span class="model-chip" style="--x:64%; --y:86%; --r:-6deg;">GPT-4.1</span>
        <span class="model-chip" style="--x:48%; --y:50%; --r:-4deg;">どれを選ぶ？</span>
      </div>
    `,
  });
})();
