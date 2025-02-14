// app/components/messages/admin/MessagesMultiSelect.tsx
"use client"

import { useMessagesStore } from "@/app/stores/messagesStore"
import { Checkbox } from "@/components/ui/checkbox"

interface MessagesMultiSelectProps {
  messageId: string
}

export function MessagesMultiSelect({ messageId }: MessagesMultiSelectProps) {
  const { selectedMessages, toggleMessage } = useMessagesStore()

  return (
    <Checkbox
      id={`select-message-${messageId}`}
      checked={selectedMessages.includes(messageId)}
      onCheckedChange={() => toggleMessage(messageId)}
      aria-label="Select message"
      className="translate-y-1"
    />
  )
}