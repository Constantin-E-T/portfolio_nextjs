// components/sections/projects/all-projects.tsx
'use client';

import { motion } from "framer-motion";
import { ExternalLink, Code } from 'lucide-react';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    title: "Galaxy Explorer",
    description: "Interactive space exploration app featuring NASA's Mars weather data and astronomy pictures with real-time updates.",
    technologies: ["JavaScript", "HTML/CSS", "NASA API"],
    demoUrl: "https://constantin-e-t.github.io/Galaxy-Explorer/",
    githubUrl: "https://github.com/Constantin-E-T/Galaxy-Explorer",
    featured: true
  },
  {
    title: "Climate Check",
    description: "Location-aware weather application providing detailed forecasts and weather insights using OpenWeatherMap's API.",
    technologies: ["JavaScript", "jQuery", "Bootstrap", "Weather API"],
    demoUrl: "https://constantin-e-t.github.io/ClimateCheck/",
    githubUrl: "https://github.com/Constantin-E-T/ClimateCheck",
    featured: true
  },
  // Add more projects here as needed
];

export function AllProjects() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-background/50 p-6 backdrop-blur-sm hover:border-foreground/20 transition-colors"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                {project.featured && (
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="inline-flex items-center rounded-full bg-secondary/50 px-2.5 py-0.5 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mt-auto">
              {project.demoUrl && (
                <Link 
                  href={project.demoUrl}
                  target="_blank"
                  className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                >
                  Live Demo <ExternalLink className="ml-1 h-3 w-3" />
                </Link>
              )}
              <Link 
                href={project.githubUrl}
                target="_blank"
                className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                <Code className="mr-1 h-3 w-3" />
                View Code
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}