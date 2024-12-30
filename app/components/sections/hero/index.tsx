// components/sections/hero/index.tsx
'use client';

import { TECHNOLOGIES, CODE_SNIPPETS } from "@/lib/constants/hero";
import { HeroContent } from "./hero-content";
import { AnimatedTerminal } from "./animated-terminal";
import { BackgroundElements } from "./background-elements";
import './hero.module.css';

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-14">
      <BackgroundElements />

      {/* Main content */}
      <div className="container relative">
        <div className="grid min-h-[calc(100vh-3.5rem)] grid-cols-1 items-center gap-8 py-10 md:gap-12 md:py-20 lg:grid-cols-2">
          <HeroContent
            title="Constantin Emilian"
            description="Specializing in Python, Django, and React development with a focus on creating responsive, user-centric web applications."
            technologies={TECHNOLOGIES}
          />
          <div className="order-last lg:order-last">
            <AnimatedTerminal codeSnippets={CODE_SNIPPETS} />
          </div>
        </div>
      </div>
    </section>
  );
}
