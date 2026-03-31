# 上級デモ構築計画

## 概要

Codex CLIスキル `$blog-request` を使用した自動化フロー。
Gmail監視 → ブログ記事生成 → Markdown添付の返信下書き作成 → Slack進捗通知

## フロー図

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  📧 Gmail検索                                                        │
│  └─ 件名に「ブログ作成依頼」を含む未読メールを検索                       │
│                          ↓                                          │
│  🔍 メール解析                                                        │
│  ├─ 送信者アドレス抽出                                                │
│  └─ 件名からテーマ抽出                                                │
│                          ↓                                          │
│  ✍️ 記事生成（blog-writerスキル）                                      │
│  ├─ テーマに基づいてブログ記事を生成                                    │
│  ├─ Pexels APIで関連画像URLを取得                                     │
│  └─ Markdown形式で出力                                               │
│                          ↓                                          │
│  📝 Gmail返信下書き作成（GWS CLI）                                     │
│  ├─ Markdownファイルを添付                                           │
│  └─ 返信下書きとして保存                                              │
│                          ↓                                          │
│  ✅ メールを既読にして完了                                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

        ↑ 各ステップでSlack通知 📢
```

## ファイル構成

```
.codex/skills/blog-request-handler/
├── SKILL.md                    # スキル定義
└── scripts/
    ├── search_gmail.sh         # Gmail検索
    ├── get_message.sh          # メッセージ詳細取得
    ├── mark_as_read.sh         # 既読処理
    ├── notify_slack.sh         # Slack通知
    └── send_draft.sh           # 下書き作成

demo/advanced/
├── PLAN.md                     # この計画書
├── README.md                   # 実行手順
├── config.env.example          # 環境変数テンプレート
└── output/                     # 生成物の保存先
```

## 実装タスク

- [x] PLAN.md 作成
- [x] config.env.example 作成
- [x] SKILL.md 作成
- [x] scripts/search_gmail.sh 作成
- [x] scripts/get_message.sh 作成
- [x] scripts/mark_as_read.sh 作成
- [x] scripts/notify_slack.sh 作成
- [x] scripts/send_draft.sh 作成
- [x] README.md 作成
