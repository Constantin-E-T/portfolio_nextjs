// app/actions/messages/admin/reply.ts
"use server"

import { auth } from "@/app/utils/auth"
import { prisma } from "@/app/utils/db"
import { revalidatePath } from "next/cache"

interface ReplyResponse {
  success: boolean;
  error?: string;
}

export async function submitAdminReply(formData: FormData): Promise<ReplyResponse> {
  try {
    const session = await auth()
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized"
      }
    }

    const content = formData.get('content') as string
    const messageId = formData.get('messageId') as string
    let threadId = formData.get('threadId') as string | null

    // Validate content
    if (!content || content.trim().length === 0) {
      return {
        success: false,
        error: "Reply content is required"
      }
    }

    // Find the message
    const message = await prisma.message.findUnique({
      where: { id: messageId }
    })

    if (!message) {
      return {
        success: false,
        error: "Message not found"
      }
    }

    // If no thread exists, create one
    if (!threadId) {
      const thread = await prisma.messageThread.create({
        data: {
          title: `Re: ${message.subject}`,
          status: 'READ'
        }
      })
      threadId = thread.id

      // Update the message to link to the new thread
      await prisma.message.update({
        where: { id: messageId },
        data: {
          threadId: threadId,
          status: 'READ'  // Mark message as read when replying
        }
      })
    }

    // Create the reply
    await prisma.reply.create({
      data: {
        content,
        threadId,
        userId: session.user.id
      }
    })

    revalidatePath(`/admin/messages/${messageId}`)
    return { success: true }
  } catch (error) {
    console.error('Error submitting reply:', error)
    return {
      success: false,
      error: "Failed to send reply. Please try again."
    }
  }
}