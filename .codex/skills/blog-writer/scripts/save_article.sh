#!/bin/bash
# 記事をファイルに保存するスクリプト
# 使用方法: echo "記事内容" | ./save_article.sh [出力ディレクトリ]

OUTPUT_DIR="${1:-.}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
OUTPUT_FILE="${OUTPUT_DIR}/blog_${TIMESTAMP}.md"

# 出力ディレクトリ作成
mkdir -p "$OUTPUT_DIR"

# 標準入力から記事を読み取って保存
cat > "$OUTPUT_FILE"

echo "Saved to: $OUTPUT_FILE"
