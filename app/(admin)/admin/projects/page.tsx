import { FolderKanban } from 'lucide-react';
import ComingSoon from '@/components/ui/coming-soon';

export const dynamic = 'force-dynamic'

export default function ProjectsPage() {
  return (
    <ComingSoon
      title="Projects Management Coming Soon"
      description="Manage and showcase your portfolio projects."
      icon={<FolderKanban className="w-6 h-6 text-primary" />}
      expectedDate="Expected completion: Q2 2025"
      features={[
        {
          title: "Project Creation",
          description: "Create and edit portfolio projects with rich content"
        },
        {
          title: "Media Management",
          description: "Upload and manage project images and assets"
        },
        {
          title: "Categories & Tags",
          description: "Organize projects with categories and tags"
        },
        {
          title: "Project Analytics",
          description: "Track project views and engagement"
        }
      ]}
    />
  );
}