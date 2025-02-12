// app/components/messages/auth/MessageHistory.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MessageHistoryResponse } from "@/app/actions/messages/shared/types/types"
import { format } from "date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { getUserMessageHistory } from "@/app/actions/messages/auth/history"

type Message = NonNullable<MessageHistoryResponse['messages']>[0]

const statusColors = {
  UNREAD: "bg-blue-500",
  READ: "bg-green-500",
  ARCHIVED: "bg-gray-500",
  DELETED: "bg-red-500"
} as const

interface MessageHistoryProps {
    limit?: number
  }
  


  export default function MessageHistory({ limit = 10 }: MessageHistoryProps) {
    // Changed to default export
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  const loadMessages = async (pageNum: number) => {
    try {
      setLoading(true)
      const result = await getUserMessageHistory(pageNum, limit) // Pass limit to the API
      if (result.success && result.messages) {
        setMessages(prev => pageNum === 1 ? result.messages || [] : [...prev, ...(result.messages || [])])
        setHasMore(result.pagination?.hasMore || false)
      }
    } catch (error) {
      console.error("Failed to load messages:", error)
    } finally {
      setLoading(false)
    }
  }


  useEffect(() => {
    loadMessages(page)
  }, [page])

  if (loading && messages.length === 0) {
    return <MessageListSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-medium">{message.subject}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={statusColors[message.status]}
                  >
                    {message.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(message.createdAt), "PPP")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => router.push(`/profile/messages/${message.id}`)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {loading && messages.length > 0 && (
        <div className="h-24 flex items-center justify-center">
          <Skeleton className="h-8 w-32" />
        </div>
      )}

      {hasMore && !loading && (
        <Button 
          onClick={() => setPage(p => p + 1)}
          variant="outline"
          className="w-full"
        >
          Load More
        </Button>
      )}
    </div>
  )
}

function MessageListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                <TableCell><Skeleton className="h-8 w-[60px]" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}