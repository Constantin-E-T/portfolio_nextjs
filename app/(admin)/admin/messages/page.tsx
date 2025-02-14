// app/(admin)/admin/messages/page.tsx
import { auth } from '@/app/utils/auth'
import { redirect } from 'next/navigation'
import { prisma } from "@/app/utils/db"
import { Card } from '@/app/components/ui/card'
import { MessageActions } from "@/app/components/messages/admin/MessageActions"
import { MessagesMultiSelect } from "@/app/components/messages/admin/MessagesMultiSelect"
import { BatchActions } from "@/app/components/messages/admin/BatchActions"
import { SelectAllMessages } from "@/app/components/messages/admin/SelectAllMessages"

export default async function AdminMessages() {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }

  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    }
  })

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="mt-2 text-muted-foreground">
            View and manage contact form submissions
          </p>
        </div>
        <BatchActions />
      </div>

      {messages.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <SelectAllMessages messageIds={messages.map(m => m.id)} />
          <p className="text-sm text-muted-foreground">
            Total messages: {messages.length}
          </p>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {messages.map((message) => (
          <Card key={message.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-4">
                <MessagesMultiSelect 
                  messageId={message.id}
                />
                <div>
                  <h3 className="font-semibold">{message.subject}</h3>
                  <p className="text-sm text-muted-foreground">
                    From: {message.name} ({message.email})
                  </p>
                  {message.user && (
                    <p className="text-sm text-primary">
                      Authenticated User: {message.user.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  message.status === 'UNREAD' 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {message.status}
                </span>
                <MessageActions 
                  messageId={message.id} 
                  currentStatus={message.status}
                />
              </div>
            </div>
            <p className="mt-4 text-sm">{message.content}</p>
            <div className="mt-4 text-xs text-muted-foreground">
              Received: {new Date(message.createdAt).toLocaleString()}
            </div>
          </Card>
        ))}

        {messages.length === 0 && (
          <Card className="p-6">
            <div className="text-center text-muted-foreground">
              No messages found
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}