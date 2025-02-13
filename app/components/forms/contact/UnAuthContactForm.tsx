// app/components/forms/ContactForm.tsx
'use client'

import { useActionState } from "react"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { GeneralSubmitButton } from "../../general/SubmitButtons"
import { submitMessage } from "@/app/actions/messages"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const initialState = {
  success: false,
  error: undefined,
  remainingTime: undefined,
  messageId: undefined,
  redirect: undefined
}

export function UnAuthContactForm() {
  const router = useRouter()
  const [state, formAction] = useActionState(submitMessage, initialState)
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined)

  // Handle redirects after successful submission
  useEffect(() => {
    if (state?.success) {
      if (state.redirect) {
        router.push(state.redirect)
      } else if (state.messageId) {
        router.push(`/thank-you?ref=${state.messageId}`)
      }
    }
  }, [state?.success, state?.redirect, state?.messageId, router])

  // Handle countdown timer for rate limit
  useEffect(() => {
    if (state?.remainingTime) {
      setTimeLeft(Math.ceil(state.remainingTime / (60 * 1000)))

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev && prev > 0) {
            return prev - 1
          }
          clearInterval(timer)
          return undefined
        })
      }, 60000)

      return () => clearInterval(timer)
    }
  }, [state?.remainingTime])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get in Touch</CardTitle>
        <CardDescription>
          Send me a message and I&apos;ll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="john@example.com"
              />
            </div>
          </div>

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
              <AlertDescription>
                {timeLeft
                  ? `${state.error} (${timeLeft} minutes remaining)`
                  : state.error
                }
              </AlertDescription>
            </Alert>
          )}

          <GeneralSubmitButton
            text="Send Message"
            width="w-full"
            disabled={timeLeft !== undefined}
          />
        </form>
      </CardContent>
    </Card>
  )
}