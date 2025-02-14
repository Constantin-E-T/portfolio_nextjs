// app/(auth)/login/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo/logo.svg';
import { LoginForm } from '@/app/components/forms/LoginForm';



export default function Login() {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <div className="w-full flex max-w-sm flex-col items-center justify-center">
                <Link href="/" className="flex items-center gap-2 self-center">
                    <Image
                        src={Logo}
                        alt="Logo"
                        className="size-24"
                        priority={true}  
                        width={96}      
                        height={96}
                    />
                    <h1 className="text-2xl font-bold">CONN<span className="text-primary">DIGITAL</span></h1>
                </Link>
                {/* Login Form */}
                <LoginForm />
            </div>
        </div>
    );
} 