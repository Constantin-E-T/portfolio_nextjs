// app/components/messages/auth/UserReplyForm.tsx
"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { submitUserReply } from "@/app/actions/messages/auth/reply"

interface ReplyFormProps {
  messageId: string;
  threadId?: string | null;
  onCancel: () => void;
}

interface ReplyState {
  success: boolean;
  error?: string;
}

const initialState: ReplyState = {
  success: false,
  error: undefined
}

export function UserReplyForm({ messageId, threadId, onCancel }: ReplyFormProps) {
  const [state, setState] = useState<ReplyState>(initialState);

  const formAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append('messageId', messageId);
    if (threadId) formData.append('threadId', threadId);

    try {
      await submitUserReply(formData);
      setState({ success: true });
    } catch (error) {
      if (error instanceof Error) {
        setState({ success: false, error: error.message });
      } else {
        setState({ success: false, error: String(error) });
      }
    }
  }
  
  if (state?.success) {
    return (
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-sm font-medium text-primary">Your reply has been sent!</p>
      </div>
    )
  }
  
  return (
    <form onSubmit={formAction} className="space-y-4">
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