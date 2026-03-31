# デモ進行台本：中級→上級 通しシナリオ

## 概要

同じ「ブログ記事作成」という業務を、中級・上級それぞれのレベルで実装。
段階的に自動化が進む様子を実演します。

---

## 事前準備

### 環境確認
```bash
# Codex CLIが使えることを確認
codex --version

# GWS CLIが認証済みか確認
gws auth status

# 環境変数を読み込み
source demo/advanced/config.env
```

### 画面構成
- ターミナル（メイン）
- Slack（#blog-automation チャンネル）
- Gmail（下書きフォルダを開いておく）
- VSCode（生成されたMarkdownを表示用）

---

## 導入トーク（1分）

「では実際に、中級と上級の違いを見てみましょう。
同じ『ブログ記事作成』という業務を、それぞれのレベルで実装するとどうなるか。」

---

## 中級デモ：Codex CLI でブログ記事生成（3分）

### 説明
「中級は、単一のAIツールを使って業務を効率化します。
Codex CLIを使って、ブログ記事をMarkdownで生成してみます。」

### 実行手順

1. **スキルの説明**
```bash
# blog-writerスキルの内容を見せる
cat .codex/skills/blog-writer/SKILL.md
```

「このスキルは、テーマを指定するとPexels APIで画像を取得し、
Markdown形式のブログ記事を生成します。」

2. **記事生成を実行**
```bash
# Codex CLIで記事生成
echo "AIエージェントの活用方法についてブログ記事を書いて。demo/intermediate/outputに保存して。" | codex exec
```

3. **生成結果を確認**
```bash
# 生成されたファイルを確認
ls -la demo/intermediate/output/

# 内容をプレビュー
cat demo/intermediate/output/blog_*.md | head -50
```

### ポイント
- 「このように、1つのコマンドで記事が生成されました」
- 「画像URLも自動で埋め込まれています」
- 「これが中級レベル。AIツールを使って1つのタスクを効率化」

### 課題提起
- 「ただし、これは手動で実行する必要があります」
- 「依頼メールが来たら、自分で気づいて、自分でコマンドを打つ」
- 「これを自動化したのが上級です」

---

## 上級デモ：Gmail監視→自動記事生成→下書き作成（5分）

### 説明
「上級は、複数のツールを連携させて、フロー全体を半自動化します。
メールが来たら自動で検知し、記事を生成し、返信下書きまで作成します。」

### アーキテクチャ説明
```
Gmail受信 → Pub/Sub通知 → LLM判断 → 記事生成 → 下書き作成 → Slack通知
    ↓           ↓           ↓          ↓           ↓           ↓
  トリガー    検知      ブログ依頼？   Codex CLI   Gmail API   完了報告
```

### 実行手順

1. **監視スクリプトを起動**
```bash
source demo/advanced/config.env
export SLACK_WEBHOOK_URL PEXELS_API_KEY SLACK_BOT_TOKEN SLACK_CHANNEL_ID AI_PROCESSED_LABEL_ID OUTPUT_DIR GCP_PROJECT_ID WATCH_SENDER

bash .codex/skills/blog-request-handler/scripts/watch_gmail.sh
```

「Gmail Pub/Sub監視を開始しました。特定の送信者からのメールを監視しています。」

2. **テストメールを送信**（別の端末またはスマホから）

件名: `ブログ作成依頼：リモートワークの生産性向上について`
本文: `お疲れ様です。リモートワークの生産性向上についてブログ記事を作成してください。`

「では、テストメールを送ってみます。」

3. **自動処理の様子を観察**

ターミナルに表示されるログを見せながら：
- 📬「Pub/Sub通知受信」→「メールが来たことを検知」
- 🔍「新着メール検索」→「対象のメールを特定」
- 🏷️「ラベル付与」→「処理済みマークを付ける」
- 🤖「LLM判断」→「ブログ依頼かどうかAIが判断」
- 🚀「記事生成開始」→「Codex CLIで記事を生成」
- ✅「記事生成完了」→「Markdownファイルが完成」
- 📝「下書き作成」→「Gmailに返信下書きを作成」
- 📎「Slack通知」→「完了報告をSlackに送信」

4. **結果を確認**

```bash
# 生成された記事を確認
ls -la demo/advanced/output/
cat demo/advanced/output/blog_*.md | head -30
```

「Gmailの下書きフォルダを見てみましょう。」
→ 返信下書きが作成されていることを確認

「Slackにも完了通知が来ています。」
→ ファイル添付付きの通知を確認

### ポイント
- 「メールが来たら自動でフローが動きます」
- 「LLMがブログ依頼かどうかを判断するので、関係ないメールはスキップ」
- 「人は最後の確認・送信だけ」
- 「進捗がSlackに流れるので、何が起きているか把握できる」

---

## 比較まとめ（1分）

| 項目 | 中級 | 上級 |
|------|------|------|
| 実行方法 | 手動でコマンド実行 | メール受信で自動起動 |
| 使用ツール | Codex CLI | Gmail + Pub/Sub + Codex CLI + Slack |
| 判断 | 人が依頼を確認 | LLMが自動判断 |
| 出力 | ローカルファイル | Gmail下書き + Slack通知 |
| 人の作業 | コマンド実行 + 確認 + 送信 | 確認 + 送信のみ |

「中級と上級の違い、イメージできましたか？

中級は『AIツールを使って作業を効率化』
上級は『複数ツールを連携させてフローを自動化』

まずは中級から始めて、慣れてきたら上級に挑戦してみてください。」

---

## トラブルシューティング

### Pub/Subが反応しない場合
```bash
# Gmail watchを再設定
gws gmail users watch --params '{"userId": "me"}' \
  --json '{"topicName": "projects/my-gws-demo/topics/gws-gmail-watch-main", "labelIds": ["INBOX"]}'
```

### 同じメールが何度も処理される場合
- AI-Processedラベルが正しく付与されているか確認
- 検索クエリに `-label:AI-Processed` が含まれているか確認

### 下書きが作成されない場合
```bash
# 単体テスト
source demo/advanced/config.env
export SLACK_WEBHOOK_URL PEXELS_API_KEY SLACK_BOT_TOKEN SLACK_CHANNEL_ID AI_PROCESSED_LABEL_ID OUTPUT_DIR
bash .codex/skills/blog-request-handler/scripts/process_email.sh "MESSAGE_ID" "sender@example.com" "テスト件名"
```

---

## 片付け

```bash
# 監視を停止（Ctrl+C）

# テスト用の下書きを削除（必要に応じて）
# Gmailの下書きフォルダから手動で削除

# 出力ファイルをクリア（必要に応じて）
rm -f demo/advanced/output/blog_*.md
rm -f demo/advanced/output/process_*.log
```
