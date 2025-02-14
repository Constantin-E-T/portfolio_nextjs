import { FileText } from 'lucide-react';
import ComingSoon from '@/components/ui/coming-soon';

export const dynamic = 'force-dynamic'

export default function BlogPage() {
  return (
    <ComingSoon
      title="Blog Management Coming Soon"
      description="Create and manage your blog posts with a powerful editor."
      icon={<FileText className="w-6 h-6 text-primary" />}
      expectedDate="Expected completion: Q2 2025"
      features={[
        {
          title: "Rich Text Editor",
          description: "Write posts with a powerful WYSIWYG editor"
        },
        {
          title: "Content Management",
          description: "Organize and schedule your blog posts"
        },
        {
          title: "SEO Tools",
          description: "Optimize your posts for search engines"
        },
        {
          title: "Analytics",
          description: "Track post performance and reader engagement"
        }
      ]}
    />
  );
}