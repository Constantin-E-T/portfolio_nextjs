// app/(main)/(profile)/layout.tsx
import { auth } from "@/app/utils/auth"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  UserCircle, 
  MessageSquare, 
  Settings 
} from "lucide-react"

const profileNavItems = [
  {
    href: "/profile",
    label: "Profile",
    icon: UserCircle
  },
  {
    href: "/profile/messages",
    label: "Messages",
    icon: MessageSquare
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings
  }
]

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3">
          <Card className="p-4">
            <nav className="space-y-2">
              {profileNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              ))}
            </nav>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="col-span-12 md:col-span-9">
          <Card className="p-6">
            {children}
          </Card>
        </main>
      </div>
    </div>
  )
}