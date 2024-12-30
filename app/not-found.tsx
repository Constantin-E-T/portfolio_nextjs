// app/not-found.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">404</h1>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Page not found</h2>
          <p className="text-muted-foreground max-w-xs mx-auto">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button asChild>
            <Link href="/" className="gap-2">
              <HomeIcon className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
