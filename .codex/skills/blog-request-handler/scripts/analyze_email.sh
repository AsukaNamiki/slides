#!/bin/bash
# メール解析スクリプト - LLMでブログ依頼か判断
# 使用法: ./analyze_email.sh "MESSAGE_ID"
# 出力: JSON {"is_blog_request": true/false, "theme": "テーマ"}

MESSAGE_ID="$1"

if [ -z "$MESSAGE_ID" ]; then
  echo '{"error": "MESSAGE_ID required"}'
  exit 1
fi

# メッセージ詳細を取得
MESSAGE_JSON=$(gws gmail users messages get --params "{\"userId\": \"me\", \"id\": \"${MESSAGE_ID}\"}" 2>/dev/null)

if [ -z "$MESSAGE_JSON" ]; then
  echo '{"error": "Failed to get message"}'
  exit 1
fi

# 件名と本文を抽出
SUBJECT=$(echo "$MESSAGE_JSON" | jq -r '.payload.headers[] | select(.name == "Subject") | .value // ""')
SNIPPET=$(echo "$MESSAGE_JSON" | jq -r '.snippet // ""')

# 本文をデコード（base64）
BODY=""
BODY_DATA=$(echo "$MESSAGE_JSON" | jq -r '.payload.body.data // empty')
if [ -n "$BODY_DATA" ]; then
  BODY=$(echo "$BODY_DATA" | base64 -d 2>/dev/null || echo "")
fi

# パートから本文を取得（マルチパートメールの場合）
if [ -z "$BODY" ]; then
  BODY_DATA=$(echo "$MESSAGE_JSON" | jq -r '.payload.parts[]? | select(.mimeType == "text/plain") | .body.data // empty' | head -1)
  if [ -n "$BODY_DATA" ]; then
    BODY=$(echo "$BODY_DATA" | base64 -d 2>/dev/null || echo "")
  fi
fi

# 本文がなければsnippetを使用
if [ -z "$BODY" ]; then
  BODY="$SNIPPET"
fi

# Codexに判断させるためのプロンプトを出力
# 実際の判断はCodexが行う
cat << EOF
{
  "message_id": "$MESSAGE_ID",
  "subject": $(echo "$SUBJECT" | jq -Rs .),
  "body": $(echo "$BODY" | head -c 2000 | jq -Rs .),
  "prompt": "以下のメールがブログ執筆依頼かどうか判断してください。依頼であればテーマも抽出してください。\n\n件名: $SUBJECT\n\n本文: $BODY"
}
EOF
