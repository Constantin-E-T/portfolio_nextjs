// app/(main)/messages/lookup/page.tsx
import { MessageLookupForm } from "@/components/messages/LookupForm"

export const metadata = {
  title: 'Message Lookup | Constantin Emilian',
  description: 'Look up the status of your message',
}

export default function MessageLookupPage() {
  return (
    <div className="container max-w-xl py-20">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Message Lookup</h1>
          <p className="text-muted-foreground">
            Track the status of your message using your reference number
          </p>
        </div>

        <MessageLookupForm />
      </div>
    </div>
  )
}