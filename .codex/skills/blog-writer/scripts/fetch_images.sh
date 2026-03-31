#!/bin/bash
# Pexels APIから画像を取得するスクリプト
# 使用方法: ./fetch_images.sh "検索キーワード" [取得枚数]

QUERY="${1:-AI}"
COUNT="${2:-3}"

if [ -z "$PEXELS_API_KEY" ]; then
  echo "Error: PEXELS_API_KEY environment variable is not set" >&2
  echo "Using sample images instead..." >&2
  echo "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600"
  echo "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=600"
  exit 0
fi

# URLエンコード
ENCODED_QUERY=$(echo "$QUERY" | sed 's/ /%20/g')

# Pexels API呼び出し
RESULT=$(curl -s "https://api.pexels.com/v1/search?query=${ENCODED_QUERY}&per_page=${COUNT}" \
  -H "Authorization: ${PEXELS_API_KEY}")

# 画像URLを抽出して出力（jqを使用）
echo "$RESULT" | jq -r '.photos[].src.medium' 2>/dev/null
