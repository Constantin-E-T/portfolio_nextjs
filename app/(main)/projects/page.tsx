// app/(main)/projects/page.tsx
import { Code2 } from 'lucide-react';
import ComingSoon from '@/components/ui/coming-soon';

export default function ProjectsPage() {
  return (
    <ComingSoon
      title="Projects Coming Soon"
      description="A showcase of my development work, side projects, and open-source contributions."
      icon={<Code2 className="w-6 h-6 text-primary" />}
      expectedDate="Expected completion: Q2 2025"
      features={[
        {
          title: "Full-Stack Applications",
          description: "Complete web applications built with modern technologies"
        },
        {
          title: "Open Source Projects",
          description: "Contributions to the developer community"
        },
        {
          title: "Client Work",
          description: "Selected professional projects and case studies"
        }
      ]}
    />
  );
}
