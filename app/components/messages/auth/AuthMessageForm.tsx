// app/components/messages/auth/AuthMessageForm.tsx
"use client"

import { useFormState } from "react-dom"
import { submitAuthMessage } from "@/app/actions/messages/auth/submit"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { GeneralSubmitButton } from "@/components/general/SubmitButtons"

const initialState = {
  success: false,
  error: undefined,
  messageId: undefined
}

export function AuthMessageForm() {
  const [state, formAction] = useFormState(submitAuthMessage, initialState)

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Input
          name="subject"
          placeholder="Subject"
          required
        />
      </div>

      <div className="space-y-2">
        <Textarea
          name="message"
          placeholder="Your message"
          required
          rows={5}
        />
      </div>

      <GeneralSubmitButton
        text="Send Message"
        width="w-full"
      />
    </form>
  )
}