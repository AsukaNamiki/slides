(function () {
  window.SlideComponents = window.SlideComponents || {};

  /**
   * ツール紹介カード（API/CLI/Script/MCP/Skill共通）
   * @param {object} opts
   * @param {string} opts.title - h2タイトル
   * @param {object} opts.what - {label, text} 何者か
   * @param {object} opts.can - {label, items[]} 何ができるか
   * @param {object} opts.when - {label, text} 使う場面
   * @param {object} opts.flow - {source, hub, targets[]}
   * @param {string} opts.footnote
   */
  function toolSlide(opts) {
    var items = (opts.can.items || []).map(function (t) {
      return '<li>' + t + '</li>';
    }).join('\n                ');

    var targets = (opts.flow.targets || []).map(function (t) {
      return '<span class="api-target">' + t + '</span>';
    }).join('\n          ');

    return '\n      <h2>' + opts.title + '</h2>\n'
      + '      <div class="focus-grid">\n'
      + '        <article>\n'
      + '          <h3>' + opts.what.label + '</h3>\n'
      + '          <p>' + opts.what.text + '</p>\n'
      + '        </article>\n'
      + '        <article>\n'
      + '          <h3>' + opts.can.label + '</h3>\n'
      + '          <ul class="goal-abc-list">\n'
      + '                ' + items + '\n'
      + '          </ul>\n'
      + '        </article>\n'
      + '        <article>\n'
      + '          <h3>' + opts.when.label + '</h3>\n'
      + '          <p>' + opts.when.text + '</p>\n'
      + '        </article>\n'
      + '      </div>\n\n'
      + '      <div class="api-flow">\n'
      + '        <div class="api-flow-source">\n'
      + '          <h3>' + opts.flow.source + '</h3>\n'
      + '        </div>\n'
      + '        <div class="api-flow-arrow">→</div>\n'
      + '        <div class="api-flow-hub">\n'
      + '          <h3>' + opts.flow.hub.title + '</h3>\n'
      + '          <p>' + opts.flow.hub.desc + '</p>\n'
      + '        </div>\n'
      + '        <div class="api-flow-arrow">→</div>\n'
      + '        <div class="api-flow-targets">\n'
      + '          ' + targets + '\n'
      + '        </div>\n'
      + '      </div>\n\n'
      + '      <p class="footnote">' + opts.footnote + '</p>\n    ';
  }

  /**
   * UI詳細カード（Web/Desktop/IDE/CLI共通）
   * @param {object} opts
   * @param {string} opts.title - h2タイトル
   * @param {string} [opts.intro] - 補足説明（CLIなど）
   * @param {object} opts.features - {label, items[]}
   * @param {object} opts.scenes - {label, items[]}
   * @param {string[]} opts.products - 代表製品
   * @param {object[]} opts.tools - [{name, status}] status: yes/no/partial
   * @param {string} opts.image - 画像パス
   * @param {string} opts.imageAlt
   * @param {string} opts.footnote
   */
  function uiDetailSlide(opts) {
    var introHtml = opts.intro
      ? '      <p class="ui-intro">' + opts.intro + '</p>\n' : '';

    var featureItems = (opts.features.items || []).map(function (t) {
      return '<li>' + t + '</li>';
    }).join('\n                ');

    var sceneItems = (opts.scenes.items || []).map(function (t) {
      return '<li>' + t + '</li>';
    }).join('\n                ');

    var products = (opts.products || []).map(function (t) {
      return '<span class="api-target">' + t + '</span>';
    }).join('\n            ');

    var tools = (opts.tools || []).map(function (t) {
      return '<span class="ui-tool-' + t.status + '">' + t.name + '</span>';
    }).join('\n            ');

    return '\n      <h2>' + opts.title + '</h2>\n'
      + introHtml
      + '      <div class="ui-detail-layout">\n'
      + '        <div class="ui-detail-info">\n'
      + '          <div class="focus-grid focus-grid-col1">\n'
      + '            <article>\n'
      + '              <h3>' + opts.features.label + '</h3>\n'
      + '              <ul class="goal-abc-list">\n'
      + '                ' + featureItems + '\n'
      + '              </ul>\n'
      + '            </article>\n'
      + '            <article>\n'
      + '              <h3>' + opts.scenes.label + '</h3>\n'
      + '              <ul class="goal-abc-list">\n'
      + '                ' + sceneItems + '\n'
      + '              </ul>\n'
      + '            </article>\n'
      + '          </div>\n'
      + '          <div class="api-flow-targets" style="margin-top:14px;">\n'
      + '            ' + products + '\n'
      + '          </div>\n'
      + '          <div class="ui-tool-compat">\n'
      + '            <span class="ui-tool-label">ツール連携:</span>\n'
      + '            ' + tools + '\n'
      + '          </div>\n'
      + '        </div>\n'
      + '        <div class="ui-detail-img">\n'
      + '          <img src="' + opts.image + '" alt="' + opts.imageAlt + '" />\n'
      + '        </div>\n'
      + '      </div>\n'
      + '      <p class="footnote">' + opts.footnote + '</p>\n    ';
  }

  /**
   * レベル別具体例カード
   * @param {object} opts
   * @param {string} opts.title
   * @param {string} opts.subtitle
   * @param {object[]} opts.examples - [{title, desc, tool}]
   * @param {string} opts.footnote
   */
  function levelExampleSlide(opts) {
    var cards = (opts.examples || []).map(function (ex) {
      return '        <article>\n'
        + '          <h3>' + ex.title + '</h3>\n'
        + '          <p>' + ex.desc + '</p>\n'
        + '          <p class="example-tool">' + ex.tool + '</p>\n'
        + '        </article>';
    }).join('\n');

    return '\n      <h2>' + opts.title + '</h2>\n'
      + '      <p class="tool-flow-note">' + opts.subtitle + '</p>\n'
      + '      <div class="example-grid">\n'
      + cards + '\n'
      + '      </div>\n'
      + '      <p class="footnote">' + opts.footnote + '</p>\n    ';
  }

  window.SlideComponents.toolSlide = toolSlide;
  window.SlideComponents.uiDetailSlide = uiDetailSlide;
  window.SlideComponents.levelExampleSlide = levelExampleSlide;
})();
