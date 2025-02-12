// app/actions/messages/auth/history.ts
'use server'

import { auth } from "@/app/utils/auth"
import { prisma } from "@/app/utils/db"
import { MessageHistoryResponse } from "../shared/types/types"

export async function getUserMessageHistory(page = 1, limit = 10): Promise<MessageHistoryResponse> {
  try {
    const session = await auth()
    if (!session?.user) {
      throw new Error("Unauthorized")
    }

    const skip = (page - 1) * limit
    const [messages, total] = await Promise.all([
      prisma.message.findMany({
        where: {
          userId: session.user.id
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
        select: {
          id: true,
          subject: true,
          status: true,
          createdAt: true,
          thread: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              status: true,
              title: true,
              replies: {
                select: {
                  id: true,
                  content: true,
                  createdAt: true,
                  updatedAt: true,
                  userId: true,
                  threadId: true
                }
              }
            }
          }
        }
      }),
      prisma.message.count({
        where: {
          userId: session.user.id
        }
      })
    ])

    return {
      success: true,
      messages,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        current: page,
        hasMore: skip + messages.length < total
      }
    }

  } catch (error) {
    console.error('Error fetching message history:', error)
    return {
      success: false,
      error: "Failed to fetch message history"
    }
  }
}