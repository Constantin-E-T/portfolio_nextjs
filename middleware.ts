// middleware.ts
import { NextResponse } from 'next/server'
import { auth } from '@/app/utils/auth'
 
export default auth((req) => {
  // Debug log to verify environment variable
  console.log('Admin Check Values:', {
    adminEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    pathname: req.nextUrl.pathname
  })

  if (req.nextUrl.pathname.startsWith('/admin')) {
    const user = req.auth?.user
    
    if (!user) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Add debug log for user email comparison
    console.log('Email Comparison:', {
      userEmail: user.email,
      configuredEmail: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      match: user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
    })

    // Simplified admin check
    if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: '/admin/:path*'
}