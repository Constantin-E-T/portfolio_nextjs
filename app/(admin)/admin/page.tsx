// app/(admin)/admin/page.tsx
import { auth } from '@/app/utils/auth'
import { redirect } from 'next/navigation'
import { prisma } from "@/app/utils/db"
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDistanceToNow } from 'date-fns'
import { MessageSquare, FolderKanban, FileText } from 'lucide-react'
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from 'react'

// Add metadata for route segment config
export const revalidate = 0 // revalidate this page on every request

// Loading component for messages
function MessagesLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-5 w-[200px] mb-2" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-[60px] rounded-full" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

// Loading component for stats
function StatsLoading() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border bg-card p-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-5 w-[100px]" />
          </div>
          <Skeleton className="mt-2 h-9 w-[60px]" />
        </div>
      ))}
    </div>
  )
}

// Stats component
async function DashboardStats() {
  const [messageCount, unreadMessageCount] = await Promise.all([
    prisma.message.count(),
    prisma.message.count({
      where: { status: 'UNREAD' }
    })
  ])

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Link 
        href="/admin/projects"
        className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
      >
        <div className="flex items-center gap-2">
          <FolderKanban className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Projects</h3>
        </div>
        <p className="mt-2 text-3xl font-bold">0</p>
      </Link>

      <Link 
        href="/admin/blog"
        className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
      >
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Blog Posts</h3>
        </div>
        <p className="mt-2 text-3xl font-bold">0</p>
      </Link>

      <Link 
        href="/admin/messages"
        className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
      >
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold">Messages</h3>
        </div>
        <p className="mt-2 text-3xl font-bold">{messageCount}</p>
        {unreadMessageCount > 0 && (
          <p className="mt-1 text-sm text-primary">
            {unreadMessageCount} unread
          </p>
        )}
      </Link>
    </div>
  )
}

// Recent Messages component
async function RecentMessages() {
  const recentMessages = await prisma.message.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      subject: true,
      name: true,
      status: true,
      createdAt: true
    }
  })

  return (
    <>
      {recentMessages.length > 0 ? (
        <div className="space-y-4">
          {recentMessages.map((message) => (
            <Card key={message.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{message.subject}</h3>
                  <p className="text-sm text-muted-foreground">
                    From: {message.name}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    message.status === 'UNREAD' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {message.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                  </span>
                </div>
              </div>
            </Card>
          ))}
          <div className="text-center">
            <Link 
              href="/admin/messages" 
              className="text-sm text-primary hover:underline"
            >
              View all messages
            </Link>
          </div>
        </div>
      ) : (
        <Card className="p-6 text-center text-muted-foreground">
          No recent messages
        </Card>
      )}
    </>
  )
}

export default async function AdminDashboard() {
  const session = await auth()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Manage your portfolio content from here.
      </p>

      <Suspense fallback={<StatsLoading />}>
        <DashboardStats />
      </Suspense>

      <div className="mt-8">
        <Tabs defaultValue="messages" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Activity</h2>
            <TabsList>
              <TabsTrigger value="messages" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Messages
              </TabsTrigger>
              <TabsTrigger value="projects" className="gap-2">
                <FolderKanban className="h-4 w-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="posts" className="gap-2">
                <FileText className="h-4 w-4" />
                Posts
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="messages">
            <Suspense fallback={<MessagesLoading />}>
              <RecentMessages />
            </Suspense>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="p-6">
              <div className="text-center text-muted-foreground">
                No recent project activity
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="posts">
            <Card className="p-6">
              <div className="text-center text-muted-foreground">
                No recent blog post activity
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}