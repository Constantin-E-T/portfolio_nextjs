// app/(main)/layout.tsx
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/FooterMain";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}