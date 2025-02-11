// app/actions/types.ts
import { MessageStatus } from "@prisma/client"

export type ActionResponse = {
  success: boolean
  error?: string
  remainingTime?: number
  redirect?: string
}

export type MessageResponse = ActionResponse & {
  messageId?: string
}

export type MessageLookupResult = {
  success: boolean
  error?: string
  message?: {
    status: MessageStatus
    createdAt: Date
    subject: string
  }
}

export type AdminMessageFilters = {
  status?: MessageStatus
  search?: string
  page?: number
  limit?: number
}