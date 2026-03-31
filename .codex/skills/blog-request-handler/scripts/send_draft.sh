#!/bin/bash
# 添付ファイル付き返信メール送信スクリプト
# 使用法: ./send_draft.sh "宛先" "件名" "本文" "添付ファイルパス"

TO="$1"
SUBJECT="$2"
BODY="$3"
ATTACHMENT="$4"

if [ -z "$TO" ] || [ -z "$SUBJECT" ] || [ -z "$BODY" ]; then
  echo "Usage: ./send_draft.sh TO SUBJECT BODY [ATTACHMENT]"
  exit 1
fi

echo "📝 返信下書きを作成中..."
echo "   To: $TO"
echo "   Subject: $SUBJECT"

if [ -n "$ATTACHMENT" ] && [ -f "$ATTACHMENT" ]; then
  gws gmail +send \
    --to "$TO" \
    --subject "$SUBJECT" \
    --body "$BODY" \
    --attachments "$ATTACHMENT"
  echo "✅ 添付ファイル付きで送信しました: $(basename "$ATTACHMENT")"
else
  gws gmail +send \
    --to "$TO" \
    --subject "$SUBJECT" \
    --body "$BODY"
  echo "✅ 送信しました"
fi
