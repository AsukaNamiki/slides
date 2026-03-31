#!/bin/bash
# Slack通知スクリプト
# 使用法: ./notify_slack.sh "メッセージ" "絵文字（オプション）"
# 環境変数: SLACK_WEBHOOK_URL

MESSAGE="$1"
EMOJI="${2:-🤖}"

if [ -z "$MESSAGE" ]; then
  echo "Usage: ./notify_slack.sh MESSAGE [EMOJI]"
  exit 1
fi

if [ -z "$SLACK_WEBHOOK_URL" ]; then
  echo "⚠️ SLACK_WEBHOOK_URL が設定されていません"
  echo "${EMOJI} ${MESSAGE}"
  exit 0
fi

# 改行をエスケープ
ESCAPED_MESSAGE=$(echo "$MESSAGE" | sed 's/"/\\"/g' | sed ':a;N;$!ba;s/\n/\\n/g')

curl -s -X POST "$SLACK_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d "{\"text\": \"${EMOJI} ${ESCAPED_MESSAGE}\"}" > /dev/null

echo "${EMOJI} ${MESSAGE}"
