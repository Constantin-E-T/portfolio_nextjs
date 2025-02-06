// app/(main)/profile/page.tsx

import { UserCircle } from 'lucide-react';
import ComingSoon from '@/components/ui/coming-soon';

export default function ProfilePage() {
  return (
    <ComingSoon
      title="Profile Page Coming Soon"
      description="View and manage your personal profile and portfolio details."
      icon={<UserCircle className="w-6 h-6 text-primary" />}
      expectedDate="Expected completion: Q2 2025"
      features={[
        {
          title: "Profile Overview",
          description: "View and edit your public profile information"
        },
        {
          title: "Portfolio Management",
          description: "Manage your projects and contributions"
        },
        {
          title: "Activity History",
          description: "Track your interactions and contributions"
        },
        {
          title: "Connected Accounts",
          description: "Manage your linked social and professional accounts"
        }
      ]}
    />
  );
}