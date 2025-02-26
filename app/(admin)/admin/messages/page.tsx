// app/(admin)/admin/messages/page.tsx
import { auth } from '@/app/utils/auth'
import { redirect } from 'next/navigation'
import { prisma } from "@/app/utils/db"
import { Card } from '@/app/components/ui/card'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MessageActions } from "@/app/components/messages/admin/MessageActions"
import { MessagesMultiSelect } from "@/app/components/messages/admin/MessagesMultiSelect"
import { BatchActions } from "@/app/components/messages/admin/BatchActions"
import { SelectAllMessages } from "@/app/components/messages/admin/SelectAllMessages"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from 'react'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// Loading component for messages
function MessagesLoading() {
  return (
    <div className="mt-8 space-y-4 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} className="p-6 bg-muted/5">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <Skeleton className="h-5 w-5 animate-pulse bg-muted-foreground/10" />
              <div>
                <Skeleton className="h-5 w-[200px] mb-2 bg-muted-foreground/10" />
                <Skeleton className="h-4 w-[250px] mb-2 bg-muted-foreground/10" />
                <Skeleton className="h-4 w-[180px] bg-muted-foreground/10" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-[60px] rounded-full bg-muted-foreground/10" />
              <Skeleton className="h-8 w-8 bg-muted-foreground/10" />
            </div>
          </div>
          <Skeleton className="mt-4 h-4 w-full bg-muted-foreground/10" />
          <Skeleton className="mt-4 h-3 w-[200px] bg-muted-foreground/10" />
        </Card>
      ))}
    </div>
  )
}

// Messages List Component
async function MessagesList() {
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
    <>
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
                <span className={`px-2 py-1 rounded-full text-xs ${message.status === 'UNREAD'
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
            <div className="mt-4 flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Received: {new Date(message.createdAt).toLocaleString()}
              </div>
              <Button
                variant="ghost"
                size="sm"
                asChild
              >
                <Link href={`/admin/messages/${message.id}`}>
                  View Details
                </Link>
              </Button>
            </div>
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
    </>
  )
}

export default async function AdminMessages() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

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

      <Suspense
        key={new Date().getTime()}
        fallback={<MessagesLoading />}
      >
        <MessagesList />
      </Suspense>
    </div>
  )
}