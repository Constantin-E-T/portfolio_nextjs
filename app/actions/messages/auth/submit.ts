// app/actions/messages/auth/submit.ts
'use server'

import { auth } from "@/app/utils/auth"
import { prisma } from "@/app/utils/db"
import { MessageResponse } from "@/app/actions/messages/shared/types/types"
import { validateMessageFields } from "@/app/actions/messages/shared/utils/validation"
import { revalidatePath } from "next/cache"

export async function submitAuthMessage(
  _prevState: MessageResponse | null,
  formData: FormData
): Promise<MessageResponse> {
  try {
    const session = await auth()
    if (!session?.user) {
      return {
        success: false,
        error: "Unauthorized"
      }
    }

    const subject = formData.get('subject') as string
    const content = formData.get('message') as string

    const validation = await validateMessageFields(
      session.user.name || 'Anonymous',
      session.user.email || '',
      subject,
      content
    )
    
    if (!validation.valid || !validation.sanitized) {
      return {
        success: false,
        error: validation.error
      }
    }

    const message = await prisma.message.create({
      data: {
        ...validation.sanitized,
        userId: session.user.id,
        status: "UNREAD"
      }
    })

    revalidatePath('/profile/messages')

    return {
      success: true,
      messageId: message.id,
      redirect: '/profile/messages'
    }

  } catch (error) {
    console.error('Error submitting message:', error)
    return {
      success: false,
      error: "Failed to send message. Please try again later."
    }
  }
}