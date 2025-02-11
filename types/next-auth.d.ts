// types/next-auth.d.ts

import 'next-auth'
import { Role } from '@prisma/client'
import { DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface User extends DefaultUser {
    role?: Role
    id: string
  }

  interface Session {
    user: {
      id: string
      role: Role
      email?: string | null
      name?: string | null
      image?: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: Role
    id: string
  }
}