---
name: blog-request-handler
description: >
  Gmail Pub/Sub監視で特定送信者からのメールを検知し、LLMでブログ執筆依頼か判断。
  依頼であれば記事を生成し、返信下書きを作成、Slackに記事を添付して通知する。
  「$blog-request」「ブログ依頼対応」で呼び出す。
---

# ブログ作成依頼対応スキル

## 概要

特定送信者（namikia@cac.co.jp）からのメールをPub/Sub監視し、LLMでブログ執筆依頼かどうかを判断。依頼であれば記事を生成して返信下書きを作成する。

## アーキテクチャ

```
┌─────────────────────────────────────────────────────────────┐
│  watch_gmail.sh                                             │
│  └─ gws gmail +watch でPub/Sub監視                          │
│              ↓ 新着メール検知                                │
│  送信者フィルタ（namikia@cac.co.jp）                         │
│              ↓ 対象メールのみ                                │
│  process_email.sh（バックグラウンド起動）                     │
│  ├─ 1. メール本文取得                                       │
│  ├─ 2. LLM判断（ブログ依頼か？）                            │
│  ├─ 3. Slack通知「依頼検知」                                │
│  ├─ 4. Pexels APIで画像取得                                 │
│  ├─ 5. Codexで記事生成                                      │
│  ├─ 6. Slack通知 + ファイル添付                             │
│  ├─ 7. Gmail返信下書き作成                                  │
│  └─ 8. メールを既読に                                       │
└─────────────────────────────────────────────────────────────┘
```

## 環境変数

```bash
# 必須
GCP_PROJECT_ID=xxx           # Pub/Sub用
PEXELS_API_KEY=xxx           # 画像取得用
SLACK_WEBHOOK_URL=xxx        # 通知用

# オプション（ファイル添付用）
SLACK_BOT_TOKEN=xxx          # files:write スコープ必要
SLACK_CHANNEL_ID=xxx         # チャンネルID

# フィルタ
WATCH_SENDER=namikia@cac.co.jp  # 監視対象送信者
```

## 使用方法

### 監視開始
```bash
source demo/advanced/config.env
.codex/skills/blog-request-handler/scripts/watch_gmail.sh
```

### 手動テスト（単一メール処理）
```bash
source demo/advanced/config.env
.codex/skills/blog-request-handler/scripts/process_email.sh "MESSAGE_ID" "from@example.com" "件名"
```

## スクリプト一覧

| スクリプト | 説明 |
|-----------|------|
| `watch_gmail.sh` | Pub/Sub監視メインループ |
| `process_email.sh` | メール処理（バックグラウンド実行） |
| `search_gmail.sh` | Gmail検索 |
| `get_message.sh` | メッセージ詳細取得 |
| `notify_slack.sh` | Slack通知 |
| `upload_to_slack.sh` | Slackファイルアップロード |
| `send_draft.sh` | Gmail返信送信 |
| `mark_as_read.sh` | 既読処理 |

## 出力

生成された記事は `.codex/skills/blog-request-handler/output/` に保存されます。

## トリガー例

- 「$blog-request 監視開始して」
- 「ブログ依頼対応して」
- 「namikiaさんからのメールを監視して」
