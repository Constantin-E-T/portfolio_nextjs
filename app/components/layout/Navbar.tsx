import Link from "next/link";
import Logo from "@/public/logo/logo.svg";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "../general/ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";

export async function Navbar() {
    const session = await auth();
    
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link 
                        href="/" 
                        className="text-xl font-bold relative group"
                    >
                        <span className="relative">
                            <Image src={Logo} alt="Logo" className="size-20" />
                            <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                        </span>
                    </Link>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        {session?.user ? (
                            <form action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/"});
                              }}>
                              <Button className={buttonVariants({ variant: "secondary" })}>Logout</Button>
                            </form>
                        ) : ( 
                            <Link href="/login" className={buttonVariants({ variant: "outline" })}>
                                Login
                            </Link>
                        )}
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}