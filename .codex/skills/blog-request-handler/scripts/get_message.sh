#!/bin/bash
# メッセージ詳細取得スクリプト
# 使用法: ./get_message.sh "MESSAGE_ID"

MESSAGE_ID="$1"

if [ -z "$MESSAGE_ID" ]; then
  echo "Usage: ./get_message.sh MESSAGE_ID"
  exit 1
fi

gws gmail users messages get \
  --params "{\"userId\": \"me\", \"id\": \"${MESSAGE_ID}\"}"
