// components/sections/contact/contact-content.tsx
'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Globe } from 'lucide-react';

export function ContactContent() {
  return (
    <div className="space-y-8">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
      >
        Get in Touch
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-[600px] text-lg text-muted-foreground sm:text-xl"
      >
        Feel free to reach out if you&apos;re looking for a developer, have a question, or just want to connect.
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col space-y-4"
      >
        <motion.div className="flex items-center space-x-3 text-muted-foreground">
          <Mail className="h-5 w-5" />
          <span>constantin@woooba.io</span>
        </motion.div>
        <motion.div className="flex items-center space-x-3 text-muted-foreground">
          <MapPin className="h-5 w-5" />
          <span>Portsmouth, United Kingdom</span>
        </motion.div>
        <motion.div className="flex items-center space-x-3 text-muted-foreground">
          <Globe className="h-5 w-5" />
          <span>Available for remote work worldwide</span>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="pt-4"
      >
        <Button 
          size="lg"
          className="group bg-foreground text-background hover:bg-foreground/90"
        >
          Send Message
          <Mail className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
        </Button>
      </motion.div>
    </div>
  );
}
