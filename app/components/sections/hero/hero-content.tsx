// components/sections/hero/hero-content.tsx
'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code, Terminal } from 'lucide-react';
import type { HeroContentProps } from "@/lib/types/hero";

export function HeroContent({ title, description, technologies }: HeroContentProps) {
  return (
    <div className="space-y-8">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {title}
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-[600px] text-lg text-muted-foreground sm:text-xl"
      >
        {description}
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap gap-4"
      >
        <Button 
          size="lg"
          className="group bg-foreground text-background hover:bg-foreground/90"
        >
          View Projects
          <Code className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
        </Button>
        <Button 
          size="lg"
          variant="outline"
          className="group border-2"
        >
          Contact Me
          <Terminal className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
        </Button>
      </motion.div>

      <div className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          {technologies.map((tech) => (
            <motion.span
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: tech.delay + 0.3 }}
              className="inline-flex items-center rounded-full border border-foreground/10 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm hover:border-foreground/20 hover:bg-background/80"
            >
              {tech.name}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}