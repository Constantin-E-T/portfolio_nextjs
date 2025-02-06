// app/(main)/layout.tsx
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/FooterMain";
import { PageTransition } from "@/app/components/general/PageTransition";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </div>
  );
}