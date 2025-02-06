// app/components/layout/FooterMain.tsx

'use client';

import Link from 'next/link';
// import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { FileDown, Mail } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon, HeartIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const socialLinks = [
  { 
    name: "GitHub", 
    href: "https://github.com/Constantin-E-T",
    Icon: GitHubLogoIcon,
    description: "Check out my code"
  },
  { 
    name: "LinkedIn", 
    href: "https://uk.linkedin.com/in/constantin-emilian-tivlica-00a354206",
    Icon: LinkedInLogoIcon,
    description: "Let's connect"
  },
  {
    name: "Email",
    href: "mailto:constantin@woooba.io",
    Icon: Mail,
    description: "Send me an email"
  }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const startYear = 2018;
  const yearsOfExperience = currentYear - startYear;

  const handleDownloadCV = () => {
    window.open('/cv/EmilianCV.pdf', '_blank');
  };

  return (
    <footer className="w-full border-t border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 mb-8">
          {/* Branding & Bio */}
          <div className="lg:col-span-6 space-y-4">
            <Link 
              href="/" 
              className="text-xl font-bold inline-block hover:text-primary transition-colors relative group"
            >
              Constantin Emilian
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Crafting exceptional digital experiences since 2018. Specializing in full-stack development 
              with a passion for clean code and intuitive design.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 pt-4">
              <TooltipProvider>
                {socialLinks.map((item) => (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative" asChild>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          <item.Icon className="h-5 w-5" />
                          <span className="sr-only">{item.name}</span>
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-primary text-primary-foreground">
                      <p className="text-xs">{item.description}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={handleDownloadCV}
                      className="hover:text-primary transition-colors"
                    >
                      <FileDown className="h-5 w-5" />
                      <span className="sr-only">Download CV</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-primary text-primary-foreground">
                    <p className="text-xs">Download my CV</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-6 flex justify-end">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wide uppercase text-primary">
                Navigation
              </h4>
              <nav>
                <ul className="space-y-2 text-right">
                  {['Home', 'About', 'Projects', 'Contact', 'Blog'].map((item) => (
                    <li key={item}>
                      <Link
                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="text-center md:text-left space-y-2">
              <p>© {startYear}–{currentYear} Constantin Emilian. All rights reserved.</p>
              <p className="text-xs">{yearsOfExperience}+ years of turning ideas into reality through code.</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span>Made with</span>
              <HeartIcon className="h-3 w-3 text-red-500 animate-pulse" />
              <span>in Portsmouth, UK</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}