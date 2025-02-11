// app/components/messages/ReferenceDisplay.tsx
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"

interface ReferenceDisplayProps {
  reference: string
}

export function ReferenceDisplay({ reference }: ReferenceDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reference)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
        {reference}
      </code>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 transition-all"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">
          {copied ? 'Copied!' : 'Copy reference number'}
        </span>
      </Button>
    </div>
  )
}