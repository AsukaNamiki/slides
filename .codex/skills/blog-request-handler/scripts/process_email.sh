#!/bin/bash
# メール処理スクリプト（バックグラウンド実行用）
# 使用法: ./process_email.sh "MESSAGE_ID" "FROM" "SUBJECT"

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTPUT_DIR="${OUTPUT_DIR:-demo/advanced/output}"
mkdir -p "$OUTPUT_DIR"

MESSAGE_ID="$1"
FROM="$2"
SUBJECT="$3"

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="${OUTPUT_DIR}/process_${TIMESTAMP}.log"

log() {
  echo "[$(date '+%H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

upload_to_slack() {
  local file="$1"
  local comment="$2"
  
  if [ -z "$SLACK_BOT_TOKEN" ] || [ -z "$SLACK_CHANNEL_ID" ]; then
    return 1
  fi
  
  local filename=$(basename "$file")
  local filesize=$(wc -c < "$file" | tr -d ' ')
  
  local upload_response=$(curl -s -X POST "https://slack.com/api/files.getUploadURLExternal" \
    -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
    -H "Content-Type: application/x-www-form-urlencoded" \
    -d "filename=$filename&length=$filesize")
  
  local upload_url=$(echo "$upload_response" | jq -r '.upload_url // empty')
  local file_id=$(echo "$upload_response" | jq -r '.file_id // empty')
  
  if [ -n "$upload_url" ]; then
    curl -s -X POST "$upload_url" -F "file=@$file" > /dev/null
    curl -s -X POST "https://slack.com/api/files.completeUploadExternal" \
      -H "Authorization: Bearer $SLACK_BOT_TOKEN" \
      -H "Content-Type: application/json" \
      -d "{\"files\": [{\"id\": \"$file_id\", \"title\": \"$filename\"}], \"channel_id\": \"$SLACK_CHANNEL_ID\", \"initial_comment\": \"$comment\"}" > /dev/null
    log "📎 Slackにファイルをアップロード完了"
  fi
}

log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "📧 メール処理開始"
log "   MESSAGE_ID: $MESSAGE_ID"
log "   FROM: $FROM"
log "   SUBJECT: $SUBJECT"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 処理済みラベルを付ける
LABEL_ID="${AI_PROCESSED_LABEL_ID:-Label_16}"
log "🏷️ AI-Processedラベルを付与..."
gws gmail users messages modify \
  --params "{\"userId\": \"me\", \"id\": \"${MESSAGE_ID}\"}" \
  --json "{\"addLabelIds\": [\"${LABEL_ID}\"]}" 2>/dev/null | grep -v "^Using keyring" || true

# メール本文を取得
log "📄 メール本文を取得中..."
MESSAGE_JSON=$(gws gmail users messages get --params "{\"userId\": \"me\", \"id\": \"${MESSAGE_ID}\"}" 2>/dev/null | grep -v "^Using keyring")
SNIPPET=$(echo "$MESSAGE_JSON" | jq -r '.snippet // ""')

# LLMでブログ依頼か判断
log "🤖 LLMで内容を判断中..."

PROMPT="以下のメールがブログ執筆依頼かどうか判断してください。

件名: $SUBJECT
本文: $SNIPPET

回答は以下のJSON形式のみで返してください：
{\"is_blog_request\": true, \"theme\": \"テーマ\"} または {\"is_blog_request\": false, \"theme\": \"\"}"

CODEX_OUTPUT=$(echo "$PROMPT" | codex exec 2>/dev/null || echo "")

JUDGMENT=$(echo "$CODEX_OUTPUT" | grep -o '{[^{}]*"is_blog_request"[^{}]*}' | tail -1 || echo "")
if [ -z "$JUDGMENT" ]; then
  JUDGMENT='{"is_blog_request": false, "theme": ""}'
fi

IS_BLOG_REQUEST=$(echo "$JUDGMENT" | jq -r '.is_blog_request // false' 2>/dev/null || echo "false")
THEME=$(echo "$JUDGMENT" | jq -r '.theme // ""' 2>/dev/null || echo "")

log "   判断結果: is_blog_request=$IS_BLOG_REQUEST, theme=$THEME"

if [ "$IS_BLOG_REQUEST" != "true" ]; then
  log "⏭️ ブログ依頼ではないためスキップ"
  exit 0
fi

# 記事生成
log "🚀 blog-writerスキルで記事生成中..."

ARTICLE_FILE="${OUTPUT_DIR}/blog_${TIMESTAMP}.md"

# 画像取得
IMAGE_URLS=""
if [ -n "$PEXELS_API_KEY" ]; then
  SEARCH_QUERY=$(echo "$THEME" | sed 's/ /%20/g')
  IMAGE_RESULT=$(curl -s "https://api.pexels.com/v1/search?query=${SEARCH_QUERY}&per_page=3" \
    -H "Authorization: ${PEXELS_API_KEY}" 2>/dev/null)
  IMAGE_URLS=$(echo "$IMAGE_RESULT" | jq -r '.photos[].src.medium' 2>/dev/null | head -3)
fi

# 画像URLをMarkdown形式に変換
IMAGE_MARKDOWN=""
i=1
while IFS= read -r url; do
  if [ -n "$url" ]; then
    IMAGE_MARKDOWN="${IMAGE_MARKDOWN}
![画像${i}](${url})"
    i=$((i + 1))
  fi
done <<< "$IMAGE_URLS"

log "✍️ 記事を生成中..."

ARTICLE_PROMPT="\$blog-writer スキルを使って、以下のテーマでブログ記事を作成してください。

テーマ: ${THEME}

以下の画像URLを記事の適切な位置に挿入してください：
${IMAGE_MARKDOWN}

要件:
- 800〜1200文字程度
- 見出し（##）を3つ以上使用
- 箇条書きを適宜使用
- 最後にまとめを入れる

出力はMarkdown形式の記事本文のみ。説明文や前置きは不要です。"

echo "$ARTICLE_PROMPT" | codex exec > "$ARTICLE_FILE" 2>/dev/null || echo "# 記事生成に失敗しました" > "$ARTICLE_FILE"

CHAR_COUNT=$(wc -c < "$ARTICLE_FILE" | tr -d ' ')
log "✅ 記事生成完了: ${CHAR_COUNT}文字"

# Gmail下書き作成
log "📝 返信下書きを作成中..."

REPLY_TO=$(echo "$FROM" | grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' | head -1)

if [ -n "$REPLY_TO" ]; then
  THREAD_ID=$(echo "$MESSAGE_JSON" | jq -r '.threadId // empty')
  REPLY_SUBJECT="Re: ${SUBJECT}"
  ENCODED_SUBJECT="=?UTF-8?B?$(echo -n "$REPLY_SUBJECT" | base64)?="
  
  BOUNDARY="boundary_$(date +%s)"
  ARTICLE_CONTENT=$(cat "$ARTICLE_FILE" | base64)
  ARTICLE_FILENAME=$(basename "$ARTICLE_FILE")
  
  REPLY_BODY="ブログ記事の下書きを作成しました。

テーマ: ${THEME}

添付のMarkdownファイルをご確認ください。

---
このメールは自動生成されました。"

  RAW_MESSAGE="To: ${REPLY_TO}
Subject: ${ENCODED_SUBJECT}
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary=\"${BOUNDARY}\"

--${BOUNDARY}
Content-Type: text/plain; charset=\"UTF-8\"

${REPLY_BODY}

--${BOUNDARY}
Content-Type: text/markdown; name=\"${ARTICLE_FILENAME}\"
Content-Disposition: attachment; filename=\"${ARTICLE_FILENAME}\"
Content-Transfer-Encoding: base64

${ARTICLE_CONTENT}
--${BOUNDARY}--"

  RAW_BASE64=$(echo -n "$RAW_MESSAGE" | base64 | tr '+/' '-_' | tr -d '=')
  
  DRAFT_RESULT=$(gws gmail users drafts create \
    --params '{"userId": "me"}' \
    --json "{\"message\": {\"raw\": \"${RAW_BASE64}\", \"threadId\": \"${THREAD_ID}\"}}" 2>&1 | grep -v "^Using keyring")
  
  if echo "$DRAFT_RESULT" | grep -q '"id"'; then
    DRAFT_ID=$(echo "$DRAFT_RESULT" | jq -r '.id // empty' 2>/dev/null)
    log "✅ 下書きを作成しました (ID: $DRAFT_ID)"
  else
    log "⚠️ 下書き作成に失敗: $DRAFT_RESULT"
  fi
fi

# メールを既読に
gws gmail users messages modify \
  --params "{\"userId\": \"me\", \"id\": \"${MESSAGE_ID}\"}" \
  --json '{"removeLabelIds": ["UNREAD"]}' 2>/dev/null | grep -v "^Using keyring" || true


# Google Tasksにレビュータスクを追加
log "📋 レビュータスクを追加中..."
TASK_LIST_ID="${TASK_LIST_ID:-MDc5MzgzNzUyMzYzMzU0MDc1NTM6MDow}"
DUE_DATE=$(date -v+1d +%Y-%m-%dT00:00:00Z 2>/dev/null || date -d "+1 day" +%Y-%m-%dT00:00:00Z 2>/dev/null || echo "")

TASK_JSON="{\"title\": \"ブログ記事レビュー: ${THEME}\", \"notes\": \"依頼元: ${FROM}\\n記事ファイル: ${ARTICLE_FILE}\\nGmail下書きを確認して送信してください。\""
if [ -n "$DUE_DATE" ]; then
  TASK_JSON="${TASK_JSON}, \"due\": \"${DUE_DATE}\""
fi
TASK_JSON="${TASK_JSON}}"

TASK_RESULT=$(gws tasks tasks insert \
  --params "{\"tasklist\": \"${TASK_LIST_ID}\"}" \
  --json "$TASK_JSON" 2>&1 | grep -v "^Using keyring")

if echo "$TASK_RESULT" | grep -q '"id"'; then
  TASK_LINK=$(echo "$TASK_RESULT" | jq -r '.webViewLink // empty' 2>/dev/null)
  log "✅ レビュータスクを追加しました"
else
  TASK_LINK=""
  log "⚠️ タスク追加に失敗: $TASK_RESULT"
fi

# Slackに完了報告
SLACK_MESSAGE="✅ ブログ記事を作成しました

📩 依頼元: $FROM
📝 テーマ: $THEME
📄 文字数: ${CHAR_COUNT}文字

Gmailに返信下書きを作成しました。"

if [ -n "$TASK_LINK" ]; then
  SLACK_MESSAGE="${SLACK_MESSAGE}
📋 レビュータスク: ${TASK_LINK}"
fi

upload_to_slack "$ARTICLE_FILE" "$SLACK_MESSAGE"

log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
log "✅ 処理完了"
log "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
