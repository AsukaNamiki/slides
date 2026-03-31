# 上級デモ セットアップガイド

## 必要なもの

- [ ] GWS CLI（Gmail/Docs操作用）
- [ ] Pexels APIキー（画像取得用）
- [ ] Slack Webhook URL（通知用）
- [ ] Codex CLI（記事生成用）

---

## 1. GWS CLI セットアップ

### 1.1 インストール

```bash
npm install -g @anthropic/gws-cli
```

または npx で直接実行：
```bash
npx @anthropic/gws-cli auth login
```

### 1.2 GCPプロジェクト作成（初回のみ）

1. https://console.cloud.google.com/ にアクセス
2. 「プロジェクトを作成」をクリック
3. プロジェクト名を入力（例: `blog-automation-demo`）
4. 「作成」をクリック

### 1.3 APIを有効化

GCPコンソールで以下のAPIを有効化：

1. 「APIとサービス」→「ライブラリ」
2. 以下を検索して有効化：
   - Gmail API
   - Google Docs API

または gcloud CLI で：
```bash
gcloud services enable gmail.googleapis.com
gcloud services enable docs.googleapis.com
```

### 1.4 OAuth認証

```bash
gws auth login
```

ブラウザが開くので、Googleアカウントでログイン。
以下の権限を許可：
- Gmailの読み取り・送信
- Google Docsの作成・編集

### 1.5 動作確認

```bash
# プロフィール取得
gws gmail users getProfile --params '{"userId": "me"}'

# メール検索テスト
gws gmail users messages list --params '{"userId": "me", "q": "is:unread", "maxResults": 5}'
```

---

## 2. Pexels API セットアップ

### 2.1 APIキー取得

1. https://www.pexels.com/api/ にアクセス
2. 「Get Started」をクリック
3. アカウント作成（無料）
4. APIキーをコピー

### 2.2 環境変数に設定

```bash
export PEXELS_API_KEY="your_api_key_here"
```

### 2.3 動作確認

```bash
curl -s "https://api.pexels.com/v1/search?query=technology&per_page=1" \
  -H "Authorization: $PEXELS_API_KEY" | jq '.photos[0].src.large'
```

---

## 3. Slack Webhook セットアップ

### 3.1 Slack Appを作成

1. https://api.slack.com/apps にアクセス
2. 「Create New App」→「From scratch」
3. App名を入力（例: `Blog Automation`）
4. ワークスペースを選択
5. 「Create App」

### 3.2 Incoming Webhookを有効化

1. 左メニュー「Incoming Webhooks」
2. 「Activate Incoming Webhooks」をON
3. 「Add New Webhook to Workspace」
4. 通知先チャンネルを選択（例: `#blog-automation`）
5. 「許可する」
6. Webhook URLをコピー

### 3.3 環境変数に設定

```bash
export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/xxx/yyy/zzz"
```

### 3.4 動作確認

```bash
curl -X POST "$SLACK_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"text": "🧪 テスト通知です"}'
```

Slackに通知が届けばOK。

---

## 4. Codex CLI セットアップ

### 4.1 インストール

```bash
npm install -g @openai/codex
```

### 4.2 APIキー設定

```bash
export OPENAI_API_KEY="your_openai_api_key"
```

### 4.3 動作確認

```bash
codex "Hello, world!"
```

---

## 5. 環境変数をまとめて設定

### 5.1 config.env を作成

```bash
cd demo/advanced
cp config.env.example config.env
```

### 5.2 config.env を編集

```bash
# Slack Webhook URL
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz

# Pexels API Key
PEXELS_API_KEY=your_pexels_api_key_here

# Gmail検索クエリ
GMAIL_QUERY="subject:ブログ作成依頼 is:unread"
```

### 5.3 環境変数を読み込み

```bash
source config.env
```

---

## 6. テスト実行

### 6.1 テスト用メールを送信

自分宛に以下のメールを送信：
- 件名: `ブログ作成依頼: AIエージェント活用`
- 本文: （任意）

### 6.2 スキルを実行

```bash
codex
> $blog-request 依頼メールを確認して対応して
```

### 6.3 確認ポイント

- [ ] Slackに通知が届く
- [ ] Markdownファイルが生成される
- [ ] Gmailに返信下書きが作成される
- [ ] 元のメールが既読になる

---

## トラブルシューティング

### GWS CLI認証エラー

```bash
# 再認証
gws auth logout
gws auth login
```

### Pexels API 401エラー

APIキーが正しく設定されているか確認：
```bash
echo $PEXELS_API_KEY
```

### Slack通知が届かない

Webhook URLが正しいか確認：
```bash
echo $SLACK_WEBHOOK_URL
```

### Codexがスキルを認識しない

スキルフォルダの場所を確認：
```bash
ls -la .codex/skills/
```

SKILL.mdのYAML front matterが正しいか確認。
