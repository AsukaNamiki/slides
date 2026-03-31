---
name: ブログ記事作成
description: Pexels APIで画像を取得し、Markdown形式のブログ記事を作成します
---

# ブログ記事作成スキル

ユーザーからテーマを受け取り、画像付きのブログ記事をMarkdownファイルとして作成します。

## 記事作成フロー

1. ユーザーからテーマを受け取る
2. Pexels APIで関連画像を取得（2〜3枚）
3. 画像URLを埋め込んだMarkdown記事を生成
4. `demo/intermediate/output/`ディレクトリにファイルを保存

## 画像取得

記事には必ず画像を挿入してください。Pexels APIを使用します。

### 画像取得コマンド
```bash
curl -s "https://api.pexels.com/v1/search?query=検索キーワード&per_page=3" \
  -H "Authorization: $PEXELS_API_KEY"
```

環境変数`PEXELS_API_KEY`が設定されていない場合は、以下のサンプル画像を使用：
- https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600
- https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600

### 画像の挿入位置
- アイキャッチ画像：タイトル直後に1枚
- 本文中：各セクションに関連する画像を適宜

### 画像のMarkdown形式
```markdown
![画像の説明](画像URL)
*画像: Pexelsより*
```

## 記事の構成

- タイトル（# 見出し）
- アイキャッチ画像
- 導入文（100〜150文字）
- 本文（3〜4セクション、## 見出し）
- 各セクションに適宜画像を挿入
- まとめ（## まとめ）
- 全体で800〜1200文字程度

## 文体

- ですます調
- 専門用語は簡潔に説明
- 箇条書きを適度に使用

## 出力

生成した記事は `demo/intermediate/output/blog_YYYYMMDD_HHMMSS.md` として保存してください。
ファイル名の日時部分は実行時の日時を使用します。
