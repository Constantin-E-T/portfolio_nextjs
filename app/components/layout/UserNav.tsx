"use client"

import { User } from 'next-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { handleSignOut } from "@/app/actions/auth"
import { useRouter } from 'next/navigation'

interface UserNavProps {
  user: User;
  isAdmin: boolean;
}

export function UserNav({ user, isAdmin }: UserNavProps) {
  const router = useRouter()

  const handleAdminClick = () => {
    router.push('/admin')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full"
          aria-label="Open user menu"
        >
          <Image
            src={user.image || `https://avatar.vercel.sh/${user.email}`}
            alt={user.name || "User avatar"}
            className="rounded-full object-cover"
            fill
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 mt-2 bg-background/10 backdrop-blur-md border-border/40 shadow-lg" 
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            {isAdmin && (
              <p className="text-xs font-medium text-primary">
                Admin
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/40" />
        
        {isAdmin && (
          <>
            <DropdownMenuItem 
              onSelect={handleAdminClick}
              className="hover:bg-primary/10"
            >
              Admin Dashboard
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/40" />
          </>
        )}
        
        <DropdownMenuItem asChild>
          <Link href="/profile" className="w-full text-muted-foreground hover:bg-primary/10">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings" className="w-full text-muted-foreground hover:bg-primary/10">
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/40" />
        <form action={handleSignOut}>
          <DropdownMenuItem
            className="text-red-600 cursor-pointer hover:bg-red-500/10"
            asChild
          >
            <button type="submit" className="w-full text-left">
              Sign out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}