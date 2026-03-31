# デモ：ブログ作成フロー

講義で使用するデモの準備資料です。

## 概要

「ブログ作成依頼 → 記事作成」のフローを中級・上級で実演します。

| レベル | 内容 | ツール |
|--------|------|--------|
| 中級 | 手動でCodex CLI実行 → Markdown生成 | Codex CLI |
| 上級 | Gmail監視 → 自動生成 → Docs作成 → Slack通知 | GWS CLI, Codex CLI, Pexels API, Slack |

## ディレクトリ構成

```
demo/
├── README.md           # この説明ファイル
├── intermediate/       # 中級デモ
│   ├── run.sh          # デモ実行スクリプト
│   └── output/         # 生成されたMarkdownの出力先
└── advanced/           # 上級デモ
    ├── run.sh          # デモ実行スクリプト
    ├── config.env      # 環境変数設定
    └── output/         # 生成されたファイルの出力先
```

## 事前準備

### 中級デモ
1. Codex CLIをインストール
   ```bash
   npm install -g @openai/codex
   ```

### 上級デモ
1. GWS CLIをインストール・認証設定
2. Slack Webhook URLを取得
3. Pexels API Keyを取得
4. `advanced/config.env` に設定を記入
