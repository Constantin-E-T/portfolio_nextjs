// app/components/hero.tsx
'use client';

import { Button } from "@/components/ui/button";

const technologies = [
  { name: "Python", color: "text-blue-400" },
  { name: "Django", color: "text-green-400" },
  { name: "React", color: "text-cyan-400" },
  { name: "Next.js", color: "text-white" }
];

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-20 text-center lg:py-32">
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-background/5 via-background/50 to-background" />
      </div>

      {/* Content */}
      <div className="container px-4 md:px-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Constantin Emilian
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Specializing in Python, Django, and React development with a focus on creating responsive, user-centric web applications.
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button className="bg-primary text-primary-foreground">
              View Projects
            </Button>
            <Button variant="outline">
              Contact Me
            </Button>
          </div>

          {/* Technologies */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <span
                key={tech.name}
                className={`inline-flex items-center rounded-full border border-border/40 px-4 py-1.5 text-sm ${tech.color}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}