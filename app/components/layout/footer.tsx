'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon, LinkedInLogoIcon, ExternalLinkIcon } from "@radix-ui/react-icons";

const footerLinks = [
  {
    title: "Navigation",
    items: [
      { name: "Home", href: "/" },
      { name: "About", href: "/about" },
      { name: "Projects", href: "/projects" },
      { name: "Contact", href: "/contact" },
    ]
  },
  {
    title: "Social",
    items: [
      { 
        name: "GitHub", 
        href: "https://github.com/yourusername",
        Icon: GitHubLogoIcon,
        external: true
      },
      { 
        name: "LinkedIn", 
        href: "https://linkedin.com/in/yourusername",
        Icon: LinkedInLogoIcon,
        external: true
      }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="py-8">
          {/* Main footer content */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Branding */}
            <div className="md:col-span-4">
              <div className="space-y-2">
                <Link href="/" className="text-xl font-bold gradient-text inline-block">
                  Constantin Emilian
                </Link>
                <p className="text-sm text-muted-foreground">
                  Senior Full Stack Developer specializing in building exceptional digital experiences.
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-8">
              <div className="grid grid-cols-2 gap-8">
                {footerLinks.map((section) => (
                  <div key={section.title} className="space-y-3">
                    <h4 className="text-sm font-semibold">{section.title}</h4>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item.name}>
                          {'external' in item ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                            >
                              {'Icon' in item && <item.Icon className="h-4 w-4" />}
                              {item.name}
                              <ExternalLinkIcon className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          ) : (
                            <Link
                              href={item.href}
                              className="text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 border-t border-border/40">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground order-2 md:order-1">
                © {new Date().getFullYear()} Constantin Tivlica. All rights reserved.
              </p>
              <div className="flex items-center gap-4 order-1 md:order-2">
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    <GitHubLogoIcon className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    <LinkedInLogoIcon className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}