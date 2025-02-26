// app/components/messages/admin/ReplyForm.tsx
"use client"

import { useActionState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { submitAdminReply } from "@/app/actions/authentication/admin/reply"

// Define proper types for the component props
interface ReplyFormProps {
  messageId: string;
  threadId?: string | null;
  onCancel: () => void;
}

// Define the initial state type
interface ReplyState {
  success: boolean;
  error?: string;
}

const initialState: ReplyState = {
  success: false,
  error: undefined
}

export function ReplyForm({ messageId, threadId, onCancel }: ReplyFormProps) {
  const [state, formAction] = useActionState(
    async (state: ReplyState, formData: FormData) => {
      formData.append('messageId', messageId);
      if (threadId) formData.append('threadId', threadId);
      const response = await submitAdminReply(formData);
      return { ...state, success: response.success, error: response.error };
    }, 
    initialState
  )
  
  if (state?.success) {
    return (
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm font-medium text-primary">Reply sent successfully!</p>
      </div>
    )
  }
  
  return (
    <form action={formAction} className="space-y-4">
      <Textarea
        name="content"
        placeholder="Type your reply..."
        required
        rows={5}
      />
      
      {state?.error && (
        <p className="text-sm text-destructive">{state.error}</p>
      )}
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Send Reply
        </Button>
      </div>
    </form>
  )
}