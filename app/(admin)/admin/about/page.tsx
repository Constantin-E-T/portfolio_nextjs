import { User } from 'lucide-react';
import ComingSoon from '@/components/ui/coming-soon';

export const dynamic = 'force-dynamic'

export default function AboutPage() {
  return (
    <ComingSoon
      title="About Page Management Coming Soon"
      description="Manage your personal and professional information."
      icon={<User className="w-6 h-6 text-primary" />}
      expectedDate="Expected completion: Q2 2025"
      features={[
        {
          title: "Profile Editor",
          description: "Update your personal and professional details"
        },
        {
          title: "Skills Management",
          description: "Manage your technical skills and expertise"
        },
        {
          title: "Experience Timeline",
          description: "Create and edit your professional timeline"
        },
        {
          title: "Education & Certifications",
          description: "Manage your educational background and certifications"
        }
      ]}
    />
  );
}