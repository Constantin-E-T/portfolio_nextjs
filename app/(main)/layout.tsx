// app/(main)/layout.tsx
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/FooterMain";
import { PageTransition } from "@/app/components/general/PageTransition";
import { LoginConfetti } from "@/components/general/LoginConfetti";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <LoginConfetti />
      <Navbar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}