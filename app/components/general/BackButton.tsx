// app/components/general/BackButton.tsx
"use client"

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'
import { ReactNode } from "react"

interface BackButtonProps {
    href: string
    text?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon"
    icon?: ReactNode
    className?: string
}

export function BackButton({
    href,
    text = "Back to Site",
    variant = "outline",
    size = "sm",
    icon = <ChevronLeft className="h-4 w-4" />,
    className
}: BackButtonProps) {
    return (
        <Button 
            variant={variant} 
            size={size}
            className={cn(
                "group gap-2 transition-all duration-200",
                "hover:bg-primary hover:text-primary-foreground",
                className
            )}
            asChild
        >
            <Link href={href}>
                {icon && (
                    <span className="transition-transform duration-200 group-hover:-translate-x-1">
                        {icon}
                    </span>
                )}
                <span>{text}</span>
            </Link>
        </Button>
    )
}