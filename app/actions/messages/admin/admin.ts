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

export async function batchUpdateMessageStatus(messageIds: string[], status: MessageStatus) {
  const session = await auth()
  
  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.$transaction(
      messageIds.map(id => 
        prisma.message.update({
          where: { id },
          data: { status }
        })
      )
    )

    revalidatePath("/admin/messages")
    return { success: true }
  } catch (error) {
    console.error("Failed to update messages status:", error)
    return { success: false, error: "Failed to update messages status" }
  }
}

export async function batchDeleteMessages(messageIds: string[]) {
  const session = await auth()
  
  if (!session?.user) {
    throw new Error("Unauthorized")
  }

  try {
    await prisma.message.deleteMany({
      where: {
        id: {
          in: messageIds
        }
      }
    })

    revalidatePath("/admin/messages")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete messages:", error)
    return { success: false, error: "Failed to delete messages" }
  }
}
