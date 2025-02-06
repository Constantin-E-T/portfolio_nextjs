// middleware.ts
import { NextResponse } from 'next/server'
import { auth } from '@/app/utils/auth'
 
export default auth((req) => {
  // Debug environment variables in production
  console.log('Environment Check:', {
    isDevelopment: process.env.NODE_ENV === 'development',
    adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    currentUrl: req.nextUrl.pathname
  })

  // Check if the user is trying to access admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const user = req.auth?.user
    
    // Debug authentication status
    console.log('Auth Check:', {
      hasUser: !!user,
      userEmail: user?.email,
      expectedAdminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL
    })
    
    // If no user exists, redirect to login
    if (!user) {
      console.log('No user found, redirecting to login')
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Verify admin status using email
    const isAdmin = user.email?.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase()
    
    // Log admin check result
    console.log('Admin Check:', {
      userEmail: user.email,
      adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      isAdmin: isAdmin
    })
    
    if (!isAdmin) {
      console.log('User not admin, redirecting to home')
      return NextResponse.redirect(new URL('/', req.url))
    }

    console.log('Admin access granted')
  }
  
  return NextResponse.next()
})

// Configure middleware to run on admin routes
export const config = {
  matcher: [
    '/admin/:path*'  // Match all admin routes
  ]
}