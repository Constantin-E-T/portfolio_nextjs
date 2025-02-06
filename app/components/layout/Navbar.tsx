// app/components/layout/Navbar.tsx
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo/logo.svg";
import { Button } from "../ui/button";
import { ThemeToggle } from "../general/ThemeToggle";
import { auth } from "@/app/utils/auth";
import { NavLinks } from "./NavLinks";
import { MobileNav } from "./MobileNav";
import { UserNav } from "./UserNav";

export async function Navbar() {
    const session = await auth();
    const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <Link 
                            href="/" 
                            className="text-xl font-bold relative group"
                        >
                            <span className="relative">
                                <Image src={Logo} alt="Logo" className="size-20" />
                            </span>
                        </Link>
                        <MobileNav isAdmin={isAdmin} />

                    </div>

                    {/* Desktop Navigation */}
                    <NavLinks />

                    {/* Right Side - Auth & Theme */}
                    <div className="flex items-center gap-4">
                        {session?.user ? (
                            <UserNav user={session.user} isAdmin={isAdmin} />
                        ) : ( 
                            <Link href="/login" className="hidden md:block">
                                <Button variant="outline">Login</Button>
                            </Link>
                        )}
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}