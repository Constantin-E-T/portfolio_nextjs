// app/components/messages/admin/BatchActions.tsx
"use client"

import { useMessagesStore } from "@/app/stores/messagesStore"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Archive, CheckSquare, Trash2 } from "lucide-react"
import { updateMessageStatus, deleteMessage } from "@/app/actions/messages/admin/admin"
import { useState } from "react"
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

export function BatchActions() {
  const { selectedMessages, clearSelection } = useMessagesStore()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const handleBatchStatusUpdate = async (status: 'READ' | 'ARCHIVED') => {
    if (isProcessing || selectedMessages.length === 0) return
    setIsProcessing(true)
    
    try {
      await Promise.all(
        selectedMessages.map(id => updateMessageStatus(id, status))
      )
      clearSelection()
    } catch (error) {
      console.error("Failed to update messages:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBatchDelete = async () => {
    if (isProcessing || selectedMessages.length === 0) return
    setIsProcessing(true)
    setIsDeleteDialogOpen(false)
    
    try {
      await Promise.all(
        selectedMessages.map(id => deleteMessage(id))
      )
      clearSelection()
    } catch (error) {
      console.error("Failed to delete messages:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (selectedMessages.length === 0) return null

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {selectedMessages.length} selected
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" disabled={isProcessing}>
              Batch Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => handleBatchStatusUpdate('READ')}
              disabled={isProcessing}
            >
              <CheckSquare className="mr-2 h-4 w-4" />
              Mark as Read
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleBatchStatusUpdate('ARCHIVED')}
              disabled={isProcessing}
            >
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isProcessing}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {selectedMessages.length} selected messages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isProcessing}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBatchDelete}
              disabled={isProcessing}
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