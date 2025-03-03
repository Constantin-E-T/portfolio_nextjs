// components/sections/contact/index.tsx
import { CODE_SNIPPETS } from "@/constants/contact";
import { ContactContent } from "./contact-content";
import { AnimatedTerminal } from "./animated-terminal";
import { BackgroundElements } from "@/components/sections/hero/background-elements";
import './contact.module.css';

export default function Contact() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-14">
      <BackgroundElements />

      <div className="container relative">
        <div className="grid min-h-[calc(100vh-3.5rem)] grid-cols-1 items-center gap-8 py-10 md:gap-12 md:py-20 lg:grid-cols-2">
          <ContactContent />
          <div className="order-last lg:order-last">
            <AnimatedTerminal codeSnippets={CODE_SNIPPETS} />
          </div>
        </div>
      </div>
    </section>
  );
}
