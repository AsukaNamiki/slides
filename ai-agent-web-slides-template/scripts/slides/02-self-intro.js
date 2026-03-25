(function () {
  window.SlideRegistry.register({
    id: 's02-self-intro',
    order: 7,
    className: 'slide self-intro',
    html: `
      <h2>自己紹介: 並木 飛鳥（Asuka Namiki）</h2>
      <div class="intro-layout">
        <div class="intro-visual">
          <div class="intro-portrait">
            <div class="pulse-ring ring-a"></div>
            <div class="pulse-ring ring-b"></div>
            <img class="intro-photo" src="./profile.png" alt="並木 飛鳥のプロフィール写真" />
          </div>
        </div>
        <div class="intro-profile">
          <div class="intro-panels" data-component="intro-panels"></div>
          <p class="intro-linkline" data-component="intro-reference"></p>
        </div>
      </div>
    `,
  });
})();
