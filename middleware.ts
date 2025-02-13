// middleware.ts
import { NextResponse } from 'next/server'
import { auth } from '@/app/utils/auth'
import { hasRequiredRole } from '@/lib/types/auth'

export default auth(async (req) => {
  const isLoggedIn = !!req.auth?.user
  const isAuthPage = req.nextUrl.pathname.startsWith('/login')
  const isPublicPath = [
    '/',
    '/about',
    '/projects',
    '/blog',
    '/contact',
    '/messages/lookup',
    '/thank-you'
  ].includes(req.nextUrl.pathname)

  // Handle old routes and redirects
  const oldRoutes = ['/register']
  if (oldRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Redirect from auth pages if already logged in
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Redirect to login if accessing protected routes while logged out
  if (!isLoggedIn && !isPublicPath && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', req.url))
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

// Update matcher to include all protected routes
export const config = {
  matcher: [
    '/admin/:path*',
    '/register',
    '/:path*/',
    '/login',
    '/profile/:path*',
    '/settings/:path*',
    '/messages/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}