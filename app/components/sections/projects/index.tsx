// components/sections/projects/index.tsx
'use client';

import { useState } from 'react';
import { ProjectsContent } from "./projects-content";
import { AnimatedTerminal } from "./animated-terminal";
import { BackgroundElements } from "./background-elements";
import { AllProjects } from "./all-projects";
import { Boxes, Layout } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CODE_SNIPPETS } from "@/lib/constants/projects";
import './projects.module.css';

type TabType = 'featured' | 'all';

export default function Projects() {
  const [activeTab, setActiveTab] = useState<TabType>('featured');

  return (
    <section className="relative min-h-screen overflow-hidden pt-14">
      <BackgroundElements />

      <div className="container relative">
        <div className="grid min-h-[calc(100vh-3.5rem)] grid-cols-1 items-center gap-8 py-10 md:gap-12 md:py-20 lg:grid-cols-2">
          <div>
            {/* Header Section */}
            <div className="space-y-8 mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              >
                Projects
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="max-w-[600px] text-lg text-muted-foreground sm:text-xl"
              >
                A showcase of my full-stack development work, from web applications to technical solutions.
              </motion.p>
            </div>

            {/* Tab Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-4 mb-8"
            >
              <Button 
                size="lg"
                variant={activeTab === 'featured' ? 'default' : 'outline'}
                className={`group ${activeTab === 'featured' ? 'bg-foreground text-background' : 'border-2'}`}
                onClick={() => setActiveTab('featured')}
              >
                <Boxes className="mr-2 h-5 w-5" />
                Featured Projects
              </Button>
              <Button 
                size="lg"
                variant={activeTab === 'all' ? 'default' : 'outline'}
                className={`group ${activeTab === 'all' ? 'bg-foreground text-background' : 'border-2'}`}
                onClick={() => setActiveTab('all')}
              >
                <Layout className="mr-2 h-5 w-5" />
                All Projects
              </Button>
            </motion.div>

            {/* Content Tabs */}
            <AnimatePresence mode="wait">
              {activeTab === 'featured' ? (
                <motion.div
                  key="featured"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProjectsContent />
                </motion.div>
              ) : (
                <motion.div
                  key="all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-y-auto max-h-[60vh] pr-4 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent"
                >
                  <AllProjects />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="order-last lg:order-last">
            <AnimatedTerminal codeSnippets={CODE_SNIPPETS} />
          </div>
        </div>
      </div>
    </section>
  );
}