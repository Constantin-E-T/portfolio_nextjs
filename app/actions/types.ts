// app/actions/types.ts
import { MessageStatus } from "@prisma/client"

export type ActionResponse = {
  success: boolean
  error?: string
  remainingTime?: number
}

export type MessageResponse = ActionResponse & {
  messageId?: string
}


export type AdminMessageFilters = {
  status?: MessageStatus
  search?: string
  page?: number
  limit?: number
}