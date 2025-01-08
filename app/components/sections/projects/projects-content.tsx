// components/sections/projects/projects-content.tsx
'use client';

import { motion } from "framer-motion";
import { ExternalLink, Code } from 'lucide-react';
import Link from 'next/link';

export function ProjectsContent() {
  return (
    <div className="space-y-8">
      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-8"
      >
        <div className="grid gap-6">
          {/* Galaxy Explorer Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-background/50 p-6 backdrop-blur-sm hover:border-foreground/20 transition-colors"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Galaxy Explorer</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Interactive space exploration app featuring NASA&apos;s Mars weather data 
                and astronomy pictures with real-time updates.
              </p>
            </div>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {['JavaScript', 'HTML/CSS', 'NASA API'].map((tech) => (
                <span 
                  key={tech}
                  className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center justify-between">
              <Link 
                href="https://constantin-e-t.github.io/Galaxy-Explorer/"
                target="_blank"
                className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                Live Demo <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
              <Link 
                href="https://github.com/Constantin-E-T/Galaxy-Explorer"
                target="_blank"
                className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                <Code className="mr-1 h-3 w-3" />
                View Code
              </Link>
            </div>
          </motion.div>

          {/* Climate Check Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="group relative overflow-hidden rounded-xl border border-foreground/10 bg-background/50 p-6 backdrop-blur-sm hover:border-foreground/20 transition-colors"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">Climate Check</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Location-aware weather application providing detailed forecasts and weather
                insights using OpenWeatherMap&apos;s API.
              </p>
            </div>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {['JavaScript', 'jQuery', 'Bootstrap', 'Weather API'].map((tech) => (
                <span 
                  key={tech}
                  className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center justify-between">
              <Link 
                href="https://constantin-e-t.github.io/ClimateCheck/"
                target="_blank"
                className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                Live Demo <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
              <Link 
                href="https://github.com/Constantin-E-T/ClimateCheck"
                target="_blank"
                className="inline-flex items-center text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
              >
                <Code className="mr-1 h-3 w-3" />
                View Code
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="pt-8"
      >
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          {[
            'Python', 'Django', 'React', 'Next.js', 'Docker',
            'MongoDB', 'PostgreSQL', 'Node.js', 'TypeScript', 'AWS'
          ].map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="inline-flex items-center rounded-full border border-foreground/10 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm hover:border-foreground/20 hover:bg-background/80 transition-all"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}