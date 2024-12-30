// app/error.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { formatErrorMessage } from '@/lib/utils/error-formatter';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';
  const { userMessage, technicalDetails } = formatErrorMessage(error);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <div className="text-center space-y-8 w-full max-w-lg">
        {/* User Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-semibold">Oops! Something went wrong</h2>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-lg">{userMessage}</p>
          </div>
        </motion.div>

        {/* Development Details */}
        {isDevelopment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              className="gap-2"
            >
              {showDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              Technical Details
            </Button>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <div className="bg-muted p-4 rounded-lg text-left overflow-auto max-h-[300px]">
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {technicalDetails}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Button onClick={reset} className="gap-2">
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
