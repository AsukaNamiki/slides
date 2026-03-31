#!/bin/bash
# Slackにファイルを添付して通知
# 使用法: ./upload_to_slack.sh "ファイルパス" "コメント"
# 環境変数: SLACK_BOT_TOKEN, SLACK_CHANNEL_ID

FILE_PATH="$1"
COMMENT="${2:-ファイルを添付しました}"

if [ -z "$FILE_PATH" ]; then
  echo "Usage: ./upload_to_slack.sh FILE_PATH [COMMENT]"
  exit 1
fi

if [ ! -f "$FILE_PATH" ]; then
  echo "❌ ファイルが見つかりません: $FILE_PATH"
  exit 1
fi

# SLACK_BOT_TOKENがない場合はWebhookでテキストのみ通知
if [ -z "$SLACK_BOT_TOKEN" ]; then
  if [ -n "$SLACK_WEBHOOK_URL" ]; then
    # ファイル内容を読み込んでコードブロックとして送信
    CONTENT=$(cat "$FILE_PATH" | head -c 3000)
    curl -s -X POST "$SLACK_WEBHOOK_URL" \
      -H "Content-Type: application/json" \
      -d "{\"text\": \"📎 ${COMMENT}\n\`\`\`\n${CONTENT}\n\`\`\`\"}" > /dev/null
    echo "✅ Slackに通知しました（テキスト形式）"
  else
    echo "⚠️ SLACK_BOT_TOKEN または SLACK_WEBHOOK_URL が設定されていません"
  fi
  exit 0
fi

if [ -z "$SLACK_CHANNEL_ID" ]; then
  echo "❌ SLACK_CHANNEL_ID が設定されていません"
  exit 1
fi

# Slack files.upload API v2
FILENAME=$(basename "$FILE_PATH")

# Step 1: Get upload URL
UPLOAD_RESPONSE=$(curl -s -X POST "https://slack.com/api/files.getUploadURLExternal" \
  -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "filename=$FILENAME&length=$(wc -c < "$FILE_PATH" | tr -d ' ')")

UPLOAD_URL=$(echo "$UPLOAD_RESPONSE" | jq -r '.upload_url // empty')
FILE_ID=$(echo "$UPLOAD_RESPONSE" | jq -r '.file_id // empty')

if [ -z "$UPLOAD_URL" ]; then
  echo "❌ アップロードURL取得失敗"
  echo "$UPLOAD_RESPONSE"
  exit 1
fi

# Step 2: Upload file
curl -s -X POST "$UPLOAD_URL" \
  -F "file=@$FILE_PATH" > /dev/null

# Step 3: Complete upload
curl -s -X POST "https://slack.com/api/files.completeUploadExternal" \
  -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"files\": [{\"id\": \"$FILE_ID\", \"title\": \"$FILENAME\"}], \"channel_id\": \"$SLACK_CHANNEL_ID\", \"initial_comment\": \"$COMMENT\"}" > /dev/null

echo "✅ Slackにファイルをアップロードしました: $FILENAME"
