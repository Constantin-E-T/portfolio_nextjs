// app/actions/messages/admin/admin.ts
"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/app/utils/db"
import { auth } from "@/app/utils/auth"
import { MessageStatus } from "@prisma/client"

export async function updateMessageStatus(messageId: string, status: MessageStatus) {
  const session = await auth()
  
  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.message.update({
      where: { id: messageId },
      data: { status }
    })

    revalidatePath("/admin/messages")
    return { success: true }
  } catch (error) {
    console.error("Failed to update message status:", error)
    return { success: false, error: "Failed to update message status" }
  }
}

export async function deleteMessage(messageId: string) {
  const session = await auth()
  
  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.message.delete({
      where: { id: messageId }
    })

    revalidatePath("/admin/messages")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete message:", error)
    return { success: false, error: "Failed to delete message" }
  }
}