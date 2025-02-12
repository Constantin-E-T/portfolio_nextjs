// app/components/messages/auth/MessageDetail.tsx
"use client"

import { MessageDetailProps } from "@/app/actions/messages/shared/types/types"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

export function MessageDetail({ message }: MessageDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{message.subject}</h1>
        <Badge variant="secondary">{message.status}</Badge>
      </div>

      <div className="text-sm text-muted-foreground">
        {format(new Date(message.createdAt), "PPP")}
      </div>

      <Card className="p-4">
        <p className="whitespace-pre-wrap">{message.content}</p>
      </Card>

      {message.thread?.replies && message.thread.replies.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Replies</h2>
          {message.thread.replies.map((reply) => (
            <Card key={reply.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">{reply.user.name || 'Anonymous'}</span>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(reply.createdAt), "PPP")}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{reply.content}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}