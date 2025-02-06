// app/(main)/settings/page.tsx

import { Settings } from 'lucide-react';
import ComingSoon from '@/components/ui/coming-soon';

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Settings Coming Soon"
      description="Personalize your experience and manage your account preferences."
      icon={<Settings className="w-6 h-6 text-primary" />}
      expectedDate="Expected completion: Q2 2025"
      features={[
        {
          title: "Profile Settings",
          description: "Update your personal information and preferences"
        },
        {
          title: "Appearance",
          description: "Customize your viewing experience"
        },
        {
          title: "Notification Preferences",
          description: "Manage how you receive updates"
        },
        {
          title: "Security Settings",
          description: "Control your account security and privacy"
        }
      ]}
    />
  );
}