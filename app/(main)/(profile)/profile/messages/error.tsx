// app/(main)/(profile)/profile/messages/error.tsx

'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.message || 'Something went wrong while loading the message.'}
        </AlertDescription>
      </Alert>
      <Button onClick={reset}>Try again</Button>
    </div>
  )
}