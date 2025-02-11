// app/(main)/thank-you/page.tsx

import { redirect } from 'next/navigation'
import { auth } from "@/app/utils/auth"
import { ThankYouContent } from "@/components/messages/ThankYouContent"

export const metadata = {
  title: 'Thank You | Message Sent',
  description: 'Your message has been sent successfully',
}

interface ThankYouPageProps {
  searchParams: Promise<{ ref?: string }>
}

export default async function ThankYou({
  searchParams,
}: ThankYouPageProps) {
  const session = await auth()
  const params = await searchParams
  const messageRef = params.ref

  // If user is authenticated, redirect them to their profile
  if (session?.user) {
    redirect('/profile/messages')
  }

  return (
    <div className="container max-w-2xl py-20">
      <ThankYouContent messageRef={messageRef} />
    </div>
  )
}