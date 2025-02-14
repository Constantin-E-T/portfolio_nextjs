// app/(main)/(profile)/profile/messages/[id]/page.tsx

import { notFound, redirect } from "next/navigation"
import { getUserMessageDetails } from "@/app/actions/messages/auth/lookup"
import { MessageDetail } from "@/components/messages/auth/MessageDetail"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Message } from "@/app/actions/messages/shared/types/types"

interface MessagePageProps {
  params: Promise<{
    id: string
  }>
}

export default async function MessagePage({ params }: MessagePageProps) {
  let message: Message | null = null;
  const resolvedParams = await params;

  try {
    message = await getUserMessageDetails(resolvedParams.id)
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      redirect("/login")
    }
    console.error("Error fetching message:", error)
    notFound()
  }

  if (!message) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/profile/messages">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Messages
          </Link>
        </Button>
      </div>

      <MessageDetail message={message} />
    </div>
  )
}