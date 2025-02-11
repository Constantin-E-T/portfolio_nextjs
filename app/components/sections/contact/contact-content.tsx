// app/components/sections/contact/contact-content.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Globe, ArrowLeft, Search } from 'lucide-react';
import { ContactForm } from "@/app/components/forms/ContactForm";

export function ContactContent() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <motion.div
            key="contact-info"
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Get in Touch
            </motion.h1>

            <motion.p 
              className="max-w-[600px] text-lg text-muted-foreground sm:text-xl"
            >
              Feel free to reach out if you&apos;re looking for a developer, have a question, or just want to connect.
            </motion.p>
            
            <motion.div 
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
              <motion.div className="flex items-center space-x-3 text-primary/80">
                <Search className="h-5 w-5" />
                <Link href="/messages/lookup" className="hover:text-primary">
                  Look up existing message status
                </Link>
              </motion.div>
            </motion.div>

            <motion.div className="pt-4">
              <Button 
                size="lg"
                className="group bg-foreground text-background hover:bg-foreground/90"
                onClick={() => setShowForm(true)}
              >
                Send Message
                <Mail className="ml-2 h-4 w-4 transition-transform group-hover:rotate-12" />
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="contact-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <Button
              variant="ghost"
              className="group mb-4"
              onClick={() => setShowForm(false)}
            >
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back
            </Button>
            <ContactForm />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}