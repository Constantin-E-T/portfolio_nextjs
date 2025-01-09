// app/(auth)/login/page.tsx
import { LockKeyhole } from 'lucide-react';
import ComingSoon from '@/components/ui/coming-soon';

export default function LoginPage() {
  return (
    <ComingSoon 
      title="Authentication Coming Soon"
      description="We're working hard to bring you a secure and seamless authentication experience."
      icon={<LockKeyhole className="w-6 h-6 text-primary" />}
      expectedDate="Expected completion: Q2 2025"
      features={[
        {
          title: "Secure Authentication",
          description: "Industry-standard security protocols and encryption"
        },
        {
          title: "OAuth Integration",
          description: "Sign in with Google, GitHub, and more"
        },
        {
          title: "Two-Factor Authentication",
          description: "Additional security layer for your account"
        }
      ]}
    />
  );
}