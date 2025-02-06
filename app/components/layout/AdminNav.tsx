"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  User, 
  Mail,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  href: string
  label: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { href: '/admin/about', label: 'About', icon: User },
  { href: '/admin/contact', label: 'Contact', icon: Mail },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 transition-colors",
              isActive ? 
                "bg-primary/10 text-primary hover:bg-primary/20" : 
                "hover:bg-primary/10"
            )}
            asChild
          >
            <Link href={item.href}>
              <Icon className={cn(
                "h-4 w-4",
                isActive && "text-primary"
              )} />
              {item.label}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}