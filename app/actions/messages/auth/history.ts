// app/actions/messages/auth/history.ts
'use server'

import { auth } from "@/app/utils/auth"
import { prisma } from "@/app/utils/db"
import { MessageHistoryResponse } from "../shared/types/types"

export async function getUserMessageHistory(page = 1, limit = 10): Promise<MessageHistoryResponse> {
  try {
    const session = await auth()
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized",
        messages: [],
        pagination: {
          total: 0,
          pages: 0,
          current: page,
          hasMore: false
        }
      }
    }

    // Ensure page and limit are valid numbers
    const validPage = Math.max(1, Number(page))
    const validLimit = Math.max(1, Math.min(50, Number(limit)))
    const skip = (validPage - 1) * validLimit

    try {
      const [messages, total] = await Promise.all([
        prisma.message.findMany({
          where: {
            userId: session.user.id
          },
          orderBy: {
            createdAt: 'desc'
          },
          skip,
          take: validLimit,
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
        messages: messages || [], 
        pagination: {
          total,
          pages: Math.ceil(total / validLimit),
          current: validPage,
          hasMore: skip + messages.length < total
        }
      }

    } catch (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to fetch messages from database')
    }

  } catch (error) {
    console.error('Error in getUserMessageHistory:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to fetch message history",
      messages: [],
      pagination: {
        total: 0,
        pages: 0,
        current: page,
        hasMore: false
      }
    }
  }
}