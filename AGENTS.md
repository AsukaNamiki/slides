# プロジェクト設定

このプロジェクトは生成AI講義用のスライドとデモを含みます。

## Skills

### $blog-writer
ブログ記事作成スキル。Pexels APIで画像を取得し、Markdown形式のブログ記事を作成します。

テーマを指定すると、以下のフローで記事を生成します：
1. インターネットで関連情報を調査
2. Pexels APIで関連画像を検索・取得
3. 画像URLを埋め込んだMarkdown記事を生成
4. 指定されたディレクトリ（または現在のディレクトリ）にファイルを保存

使用例：
- 「$blog-writer AIエージェントについてブログ記事を書いて」
- 「ブログ記事を作成して。テーマは業務効率化。outputフォルダに保存して」

スキルファイル: .codex/skills/blog-writer/SKILL.md

### $blog-request
ブログ作成依頼メール対応スキル。Gmailを監視し、依頼メールを検知したら自動で記事を生成して返信下書きを作成します。

フロー：
1. Gmail検索 - 「ブログ作成依頼」メールを検索
2. メール解析 - 送信者・テーマを抽出
3. 記事生成 - blog-writerスキルでMarkdown記事作成
4. 下書き作成 - 記事を添付した返信下書きを作成
5. Slack通知 - 各ステップの進捗を通知

使用例：
- 「$blog-request 依頼メールを確認して対応して」
- 「ブログ依頼対応して」

必要な設定：
- GWS CLI認証（`gws auth login`）
- PEXELS_API_KEY, SLACK_WEBHOOK_URL 環境変数

スキルファイル: .codex/skills/blog-request-handler/SKILL.md
