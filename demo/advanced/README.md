# 上級デモ：自動ブログ作成フロー

Codex CLIの `$blog-request` スキルを使った自動化デモ。

## 事前準備

### 1. GWS CLI認証
```bash
gws auth login
```

### 2. 環境変数設定
```bash
cp config.env.example config.env
source config.env
```

### 3. 必要なAPIキー
- `SLACK_WEBHOOK_URL` - Slack Incoming Webhook URL
- `PEXELS_API_KEY` - Pexels API Key（無料）

## 実行方法

Codex CLIで対話モードを起動し、スキルを呼び出す：

```bash
codex
> $blog-request 依頼メールを確認して対応して
```

## フロー

1. 📧 Gmail検索 - 「ブログ作成依頼」メールを検索
2. 🔍 メール解析 - 送信者・テーマを抽出
3. 📢 Slack通知 - 依頼検知を通知
4. ✍️ 記事生成 - blog-writerスキルでMarkdown記事作成
5. 📝 下書き作成 - 記事を添付した返信下書きを作成
6. ✅ 完了 - メールを既読にして終了

## テスト用メール

以下の形式でメールを送信してテスト：
- 件名: `ブログ作成依頼: AIエージェント活用`
- 本文: （任意）

## スキルファイル

`.codex/skills/blog-request-handler/`
