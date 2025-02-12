// app/(main)/(profile)/profile/messages/[id]/page.tsx
import { notFound } from "next/navigation"
import { getUserMessageDetails } from "@/app/actions/messages/auth/lookup"
import { MessageDetail } from "@/components/messages/auth/MessageDetail"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface MessagePageProps {
  params: {
    id: string
  }
}

export default async function MessagePage({ params }: MessagePageProps) {
  try {
    const message = await getUserMessageDetails(params.id)
    if (!message) notFound()

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
  } catch {
    notFound()
  }
}