// app/actions/messages/auth/reply.ts
"use server"

import { auth } from "@/app/utils/auth"
import { prisma } from "@/app/utils/db"
import { revalidatePath } from "next/cache"

interface ReplyResponse {
  success: boolean;
  error?: string;
}

export async function submitUserReply(formData: FormData): Promise<ReplyResponse> {
  try {
    const session = await auth()
    if (!session?.user) {
      return {
        success: false,
        error: "You must be logged in to reply"
      }
    }

    const content = formData.get('content') as string
    const messageId = formData.get('messageId') as string
    const threadId = formData.get('threadId') as string | null

    // Validate content
    if (!content || content.trim().length === 0) {
      return {
        success: false,
        error: "Reply content is required"
      }
    }

    // Find the message and verify ownership
    const message = await prisma.message.findUnique({
      where: { 
        id: messageId,
        userId: session.user.id // Ensure the user owns this message
      }
    })

    if (!message) {
      return {
        success: false,
        error: "Message not found or you don't have permission"
      }
    }

    // Verify thread exists (users can't create threads, only respond to existing ones)
    if (!threadId) {
      return {
        success: false,
        error: "You can only reply to ongoing conversations"
      }
    }

    // Create the reply
    await prisma.reply.create({
      data: {
        content,
        threadId,
        userId: session.user.id
      }
    })

    // Update thread status if needed
    await prisma.messageThread.update({
      where: { id: threadId },
      data: { status: 'UNREAD' } // Mark as unread for admin to notice
    })

    revalidatePath(`/profile/messages/${messageId}`)
    return { success: true }
  } catch (error) {
    console.error('Error submitting reply:', error)
    return {
      success: false,
      error: "Failed to send reply. Please try again."
    }
  }
}