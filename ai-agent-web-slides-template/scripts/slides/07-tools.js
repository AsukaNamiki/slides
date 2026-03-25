(function () {
  window.SlideRegistry.register({
    id: 's07-tools',
    order: 17,
    className: 'slide message',
    html: `
      <h2>ツール連携の関係図（全体像）</h2>
      <p class="tool-flow-note">主経路: よくある実装パターン（厳密な包含関係ではない）</p>

      <div class="tool-flow-canvas" id="tool-flow-canvas">
        <!-- 主経路 -->
        <div class="tool-flow-main">
          <div class="tool-flow-node app" data-tf="app">
            <h3>AIアプリ<br /><span>エージェント</span></h3>
          </div>
          <div class="tool-flow-arrow">→</div>
          <div class="tool-flow-node skill" data-tf="skill">
            <h3>Skill</h3>
            <p>手順の再利用単位</p>
          </div>
          <div class="tool-flow-arrow">→</div>
          <div class="tool-flow-node mcp" data-tf="mcp">
            <h3>MCP</h3>
            <p>標準化された接続方式</p>
          </div>
          <div class="tool-flow-arrow">→</div>
          <div class="tool-flow-node exec" data-tf="exec">
            <h3>API / CLI</h3>
            <p>実処理の実行手段</p>
          </div>
          <div class="tool-flow-arrow">→</div>
          <div class="tool-flow-node external" data-tf="ext">
            <h3>外部システム</h3>
            <p>SaaS・社内DB・業務アプリ</p>
          </div>
        </div>

        <!-- Script ノード（API/CLI の真下） -->
        <div class="tool-flow-sub-row">
          <div class="tool-flow-sub-node" data-tf="script">
            <h3>Script</h3>
            <p>繰り返し処理の自動化</p>
          </div>
        </div>

        <!-- SVG 線（JS で座標計算） -->
        <svg class="tool-flow-svg" aria-hidden="true"></svg>
      </div>

      <div class="tool-flow-legend">
        <span class="tool-flow-legend-solid"></span> 主経路
        <span class="tool-flow-legend-dot"></span> 補助経路
      </div>

      <p class="footnote">Skill→MCP→API/CLI は実務で多い流れですが、固定の入れ子構造ではありません。</p>
    `,
  });

  /* --- 補助線を SVG で描画 (offset ベース) --- */
  function drawToolFlowLines() {
    var canvas = document.getElementById('tool-flow-canvas');
    if (!canvas) return;
    var svg = canvas.querySelector('.tool-flow-svg');
    if (!svg) return;

    var nodes = {};
    canvas.querySelectorAll('[data-tf]').forEach(function (el) {
      nodes[el.getAttribute('data-tf')] = el;
    });

    /* canvas 基準の offset 座標を再帰的に計算 */
    function posRelTo(el, ancestor) {
      var x = 0, y = 0, cur = el;
      while (cur && cur !== ancestor) {
        x += cur.offsetLeft;
        y += cur.offsetTop;
        cur = cur.offsetParent;
      }
      return { x: x, y: y };
    }

    function box(el) {
      var p = posRelTo(el, canvas);
      return {
        x: p.x,
        y: p.y,
        w: el.offsetWidth,
        h: el.offsetHeight,
        cx: p.x + el.offsetWidth / 2,
        cy: p.y + el.offsetHeight / 2,
        top: p.y,
        bottom: p.y + el.offsetHeight,
        left: p.x,
        right: p.x + el.offsetWidth
      };
    }

    svg.setAttribute('width', canvas.offsetWidth);
    svg.setAttribute('height', canvas.offsetHeight);
    svg.innerHTML = '';

    var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    var marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
    marker.setAttribute('id', 'ah-dot');
    marker.setAttribute('markerWidth', '8');
    marker.setAttribute('markerHeight', '6');
    marker.setAttribute('refX', '8');
    marker.setAttribute('refY', '3');
    marker.setAttribute('orient', 'auto');
    var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', '0 0, 8 3, 0 6');
    poly.setAttribute('fill', '#3f5a4d');
    poly.setAttribute('opacity', '0.6');
    marker.appendChild(poly);
    defs.appendChild(marker);
    svg.appendChild(defs);

    function makePath(d) {
      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', d);
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke', '#3f5a4d');
      p.setAttribute('stroke-opacity', '0.5');
      p.setAttribute('stroke-width', '2');
      p.setAttribute('stroke-dasharray', '6 4');
      p.setAttribute('marker-end', 'url(#ah-dot)');
      svg.appendChild(p);
    }

    var app    = box(nodes.app);
    var exec   = box(nodes.exec);
    var script = box(nodes.script);

    /* 補助線 1: AIアプリ(下端中央) → 下へ → Script(左端中央) */
    makePath(
      'M ' + app.cx + ' ' + app.bottom +
      ' L ' + app.cx + ' ' + script.cy +
      ' L ' + script.left + ' ' + script.cy
    );

    /* 補助線 2: Script(上端中央) → API/CLI(下端中央) L字 */
    var midY = exec.bottom + (script.top - exec.bottom) / 2;
    makePath(
      'M ' + script.cx + ' ' + script.top +
      ' L ' + script.cx + ' ' + midY +
      ' L ' + exec.cx + ' ' + midY +
      ' L ' + exec.cx + ' ' + exec.bottom
    );
  }

  function scheduleDrawLines() {
    if (typeof Reveal !== 'undefined' && Reveal.on) {
      Reveal.on('ready', function () { setTimeout(drawToolFlowLines, 150); });
      Reveal.on('slidechanged', function () { setTimeout(drawToolFlowLines, 100); });
      Reveal.on('resize', function () { setTimeout(drawToolFlowLines, 60); });
    } else {
      window.addEventListener('load', function () { setTimeout(drawToolFlowLines, 250); });
    }
    window.addEventListener('resize', function () { setTimeout(drawToolFlowLines, 60); });
  }
  scheduleDrawLines();
})();
