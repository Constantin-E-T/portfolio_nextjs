// app/(main)/(profile)/profile/page.tsx
import { auth } from "@/app/utils/auth"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import MessageHistory from "@/components/messages/auth/MessageHistory"
import Link from "next/link";
import { 
  UserCircle, 
  Mail, 
  Calendar,
  Shield
} from "lucide-react"

export default async function ProfilePage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-start gap-6">
        <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
          {session.user.image ? (
            <Image 
              src={session.user.image} 
              alt={session.user.name || 'Profile'}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <UserCircle className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{session.user.name || 'Anonymous User'}</h1>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {session.user.email}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Member
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              {session.user.role.toLowerCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Messages */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent Messages</h2>
          <Button variant="outline" asChild>
            <Link href="/profile/messages">View All</Link>
          </Button>
        </div>
        <MessageHistory limit={5} />
      </Card>
    </div>
  )
}