// app/components/messages/admin/MessageActions.tsx
"use client"

import { useState } from "react"
import { MessageStatus } from "@prisma/client"
import { MoreVertical, Archive, Trash2, CheckCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { updateMessageStatus, deleteMessage } from "@/app/actions/messages/admin/admin"

interface MessageActionsProps {
  messageId: string
  currentStatus: MessageStatus
}

export function MessageActions({ messageId, currentStatus }: MessageActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusUpdate = async (status: MessageStatus) => {
    if (isUpdating) return
    setIsUpdating(true)
    
    try {
      const result = await updateMessageStatus(messageId, status)
      if (!result.success) {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleteDialogOpen(false)
    setIsUpdating(true)
    
    try {
      const result = await deleteMessage(messageId)
      if (!result.success) {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error("Failed to delete message:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {currentStatus === "UNREAD" && (
            <DropdownMenuItem 
              onClick={() => handleStatusUpdate("READ")}
              disabled={isUpdating}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Read
            </DropdownMenuItem>
          )}
          {currentStatus !== "ARCHIVED" && (
            <DropdownMenuItem 
              onClick={() => handleStatusUpdate("ARCHIVED")}
              disabled={isUpdating}
            >
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setIsDeleteDialogOpen(true)}
            disabled={isUpdating}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isUpdating}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}