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
  
  gcloud pubsub topics create "$TOPIC_NAME" --project="$GCP_PROJECT_ID" 2>/dev/null || true
  
  gcloud pubsub topics add-iam-policy-binding "$TOPIC_NAME" \
    --project="$GCP_PROJECT_ID" \
    --member="serviceAccount:gmail-api-push@system.gserviceaccount.com" \
    --role="roles/pubsub.publisher" 2>/dev/null || true
  
  gcloud pubsub subscriptions create "$SUBSCRIPTION_NAME" \
    --project="$GCP_PROJECT_ID" \
    --topic="$TOPIC_NAME" 2>/dev/null || true
  
  gws gmail users watch --params '{"userId": "me"}' \
    --json "{\"topicName\": \"$TOPIC\", \"labelIds\": [\"INBOX\"]}" > /dev/null 2>&1
  
  echo "✅ Gmail watch設定完了"
fi

echo "   サブスクリプション: $SUBSCRIPTION"
echo ""
echo "👀 新着メールを監視中..."
echo ""

# 処理済みメッセージIDをファイルで管理（重複防止）
PROCESSED_FILE="/tmp/gws_processed_messages.txt"
touch "$PROCESSED_FILE"

# メインループ
while true; do
  MESSAGES=$(gcloud pubsub subscriptions pull "$SUBSCRIPTION" \
    --project="$GCP_PROJECT_ID" \
    --auto-ack \
    --limit=10 \
    --format=json 2>/dev/null || echo "[]")
  
  if [ "$MESSAGES" != "[]" ] && [ -n "$MESSAGES" ]; then
    echo "📬 Pub/Sub通知受信"
    
    # 新着メールを検索（AI-Processedラベルがないもの）
    echo "🔍 新着メールを検索中..."
    MAIL_LIST=$(gws gmail users messages list \
      --params "{\"userId\": \"me\", \"q\": \"from:$SENDER is:unread -label:AI-Processed\"}" 2>/dev/null | grep -v "^Using keyring")
    
    MESSAGE_IDS=$(echo "$MAIL_LIST" | jq -r '.messages[]?.id // empty' 2>/dev/null)
    
    if [ -z "$MESSAGE_IDS" ]; then
      echo "   📭 対象メールなし"
    else
      for MESSAGE_ID in $MESSAGE_IDS; do
        if [ -z "$MESSAGE_ID" ]; then
          continue
        fi
        
        # 処理済みチェック（ファイルベース）
        if grep -q "^${MESSAGE_ID}$" "$PROCESSED_FILE" 2>/dev/null; then
          echo "   ⏭️ 処理済みスキップ: $MESSAGE_ID"
          continue
        fi
        
        # 即座に処理済みとして記録（重複防止）
        echo "$MESSAGE_ID" >> "$PROCESSED_FILE"
        
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
        TASK_LIST_ID="$TASK_LIST_ID" \
        "$SCRIPT_DIR/process_email.sh" "$MESSAGE_ID" "$FROM" "$SUBJECT" &
        echo "   🔄 バックグラウンドで処理中 (PID: $!)"
      done
    fi
  fi
  
  sleep 5
done
