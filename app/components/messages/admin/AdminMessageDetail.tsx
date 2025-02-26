// app/components/messages/admin/AdminMessageDetail.tsx
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { ReplyForm } from "./ReplyForm"
import { MessageStatus } from "@prisma/client"

// Define interfaces for the component props and nested objects
interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
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

export function AdminMessageDetail({ message }: MessageDetailProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  
  return (
    <div className="space-y-6">
      {/* Message header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{message.subject}</h1>
        <Badge variant="secondary">{message.status}</Badge>
      </div>
      
      {/* Sender info */}
      <div className="text-sm text-muted-foreground">
        <p>From: {message.name} ({message.email})</p>
        <p>Received: {format(new Date(message.createdAt), "PPP 'at' p")}</p>
      </div>
      
      {/* Message content */}
      <Card className="p-4">
        <CardContent className="pt-4">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </CardContent>
      </Card>
      
      {/* Replies section */}
      {message.thread && message.thread.replies.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Replies</h2>
          {message.thread.replies.map((reply: Reply) => (
            <Card key={reply.id} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">{reply.user?.name || 'Staff'}</span>
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
        <ReplyForm 
          messageId={message.id} 
          threadId={message.thread?.id} 
          onCancel={() => setShowReplyForm(false)} 
        />
      )}
    </div>
  )
}