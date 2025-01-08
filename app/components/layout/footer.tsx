'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { FileDown, Mail } from "lucide-react";
import { GitHubLogoIcon, LinkedInLogoIcon, HeartIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SocialLink {
  name: string;
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
}

interface NavLink {
  name: string;
  href: string;
}

const socialLinks: SocialLink[] = [
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

const navigationLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Footer() {
  const startYear = 2018;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - startYear;

  const handleDownloadCV = () => {
    window.open('/cv/EmilianCV.pdf', '_blank');
  };

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="border-t border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto">
        <div className="py-12">
          {/* Main footer content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-12 md:grid-cols-12"
          >
            {/* Branding & Bio */}
            <motion.div variants={itemVariants} className="md:col-span-6 space-y-4">
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
              <motion.div 
                className="flex items-center gap-4 pt-4"
                variants={containerVariants}
              >
                <TooltipProvider>
                  {socialLinks.map((item) => (
                    <motion.div
                      key={item.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Tooltip>
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
                    </motion.div>
                  ))}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
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
                  </motion.div>
                </TooltipProvider>
              </motion.div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="md:col-span-6">
              <div className="grid gap-8 md:place-content-end md:text-right">
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold tracking-wide uppercase text-primary">
                    Navigation
                  </h4>
                  <nav>
                    <motion.ul 
                      className="space-y-2"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      {navigationLinks.map((item) => (
                        <motion.li 
                          key={item.name}
                          variants={itemVariants}
                          whileHover={{ x: -5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Link
                            href={item.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
                          >
                            {item.name}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </nav>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-12 pt-6 border-t border-border/20"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <div className="order-2 md:order-1 text-center md:text-left space-y-2">
                <p>© {startYear}–{currentYear} Constantin Emilian. All rights reserved.</p>
                <p className="text-xs">{yearsOfExperience}+ years of turning ideas into reality through code.</p>
              </div>
              <motion.div 
                className="order-1 md:order-2 text-center text-xs flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span>Made with</span>
                <HeartIcon className="h-3 w-3 text-red-500 animate-pulse" />
                <span>in Portsmouth, UK</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}