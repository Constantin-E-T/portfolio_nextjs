// lib/types/auth.ts
import { Role } from '@prisma/client'

// Custom types for our application
export interface UserSession {
  id: string
  role: Role
  email?: string | null
  name?: string | null
  image?: string | null
}

// Utility functions for role checking
export function isAdmin(role: Role): boolean {
  return role === 'ADMIN' || role === 'OWNER'
}

export function isOwner(role: Role): boolean {
  return role === 'OWNER'
}

// Type guard
export function hasRequiredRole(role: Role, requiredRole: Role): boolean {
  if (requiredRole === 'OWNER') return role === 'OWNER'
  if (requiredRole === 'ADMIN') return role === 'ADMIN' || role === 'OWNER'
  return true
}