// app/actions/messages/submit.ts
'use server'

import { prisma } from "@/app/utils/db"
import { auth } from "@/app/utils/auth"
import { MessageResponse } from "../types"
import { validateMessageFields, checkRateLimit } from "./utils/validation"
import { revalidatePath } from "next/cache"

export async function submitMessage(
  _prevState: MessageResponse | null, 
  formData: FormData
): Promise<MessageResponse> {
  try {
    const session = await auth()
    
    // Extract form data
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const content = formData.get('message') as string

    // Validate fields first
    const validation = await validateMessageFields(name, email, subject, content)
    if (!validation.valid || !validation.sanitized) {
      return {
        success: false,
        error: validation.error
      }
    }

    // Check rate limit after validation
    const rateLimit = await checkRateLimit(validation.sanitized.email, prisma)
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: rateLimit.error,
        remainingTime: rateLimit.remainingTime
      }
    }

    // Create message with sanitized data
    const message = await prisma.message.create({
      data: {
        ...validation.sanitized,
        status: "UNREAD",
        ...(session?.user?.id && { userId: session.user.id })
      }
    })

    // Only revalidate user's profile path if they're authenticated
    if (session?.user) {
      revalidatePath('/profile/messages')
    }

    return {
      success: true,
      messageId: message.id,
      // Only provide redirect path if user is authenticated
      ...(session?.user && { redirect: '/profile/messages' })
    }

  } catch (error) {
    console.error('Error submitting message:', error)
    return {
      success: false,
      error: "Failed to send message. Please try again later."
    }
  }
}