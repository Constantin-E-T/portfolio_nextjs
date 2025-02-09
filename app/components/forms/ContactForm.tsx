// app/components/forms/ContactForm.tsx
'use client'

import { useActionState } from "react" // Updated import
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { GeneralSubmitButton } from "../general/SubmitButtons"
import { submitMessage } from "@/app/actions/messages"

const initialState = {
  success: false,
  error: undefined
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitMessage, initialState) // Updated hook

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get in Touch</CardTitle>
        <CardDescription>Send me a message and I&apos;ll get back to you as soon as possible.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="What's this about?"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Your message here..."
            />
          </div>
          
          {state?.error && (
            <p className="text-sm text-destructive">{state.error}</p>
          )}
          {state?.success && (
            <p className="text-sm text-green-600 dark:text-green-500">Message sent successfully!</p>
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


