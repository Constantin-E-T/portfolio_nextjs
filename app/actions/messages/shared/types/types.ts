// app/actions/messages/shared/types/types.ts
import { MessageStatus } from "@prisma/client"

// Add action response type for submit actions and redirects
export type ActionResponse = {
  success: boolean
  error?: string
  remainingTime?: number
  redirect?: string
}

// Add message type for lookup and display
export type MessageResponse = ActionResponse & {
  messageId?: string
}

// Add thread type for replies in message thread display status messages
export type MessageThread = {
  id: string
  title: string | null
  status: MessageStatus
  createdAt: Date
  updatedAt: Date
  replies: {
    id: string
    content: string
    createdAt: Date
    updatedAt: Date
    userId: string
    threadId: string
  }[]
}


export type MessageLookupResult = {
  success: boolean
  error?: string
  message?: {
    status: MessageStatus
    createdAt: Date
    subject: string
    content: string   // Not optional since it's required in schema
    thread?: {
      id: string
      title: string | null
      status: MessageStatus
      createdAt: Date
      updatedAt: Date
      replies: {
        id: string
        content: string
        createdAt: Date
        updatedAt: Date
        userId: string
        threadId: string
        user: {
          name: string | null
        }
      }[]
    }
  }
}

// Add pagination type for message history
export type PaginationInfo = {
  total: number
  pages: number
  current: number
  hasMore: boolean
}

export type Message = {
  id: string
  subject: string
  content: string
  status: MessageStatus
  createdAt: Date
  thread: {
    id: string
    title: string | null
    status: MessageStatus
    createdAt: Date
    updatedAt: Date
    replies: {
      id: string
      content: string
      createdAt: Date
      user: {
        name: string | null
      }
    }[]
  } | null
}

export interface MessageDetailProps {
  message: Message
}



// Add message history response type
export type MessageHistoryResponse = {
  success: boolean
  error?: string
  messages?: {
    id: string
    subject: string
    status: MessageStatus
    createdAt: Date
    thread: MessageThread | null // Changed to match Prisma's nullable relation
  }[]
  pagination?: PaginationInfo
}


// Admin filters remain the same
export type AdminMessageFilters = {
  status?: MessageStatus
  search?: string
  page?: number
  limit?: number
}