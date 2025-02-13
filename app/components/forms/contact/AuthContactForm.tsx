'use client'

// app/components/forms/contact/AuthContactForm.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { GeneralSubmitButton } from "../../general/SubmitButtons"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Session } from "next-auth"
import { useActionState } from "react" 
import { submitAuthMessage } from "@/app/actions/messages/auth/submit"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const initialState = {
  success: false,
  error: undefined,
  messageId: undefined,
  redirect: undefined
}

export function AuthContactForm({ session }: { session: Session }) {
  const router = useRouter()
  const [state, formAction] = useActionState(submitAuthMessage, initialState)

  useEffect(() => {
    if (state?.success) {
      if (state.redirect) {
        router.push(state.redirect)
      } else if (state.messageId) {
        router.push(`/thank-you?ref=${state.messageId}`)
      }
    }
  }, [state?.success, state?.redirect, state?.messageId, router])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send a Message</CardTitle>
        <CardDescription>
          Logged in as {session.user.email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {/* Pre-filled and disabled name field */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium leading-none">
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              defaultValue={session.user.name || ''}
              disabled
              className="bg-muted"
            />
          </div>

          {/* Pre-filled and disabled email field */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={session.user.email || ''}
              disabled
              className="bg-muted"
            />
          </div>

          {/* Subject field */}
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium leading-none">
              Subject
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              required
              placeholder="What's this about?"
            />
          </div>

          {/* Message field */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium leading-none">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder="Your message here..."
              rows={5}
            />
          </div>

          {state?.error && (
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <GeneralSubmitButton
            text="Send Message"
            width="w-full"
          />
        </form>
      </CardContent>
    </Card>
  )
}