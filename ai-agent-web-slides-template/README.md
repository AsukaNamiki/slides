# AI Agent Web Slides Template (16:9)

静的ホスティング前提で使える、`16:9` 固定のプレゼン用Webテンプレートです。

## 構成

- `index.html`: スライド枠 + スクリプト読み込み
- `theme.css`: デザイン設定（色・文字サイズ）
- `styles.css`: レイアウト実装（`theme.css` 変数を参照）
- `settings.js`: Reveal設定とエフェクト設定
- `scripts/main.js`: 初期化エントリーポイント
- `scripts/core/revealInit.js`: Reveal初期化
- `scripts/effects/leafFallEffect.js`: 1枚目リーフエフェクト
- `scripts/components/introComponents.js`: 再利用コンポーネント描画
- `scripts/data/introProfileData.js`: 自己紹介データ
- `scripts/slides/registry.js`: スライド登録レジストリ
- `scripts/slides/*.js`: 1ファイル1スライド定義

## 使い方

1. ローカル起動

```bash
cd /Users/asuka/雑務/ai-agent-web-slides-template
python3 -m http.server 8080
```

2. ブラウザで開く

- `http://localhost:8080`

3. 操作

- 次へ: `→` / `Space` / クリック
- 前へ: `←`
- 直接移動: URLハッシュ（例 `#/4`）

## 編集ポイント

- スライド追加:
  - `scripts/slides/11-xxxx.js` のように1ファイル作成
  - `window.SlideRegistry.register({ id, order, className, html })` を定義
  - `index.html` の `<script src=\"./scripts/slides/...\">` を1行追加
- 文字サイズ統一: `theme.css` の `--font-size-heading / --font-size-body / --font-size-note`
- 配色変更: `theme.css` の `--primary` など
- 比率設定: `settings.js` の `reveal.width / reveal.height`
- 1枚目エフェクト: `settings.js` の `heroLeafEffect`
- 自己紹介カード文言: `scripts/data/introProfileData.js` を更新
- 追加コンポーネント: `scripts/components/` に追加して `scripts/main.js` から呼び出す

## デザインルール（推奨）

- 1スライド1メッセージ
- 文字より図を優先（画面の60%以上を図解）
- 強調色は1スライド1箇所まで
- 重要語だけを太字またはハイライト

## 静的ホスティング

`index.html` / `theme.css` / `styles.css` / `settings.js` / `scripts/` をそのままアップロードすれば公開できます（ビルド不要）。

- GitHub Pages
- Cloudflare Pages
- Netlify
