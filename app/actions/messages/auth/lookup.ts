// app/actions/messages/auth/lookup.ts
'use server'

import { auth } from "@/app/utils/auth"
import { prisma } from "@/app/utils/db"
import { MessageLookupResult, Message } from "@/app/actions/messages/shared/types/types"

export async function lookupAuthMessage(
  _prevState: MessageLookupResult,
  formData: FormData
): Promise<MessageLookupResult> {
  try {
    const session = await auth()
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized"
      }
    }

    const reference = formData.get('reference') as string
    
    const message = await prisma.message.findUnique({
      where: { 
        id: reference,
        userId: session.user.id
      },
      select: {
        status: true,
        subject: true,
        createdAt: true,
        content: true,
        thread: {
          include: {
            replies: {
              select: {
                id: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                userId: true,
                threadId: true,
                user: {
                  select: {
                    name: true
                  }
                }
              },
              orderBy: {
                createdAt: 'desc'
              },
              take: 1
            }
          }
        }
      }
    })

    if (!message) {
      return {
        success: false,
        error: "Message not found. Please check your reference number and try again."
      }
    }

    return {
      success: true,
      message: {
        ...message,
        status: message.status,
        subject: message.subject,
        createdAt: message.createdAt,
        content: message.content,
        thread: message.thread ?? undefined
      }
    }

  } catch (error) {
    console.error('Error looking up message:', error)
    return {
      success: false,
      error: "Failed to look up message. Please try again later."
    }
  }
}



export async function getUserMessageDetails(messageId: string): Promise<Message> {
    const session = await auth()
    if (!session?.user) {
      throw new Error("Unauthorized")
    }
  
    const message = await prisma.message.findUnique({
      where: { 
        id: messageId,
        userId: session.user.id
      },
      select: {
        id: true,
        subject: true,
        status: true,
        content: true,
        createdAt: true,
        thread: {
          select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            replies: {
              select: {
                id: true,
                content: true,
                createdAt: true,
                user: {
                  select: {
                    name: true
                  }
                }
              },
              orderBy: {
                createdAt: 'asc'
              }
            }
          }
        }
      }
    })
  
    if (!message) {
      throw new Error("Message not found")
    }
  
    return message
  }