// app/components/layout/header.tsx
'use client';

import Link from 'next/link';
import Head from 'next/head';
import Navigation from './navigation';
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { ThemeToggle } from "@/components/general/ThemeToggle";
import { motion } from "framer-motion";
import { useState } from 'react';
import { navigationLinks } from "@/lib/constants/navigation";
import Logo from '@/public/logo/logo.svg';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Constantin Emilian - Senior Full Stack Developer | Python, Django, React Expert</title>
        <meta name="description" content="Senior Full Stack Developer specializing in Python, Django, and React development. Creating responsive, user-centric web applications with modern tech stack." />
        <meta name="keywords" content="Constantin Emilian, Full Stack Developer, Python, Django, React, Web Development, Portsmouth" />
      </Head>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link
                href="/"
                className="text-xl font-bold relative group"
              >
                <span className="relative">
                  <Image src={Logo} alt="Logo" className="size-20" />
                  <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </span>
                
              </Link>
            </motion.div>

            {/* Center Navigation */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Navigation />
            </div>

            {/* Right Section: Auth & Theme */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Auth Links */}
              <div className="hidden md:flex items-center gap-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login" className="text-sm font-medium">
                    Sign in
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">
                    Get Started
                  </Link>
                </Button>
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-primary/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <MenuIcon className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMenuOpen ? 1 : 0,
            height: isMenuOpen ? "auto" : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="md:hidden border-t border-border overflow-hidden"
        >
          <nav className="container mx-auto py-4">
            <ul className="flex flex-col space-y-4">
              {navigationLinks.map((item) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    className="block px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="pt-4 border-t border-border/40"
              >
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    className="block px-2 py-1.5 text-sm font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/register"
                    className="block px-2 py-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            </ul>
          </nav>
        </motion.div>
      </motion.header>
    </>
  );
}