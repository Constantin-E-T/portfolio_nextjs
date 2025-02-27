// app/components/messages/auth/UserMessageDetail.tsx
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { UserReplyForm } from "./UserReplyForm"
import { MessageStatus, Role } from "@prisma/client"

interface User {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: Role;
}

interface Reply {
  id: string;
  content: string;
  createdAt: Date | string;
  user?: User;
}

interface MessageThread {
  id: string;
  title?: string | null;
  status: MessageStatus;
  replies: Reply[];
}

interface MessageDetailProps {
  message: {
    id: string;
    subject: string;
    name: string;
    email: string;
    content: string;
    status: MessageStatus;
    createdAt: Date | string;
    thread?: MessageThread | null;
  }
}

export function UserMessageDetail({ message }: MessageDetailProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  
  return (
    <div className="space-y-6">
      {/* Message header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{message.subject}</h1>
        <Badge variant="secondary">{message.status}</Badge>
      </div>
      
      {/* Message info */}
      <div className="text-sm text-muted-foreground">
        <p>Sent: {format(new Date(message.createdAt), "PPP 'at' p")}</p>
      </div>
      
      {/* Original message */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium">You</span>
            <span className="text-xs text-muted-foreground">
              {format(new Date(message.createdAt), "PPP 'at' p")}
            </span>
          </div>
          <p className="whitespace-pre-wrap">{message.content}</p>
        </CardContent>
      </Card>
      
      {/* Replies section */}
      {message.thread && message.thread.replies.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Conversation</h2>
          {message.thread.replies.map((reply: Reply) => (
            <Card key={reply.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{reply.user?.name || 'Staff'}</span>
                  {(reply.user?.role === 'ADMIN' || reply.user?.role === 'OWNER') && (
                    <Badge variant="outline" className="text-xs">Staff</Badge>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(reply.createdAt), "PPP 'at' p")}
                </span>
              </div>
              <p className="whitespace-pre-wrap">{reply.content}</p>
            </Card>
          ))}
        </div>
      )}
      
      {/* Reply button or form */}
      {!showReplyForm ? (
        <Button onClick={() => setShowReplyForm(true)}>
          Reply
        </Button>
      ) : (
        <UserReplyForm 
          messageId={message.id} 
          threadId={message.thread?.id} 
          onCancel={() => setShowReplyForm(false)} 
        />
      )}
    </div>
  )
}