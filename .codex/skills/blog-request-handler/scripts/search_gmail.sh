#!/bin/bash
# Gmail検索スクリプト
# 使用法: ./search_gmail.sh ["検索クエリ"]
# デフォルト: from:namikia@cac.co.jp is:unread

QUERY="${1:-from:namikia@cac.co.jp is:unread}"

echo "🔍 Gmail検索: $QUERY"

gws gmail users messages list \
  --params "{\"userId\": \"me\", \"q\": \"${QUERY}\"}"
