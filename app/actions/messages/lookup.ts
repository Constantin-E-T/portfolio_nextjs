// app/actions/messages/lookup.ts
'use server'

import { prisma } from "@/app/utils/db"
import { MessageLookupResult } from "../types"
import { z } from "zod"

const lookupSchema = z.object({
  reference: z.string()
    .min(1, "Reference number is required")
    .max(100, "Invalid reference number")
})

export async function lookupMessage(
  _prevState: MessageLookupResult, 
  formData: FormData
): Promise<MessageLookupResult> {
  try {
    const reference = formData.get('reference') as string
    
    // Validate reference number
    const validation = lookupSchema.safeParse({ reference })
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.errors[0].message
      }
    }

    // Look up the message
    const message = await prisma.message.findUnique({
      where: { 
        id: reference
      },
      select: {
        status: true,
        subject: true,
        createdAt: true
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
        status: message.status,
        subject: message.subject,
        createdAt: message.createdAt
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