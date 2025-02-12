// app/(main)/(profile)/settings/page.tsx
import { Settings } from 'lucide-react';
import ComingSoon from '@/components/ui/coming-soon';

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Settings Page Coming Soon"
      description="Customize your account settings and preferences."
      icon={<Settings className="w-6 h-6 text-primary" />}
      expectedDate="Expected completion: Q2 2025"
      features={[
        {
          title: "Account Settings",
          description: "Manage your account details and security preferences"
        },
        {
          title: "Notification Settings",
          description: "Control how and when you receive notifications"
        },
        {
          title: "Privacy Settings",
          description: "Manage your privacy and data sharing preferences"
        },
        {
          title: "Theme Settings",
          description: "Customize your visual experience"
        }
      ]}
    />
  );
}