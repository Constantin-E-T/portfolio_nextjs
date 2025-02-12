// app/(main)/(profile)/profile/messages/page.tsx
import { Suspense } from "react"
import MessageHistory from "@/components/messages/auth/MessageHistory"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Messages</h1>
        <Button asChild>
          <Link href="/contact">
            <Plus className="mr-2 h-4 w-4" />
            New Message
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <MessageHistory />
      </Suspense>
    </div>
  )
}