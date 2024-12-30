
// app/global-error.tsx
'use client';
 
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { RefreshCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { formatErrorMessage } from '@/lib/utils/error-formatter';
 
export default function GlobalError({
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
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
          <div className="text-center space-y-8 w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Something Went Wrong
              </h1>
              
              {/* User-friendly message */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-lg text-foreground">
                  {userMessage}
                </p>
              </div>

              {/* Technical Details (Development Only) */}
              {isDevelopment && (
                <div className="mt-6">
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
                          {error.digest && (
                            <div className="mt-2 pt-2 border-t border-border">
                              <span className="text-muted-foreground">Error Digest: </span>
                              <code>{error.digest}</code>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-4"
            >
              <Button onClick={reset} className="gap-2">
                <RefreshCcw className="w-4 h-4" />
                Try Again
              </Button>
              
              <p className="text-sm text-muted-foreground">
                If this keeps happening, please refresh the page or contact support.
              </p>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  );
}