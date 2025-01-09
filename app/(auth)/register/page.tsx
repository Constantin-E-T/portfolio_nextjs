// app/(auth)/register/page.tsx
import { UserPlus } from 'lucide-react';
import ComingSoon from '@/components/ui/coming-soon';

export default function RegisterPage() {
  return (
    <ComingSoon 
      title="Registration Coming Soon"
      description="We're building a streamlined registration process for our platform."
      icon={<UserPlus className="w-6 h-6 text-primary" />}
      expectedDate="Expected completion: Q2 2025"
      features={[
        {
          title: "Easy Onboarding",
          description: "Simple and intuitive registration process with minimal steps"
        },
        {
          title: "Profile Customization",
          description: "Personalize your profile with custom details and preferences"
        },
        {
          title: "Email Verification",
          description: "Secure account verification through email confirmation"
        },
        {
          title: "Social Registration",
          description: "Quick signup using your existing social media accounts"
        }
      ]}
      backLink="/"
      backText="Back to Home"
    />
  );
}