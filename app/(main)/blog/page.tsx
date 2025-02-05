// app/blog/page.tsx
import { BookOpen } from 'lucide-react';
import ComingSoon from '@/components/ui/coming-soon';

export default function BlogPage() {
  return (
    <ComingSoon 
      title="Blog Coming Soon"
      description="A space for sharing insights, tutorials, and tech stories."
      icon={<BookOpen className="w-6 h-6 text-primary" />}
      expectedDate="Expected completion: Q3 2025"
      features={[
        {
          title: "Technical Articles",
          description: "In-depth tutorials and best practices"
        },
        {
          title: "Project Showcases",
          description: "Detailed breakdowns of interesting projects"
        },
        {
          title: "Industry Insights",
          description: "Latest trends and technology updates"
        }
      ]}
    />
  );
}