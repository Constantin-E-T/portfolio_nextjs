// middleware.ts
import { NextResponse } from 'next/server'
import { auth } from '@/app/utils/auth'
 
export default auth((req) => {
  // Check if the user is trying to access admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // We'll verify admin status through the token
    const token = req.auth?.user
    
    // If no token exists, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // For now, we'll use email to verify admin status
    // Later we can add isAdmin field to the database
    const isAdmin = token.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
    
    if (!isAdmin) {
      // If not admin, redirect to home
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
  
  return NextResponse.next()
})

// Optionally configure middleware to only run on admin routes
export const config = {
  matcher: '/admin/:path*'
}