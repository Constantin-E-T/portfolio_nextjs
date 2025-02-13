// app/components/sections/contact/contact-content.tsx
import ContactForm from '@/app/components/sections/contact/ContactForm'
import { auth } from "@/app/utils/auth"

export async function ContactContent() {
  const session = await auth()

  return <ContactForm session={session} />
}
