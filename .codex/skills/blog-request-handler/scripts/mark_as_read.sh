#!/bin/bash
# メッセージを既読にするスクリプト
# 使用法: ./mark_as_read.sh "MESSAGE_ID"

MESSAGE_ID="$1"

if [ -z "$MESSAGE_ID" ]; then
  echo "Usage: ./mark_as_read.sh MESSAGE_ID"
  exit 1
fi

gws gmail users messages modify \
  --params "{\"userId\": \"me\", \"id\": \"${MESSAGE_ID}\"}" \
  --json '{"removeLabelIds": ["UNREAD"]}'

echo "✅ メールを既読にしました: $MESSAGE_ID"
