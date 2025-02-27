// app/(admin)/admin/messages/[id]/page.tsx
import { notFound } from "next/navigation"
import { prisma } from "@/app/utils/db"
import { AdminMessageDetail } from "@/app/components/messages/admin/AdminMessageDetail"
import { BackButton } from "@/app/components/general/BackButton"

export default async function AdminMessageDetailPage({ params }: { params: { id: string } }) {
  const message = await prisma.message.findUnique({
    where: { id: params.id },
    include: {
      thread: {
        include: {
          replies: {
            include: {
              user: {
                select: { id: true, name: true, image: true }
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
      <div className="flex items-center justify-between">
        <BackButton 
          href="/admin/messages" 
          text="Back to messages" 
        />
      </div>
      
      <AdminMessageDetail message={message} />
    </div>
  )
}