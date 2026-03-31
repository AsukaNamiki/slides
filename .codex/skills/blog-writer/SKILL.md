---
name: blog-writer
description: >
  ブログ記事をMarkdown形式で作成する。Pexels APIで関連画像を取得し、
  画像URLを埋め込んだ記事を生成する。「ブログ記事作成」「$blog-writer」で呼び出す。
---

# ブログ記事作成スキル

## 目的

指定されたテーマでブログ記事をMarkdown形式で作成する。Pexels APIで関連画像を取得し、記事に埋め込む。

## フロー

1. テーマを受け取る
2. インターネットで関連情報を調査
3. Pexels APIで関連画像を検索・取得
4. 画像URLを埋め込んだMarkdown記事を生成
5. 指定されたディレクトリにファイルを保存

## 必要な環境変数

- `PEXELS_API_KEY` - 画像取得用

## 利用可能なスクリプト

### scripts/fetch_images.sh
```bash
./scripts/fetch_images.sh "検索キーワード" 3
```
Pexels APIで画像を検索し、URLを返す。

### scripts/save_article.sh
```bash
./scripts/save_article.sh "出力ディレクトリ" "ファイル名"
```
標準入力から記事を受け取り、ファイルに保存する。

## 記事の要件

- 800〜1200文字程度
- 見出し（##）を3つ以上使用
- 箇条書きを適宜使用
- 最後にまとめを入れる
- 取得した画像URLを適切な位置に挿入

## 出力形式

Markdown形式のファイル。ファイル名は `blog_YYYYMMDD_HHMMSS.md`

## トリガー例

- 「AIエージェントについてブログ記事を書いて」
- 「ブログ記事を作成して。テーマは業務効率化」
- 「$blog-writer リモートワークの生産性向上」
