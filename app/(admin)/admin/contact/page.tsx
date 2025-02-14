import { Contact } from 'lucide-react';
import ComingSoon from '@/components/ui/coming-soon';

export const dynamic = 'force-dynamic'

export default function ContactPage() {
  return (
    <ComingSoon
      title="Contact Page Management Coming Soon"
      description="Manage your contact information and availability."
      icon={<Contact className="w-6 h-6 text-primary" />}
      expectedDate="Expected completion: Q2 2025"
      features={[
        {
          title: "Contact Details",
          description: "Update your contact information and social links"
        },
        {
          title: "Availability Settings",
          description: "Set your availability for meetings and calls"
        },
        {
          title: "Contact Form Settings",
          description: "Customize your contact form fields and validation"
        },
        {
          title: "Auto-Response Settings",
          description: "Configure automatic response messages"
        }
      ]}
    />
  );
}