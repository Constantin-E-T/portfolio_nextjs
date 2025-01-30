// app/(mainLayout)/layout.tsx

import { ReactNode } from 'react';
import Header from '@/components/layout/header';
import Footer from '../components/layout/footer';

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return <div className="flex min-h-screen flex-col">
        <Header />
        {children}
        <Footer />
    </div>;
}