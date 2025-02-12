// lib/hooks/use-user.ts
'use client'

import { useSession } from "next-auth/react"

export function useUser() {
  const { data: session, status } = useSession()
  
  return {
    user: session?.user || null,
    loading: status === "loading"
  }
}