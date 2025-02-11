// middleware.ts

import { NextResponse } from 'next/server'
import { auth } from '@/app/utils/auth'
import { hasRequiredRole } from '@/lib/types/auth'

export default auth(async (req) => {


  // Handle old routes and redirects
  const oldRoutes = ['/register']
  if (oldRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Admin routes protection
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const user = req.auth?.user
    
    if (!user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (!hasRequiredRole(user.role, 'ADMIN')) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
  
  // Handle trailing slashes
  if (req.nextUrl.pathname.endsWith('/') && req.nextUrl.pathname.length > 1) {
    const withoutTrailingSlash = req.nextUrl.pathname.slice(0, -1)
    const url = new URL(withoutTrailingSlash, req.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/register',
    '/:path*/',
  ]
}