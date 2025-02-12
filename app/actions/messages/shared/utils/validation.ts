// app/actions/messages/shared/utils/validation.ts

import { z } from "zod" 
import { PrismaClient } from "@prisma/client"

// Constants for validation
const MAX_LENGTHS = {
  name: 100,
  subject: 200,
  content: 5000,
  email: 255
} as const

// Rate limiting setup
const RATE_LIMIT = {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5 // max 5 messages per hour
} as const

// Validation schema
const messageSchema = z.object({
  name: z.string()
    .min(1, "Name is required")
    .max(MAX_LENGTHS.name, `Name must be less than ${MAX_LENGTHS.name} characters`)
    .trim(),
  email: z.string()
    .email("Please enter a valid email address")
    .max(MAX_LENGTHS.email, `Email must be less than ${MAX_LENGTHS.email} characters`)
    .trim()
    .toLowerCase(),
  subject: z.string()
    .min(1, "Subject is required")
    .max(MAX_LENGTHS.subject, `Subject must be less than ${MAX_LENGTHS.subject} characters`)
    .trim(),
  content: z.string()
    .min(1, "Message is required")
    .max(MAX_LENGTHS.content, `Message must be less than ${MAX_LENGTHS.content} characters`)
    .trim()
})

type MessageInput = z.infer<typeof messageSchema>

export async function validateMessageFields(
  name: string,
  email: string,
  subject: string,
  content: string
): Promise<{ valid: boolean; error?: string; sanitized?: MessageInput }> {
  try {
    const sanitized = messageSchema.parse({
      name,
      email,
      subject,
      content
    })

    return { valid: true, sanitized }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { valid: false, error: error.errors[0].message }
    }
    return { valid: false, error: "Invalid input" }
  }
}

export async function checkRateLimit(
  email: string,
  prisma: PrismaClient
): Promise<{ allowed: boolean; error?: string; remainingTime?: number }> {
  try {
    const hourAgo = new Date(Date.now() - RATE_LIMIT.windowMs)
    
    // Get messages sent in the last hour
    const recentMessages = await prisma.message.findMany({
      where: {
        email: email.toLowerCase(), // Ensure case-insensitive comparison
        createdAt: {
          gte: hourAgo
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        createdAt: true
      }
    })

    if (recentMessages.length >= RATE_LIMIT.maxRequests) {
      // Calculate time until oldest message expires from window
      const oldestMessageTime = recentMessages[recentMessages.length - 1].createdAt.getTime()
      const timeUntilReset = oldestMessageTime + RATE_LIMIT.windowMs - Date.now()
      
      const minutesRemaining = Math.ceil(timeUntilReset / (60 * 1000))
      
      return {
        allowed: false,
        error: `Rate limit exceeded. Please wait ${minutesRemaining} minutes before sending another message.`,
        remainingTime: timeUntilReset
      }
    }

    return { 
      allowed: true,
      remainingTime: 0
    }
  } catch (error) {
    console.error('Rate limit check error:', error)
    // In case of error, we'll still allow the message but log the error
    return { allowed: true, remainingTime: 0 }
  }
}