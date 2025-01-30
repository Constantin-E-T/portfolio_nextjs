// app/projects/page.tsx
import { Metadata } from 'next';
import Projects from '@/components/sections/projects';

export const metadata: Metadata = {
  title: 'Projects | Constantin Emilian',
  description: 'Infrastructure and DevOps projects showcasing server management, containerization, and web application deployment.',
  openGraph: {
    title: 'Projects | Constantin Emilian',
    description: 'Infrastructure and DevOps projects showcasing server management, containerization, and web application deployment.',
  },
};

export default function ProjectsPage() {
  return <Projects />;
}