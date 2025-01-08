'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Mail } from 'lucide-react';
import Link from 'next/link';

export function AboutContent() {
  const handleDownloadCV = () => {
    // The path is relative to the public directory
    window.open('/cv/EmilianCV.pdf', '_blank');
  };

  return (
    <div className="space-y-8">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
      >
        About Me
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-[600px] text-lg text-muted-foreground sm:text-xl"
      >
        Full-stack developer with {new Date().getFullYear() - 2018}+ years of experience, 
        specializing in Python, Django, and React development. Currently building 
        scalable solutions at WOOOBA Sport Inc.
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
          onClick={handleDownloadCV}
        >
          Download CV
          <FileText className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
        </Button>
        <Button 
          size="lg"
          variant="outline"
          className="group border-2"
          asChild
        >
          <Link href="/contact">
            Get in Touch
            <Mail className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
          </Link>
        </Button>
      </motion.div>

      <div className="space-y-4">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3"
        >
          {['Python', 'Django', 'React', 'Next.js', 'Machine Learning', 'Server Management'].map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              className="inline-flex items-center rounded-full border border-foreground/10 bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm hover:border-foreground/20 hover:bg-background/80"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}