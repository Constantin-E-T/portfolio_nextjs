// app/components/messages/admin/SelectAllMessages.tsx
"use client"

import { useMessagesStore } from "@/app/stores/messagesStore"
import { Checkbox } from "@/components/ui/checkbox"

interface SelectAllMessagesProps {
  messageIds: string[]
}

export function SelectAllMessages({ messageIds }: SelectAllMessagesProps) {
  const { selectedMessages, toggleAll } = useMessagesStore()
  const allSelected = selectedMessages.length === messageIds.length

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        id="select-all"
        checked={allSelected}
        onCheckedChange={() => toggleAll(messageIds)}
        aria-label="Select all messages"
      />
      <label htmlFor="select-all" className="text-sm text-muted-foreground">
        Select all
      </label>
    </div>
  )
}