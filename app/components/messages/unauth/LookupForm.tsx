// app/components/messages/LookupForm.tsx
'use client'

import { useEffect, useTransition } from "react"
import { useActionState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { GeneralSubmitButton } from "../../general/SubmitButtons"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageLookupResult } from "@/app/actions/messages/shared/types/types"
import { lookupMessage } from "@/app/actions/messages/unauth/lookup"

const initialState: MessageLookupResult = {
  success: false,
  error: undefined,
  message: undefined
}

interface MessageLookupFormProps {
  defaultReference?: string
}

export function MessageLookupForm({ defaultReference }: MessageLookupFormProps) {
  const [state, formAction] = useActionState(lookupMessage, initialState)
  const [isPending, startTransition] = useTransition()

  // Auto-lookup for default reference
  useEffect(() => {
    if (defaultReference) {
      const formData = new FormData()
      formData.set('reference', defaultReference)
      startTransition(() => {
        formAction(formData)
      })
    }
  }, [defaultReference, formAction])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Status</CardTitle>
        <CardDescription>
          You can use this form anytime to check your message status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="reference"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Reference Number
            </label>
            <input
              id="reference"
              name="reference"
              type="text"
              required
              defaultValue={defaultReference}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your reference number"
            />
          </div>

          {state?.error && (
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {state?.success && state.message && (
            <div className="rounded-lg border bg-card p-4 space-y-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm text-muted-foreground">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium 
                    ${state.message.status === 'UNREAD' ? 'bg-yellow-100 text-yellow-800' :
                      state.message.status === 'READ' ? 'bg-blue-100 text-blue-800' :
                        state.message.status === 'ARCHIVED' ? 'bg-gray-100 text-gray-800' :
                          'bg-red-100 text-red-800'}`}>
                    {state.message.status.toLowerCase()}
                  </span>
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Subject</p>
                <p className="text-sm text-muted-foreground">{state.message.subject}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">Sent Date</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(state.message.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          <GeneralSubmitButton
            text={isPending ? "Checking..." : "Check Status"}
            width="w-full"
            disabled={isPending}
          />
        </form>
      </CardContent>
    </Card>
  )
}