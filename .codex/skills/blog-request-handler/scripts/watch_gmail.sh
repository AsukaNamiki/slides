#!/bin/bash
# Gmail Pub/Sub監視スクリプト（gcloud版）
# gcloudでPub/Subをpullして新着メールを処理
# 使用法: ./watch_gmail.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# 環境変数チェック
if [ -z "$GCP_PROJECT_ID" ]; then
  echo "❌ GCP_PROJECT_ID が設定されていません"
  exit 1
fi

SENDER="${WATCH_SENDER:-namikia@cac.co.jp}"
SUBSCRIPTION="${PUBSUB_SUBSCRIPTION:-}"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📧 Gmail Pub/Sub監視を開始"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   プロジェクト: $GCP_PROJECT_ID"
echo "   送信者フィルタ: $SENDER"
echo "   Ctrl+C で停止"
echo ""

# サブスクリプションが指定されていない場合は作成
if [ -z "$SUBSCRIPTION" ]; then
  echo "📡 Gmail watchを設定中..."
  
  TOPIC_NAME="gws-gmail-watch-main"
  SUBSCRIPTION_NAME="gws-gmail-watch-main"
  TOPIC="projects/$GCP_PROJECT_ID/topics/$TOPIC_NAME"
  SUBSCRIPTION="projects/$GCP_PROJECT_ID/subscriptions/$SUBSCRIPTION_NAME"
  
  # トピック作成（存在しない場合）
  gcloud pubsub topics create "$TOPIC_NAME" --project="$GCP_PROJECT_ID" 2>/dev/null || true
  
  # Gmail APIにpublish権限を付与
  gcloud pubsub topics add-iam-policy-binding "$TOPIC_NAME" \
    --project="$GCP_PROJECT_ID" \
    --member="serviceAccount:gmail-api-push@system.gserviceaccount.com" \
    --role="roles/pubsub.publisher" 2>/dev/null || true
  
  # サブスクリプション作成（存在しない場合）
  gcloud pubsub subscriptions create "$SUBSCRIPTION_NAME" \
    --project="$GCP_PROJECT_ID" \
    --topic="$TOPIC_NAME" 2>/dev/null || true
  
  # Gmail watchを設定
  gws gmail users watch --params '{"userId": "me"}' \
    --json "{\"topicName\": \"$TOPIC\", \"labelIds\": [\"INBOX\"]}" > /dev/null 2>&1
  
  echo "✅ Gmail watch設定完了"
fi

echo "   サブスクリプション: $SUBSCRIPTION"
echo ""

echo "👀 新着メールを監視中..."
echo ""

# 処理済みメッセージIDを記録
PROCESSED_FILE="/tmp/gws_processed_messages.txt"
touch "$PROCESSED_FILE"

# メインループ
while true; do
  # Pub/Subからメッセージを取得
  MESSAGES=$(gcloud pubsub subscriptions pull "$SUBSCRIPTION" \
    --project="$GCP_PROJECT_ID" \
    --auto-ack \
    --limit=10 \
    --format=json 2>/dev/null || echo "[]")
  
  # メッセージがあれば処理
  if [ "$MESSAGES" != "[]" ] && [ -n "$MESSAGES" ]; then
    echo "$MESSAGES" | jq -r '.[].message.data' 2>/dev/null | while read -r data; do
      if [ -z "$data" ] || [ "$data" = "null" ]; then
        continue
      fi
      
      # Base64デコード
      DECODED=$(echo "$data" | base64 -d 2>/dev/null || echo "")
      if [ -z "$DECODED" ]; then
        continue
      fi
      
      HISTORY_ID=$(echo "$DECODED" | jq -r '.historyId // empty')
      EMAIL=$(echo "$DECODED" | jq -r '.emailAddress // empty')
      
      echo "📬 Pub/Sub通知受信: historyId=$HISTORY_ID"
      
      # 重複チェック
      if [ "$HISTORY_ID" = "$LAST_HISTORY_ID" ]; then
        echo "   ⏭️ 重複スキップ"
        continue
      fi
      LAST_HISTORY_ID="$HISTORY_ID"
      
      # 新着メールを検索（AI-Processedラベルがないもの）
      echo "🔍 新着メールを検索中..."
      MAIL_LIST=$(gws gmail users messages list \
        --params "{\"userId\": \"me\", \"q\": \"from:$SENDER is:unread -label:AI-Processed\"}" 2>/dev/null | grep -v "^Using keyring")
      
      MESSAGE_IDS=$(echo "$MAIL_LIST" | jq -r '.messages[]?.id // empty' 2>/dev/null)
      
      if [ -z "$MESSAGE_IDS" ]; then
        echo "   📭 対象メールなし"
        continue
      fi
      
      # 各メールを処理
      echo "$MESSAGE_IDS" | while read -r MESSAGE_ID; do
        if [ -z "$MESSAGE_ID" ]; then
          continue
        fi
        
        # メール詳細を取得
        MSG_DETAIL=$(gws gmail users messages get \
          --params "{\"userId\": \"me\", \"id\": \"$MESSAGE_ID\"}" 2>/dev/null | grep -v "^Using keyring")
        
        FROM=$(echo "$MSG_DETAIL" | jq -r '.payload.headers[]? | select(.name == "From") | .value // empty')
        SUBJECT=$(echo "$MSG_DETAIL" | jq -r '.payload.headers[]? | select(.name == "Subject") | .value // empty')
        
        echo ""
        echo "📩 新着メール検知"
        echo "   ID: $MESSAGE_ID"
        echo "   From: $FROM"
        echo "   Subject: $SUBJECT"
        echo "   ✅ 処理を開始"
        
        # バックグラウンドで処理（環境変数を明示的に渡す）
        PEXELS_API_KEY="$PEXELS_API_KEY" \
        SLACK_BOT_TOKEN="$SLACK_BOT_TOKEN" \
        SLACK_CHANNEL_ID="$SLACK_CHANNEL_ID" \
        SLACK_WEBHOOK_URL="$SLACK_WEBHOOK_URL" \
        AI_PROCESSED_LABEL_ID="$AI_PROCESSED_LABEL_ID" \
        OUTPUT_DIR="$OUTPUT_DIR" \
        "$SCRIPT_DIR/process_email.sh" "$MESSAGE_ID" "$FROM" "$SUBJECT" &
        echo "   🔄 バックグラウンドで処理中 (PID: $!)"
      done
    done
  fi
  
  # 5秒待機
  sleep 5
done
