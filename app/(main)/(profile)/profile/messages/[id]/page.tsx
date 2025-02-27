// app/(main)/(profile)/profile/messages/[id]/page.tsx
import { notFound, redirect } from "next/navigation"
import { auth } from "@/app/utils/auth"
import { prisma } from "@/app/utils/db"
import { UserMessageDetail } from "@/app/components/messages/auth/UserMessageDetail"
import { BackButton } from "@/app/components/general/BackButton"

interface MessagePageProps {
  params: {
    id: string
  }
}

export default async function UserMessageDetailPage({ params }: MessagePageProps) {
  const session = await auth()
  
  if (!session?.user) {
    redirect('/login')
  }
  
  // Await params to ensure it's fully resolved before accessing its properties
  const resolvedParams = await Promise.resolve(params)
  const messageId = String(resolvedParams.id)
  
  const message = await prisma.message.findUnique({
    where: { 
      id: messageId,
      userId: session.user.id // Only show messages owned by this user
    },
    include: {
      thread: {
        include: {
          replies: {
            include: {
              user: {
                select: { 
                  name: true, 
                  image: true,
                  role: true // Include role so we can show who's admin vs user
                }
              }
            },
            orderBy: { createdAt: 'asc' }
          }
        }
      }
    }
  })
  
  if (!message) {
    notFound()
  }
  
  return (
    <div className="space-y-6">
      <BackButton 
        href="/profile/messages" 
        text="Back to messages" 
      />
      
      <UserMessageDetail message={message} />
    </div>
  )
}