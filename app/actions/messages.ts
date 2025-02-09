// app/actions/messages.ts
'use server'

import { prisma } from "@/app/utils/db"
import { auth } from "@/app/utils/auth"

type MessageResponse = {
  success: boolean
  error?: string
}

export async function submitMessage(
  _prevState: MessageResponse | null, 
  formData: FormData
): Promise<MessageResponse> {
  try {
    const session = await auth()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const content = formData.get('message') as string

    // Basic validation
    if (!name || !email || !subject || !content) {
      return {
        success: false,
        error: "All fields are required"
      }
    }

    // Create message with user ID if authenticated
    const messageData = {
      name,
      email,
      subject,
      content,
      status: "UNREAD" as const,
      ...(session?.user?.id && { userId: session.user.id })
    }

    await prisma.message.create({
      data: messageData
    })

    return {
      success: true
    }

  } catch (error) {
    console.error('Error submitting message:', error)
    return {
      success: false,
      error: "Failed to send message. Please try again later."
    }
  }
}

export async function updateMessageStatus(
  messageId: string,
  status: 'READ' | 'UNREAD'
): Promise<MessageResponse> {
  try {
    const session = await auth()
    
    // Check if user is authenticated and has admin role
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized"
      }
    }

    await prisma.message.update({
      where: { id: messageId },
      data: { status }
    })

    return {
      success: true
    }

  } catch (error) {
    console.error('Error updating message:', error)
    return {
      success: false,
      error: "Failed to update message status"
    }
  }
}
