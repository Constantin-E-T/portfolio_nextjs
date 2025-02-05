// components/sections/about/index.tsx
'use client';

import { CODE_SNIPPETS } from "@/constants/about";
import { AboutContent } from "./about-content";
import { AnimatedTerminal } from "./animated-terminal";
import { BackgroundElements } from "./background-elements";
import './about.module.css';

export default function About() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-14">
      <BackgroundElements />

      {/* Main content */}
      <div className="container relative">
        <div className="grid min-h-[calc(100vh-3.5rem)] grid-cols-1 items-center gap-8 py-10 md:gap-12 md:py-20 lg:grid-cols-2">
          <AboutContent />
          <div className="order-last lg:order-last">
            <AnimatedTerminal codeSnippets={CODE_SNIPPETS} />
          </div>
        </div>
      </div>
    </section>
  );
}