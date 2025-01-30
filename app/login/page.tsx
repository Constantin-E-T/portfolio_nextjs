import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo/logo.svg';



export default function Login() {
    return (
        <div className="min-h-screen w-screen flex items-center justify-center">
            <div className="w-full flex max-w-sm flex-col items-center justify-center">
                <Link href="/" className="flex items-center gap-2">
                    <Image src={Logo} alt="Logo" className="size-24" />
                   <h1 className="text-2xl font-bold">CONN<span className="text-primary">DIGITAL</span></h1> 
                </Link>
            </div>
        </div>
    );
    } 