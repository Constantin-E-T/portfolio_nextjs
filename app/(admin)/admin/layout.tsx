import { ReactNode } from 'react'
import Link from 'next/link'
import { auth } from '@/app/utils/auth'
import { Card } from '@/app/components/ui/card'
import { LayoutDashboard } from 'lucide-react'
import { AdminNav } from '@/app/components/layout/AdminNav'
import { BackButton } from "@/app/components/general/BackButton"

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const session = await auth()
  
  return (
    <div className="min-h-screen bg-muted/50">
      {/* Admin Navigation */}
      <nav className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center px-4">
          <Link 
            href="/admin" 
            className="flex items-center gap-2 font-bold hover:text-primary transition-colors"
          >
            <LayoutDashboard className="h-5 w-5" />
            Admin Dashboard
          </Link>
          
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              {session?.user?.email}
            </span>
            <BackButton 
              href="/"
              text="Back to Site"
              variant="outline"
              size="sm"
            />
          </div>
        </div>
      </nav>

      {/* Sidebar and Main Content */}
      <div className="container grid grid-cols-12 gap-6 py-8">
        {/* Sidebar */}
        <aside className="col-span-3">
          <Card className="sticky top-24 p-4 border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <AdminNav />
          </Card>
        </aside>

        {/* Main Content */}
        <main className="col-span-9">
          <Card className="p-6 border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {children}
          </Card>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout