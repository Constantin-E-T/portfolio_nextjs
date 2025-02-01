// app/(mainLayout)/layout.tsx

import { ReactNode } from 'react';
import { Navbar } from '@/app/components/layout/Navbar';
// import { Footer } from '@/components/layout/Footer';  

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return <div className="flex min-h-screen flex-col">
        <Navbar />
        {children}
        {/* <Footer /> */}
    </div>;
}