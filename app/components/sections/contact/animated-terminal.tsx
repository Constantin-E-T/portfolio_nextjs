// components/sections/contact/animated-terminal.tsx
'use client';

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import type { AnimatedTerminalProps } from "@/lib/types/contact";

export function AnimatedTerminal({ codeSnippets }: AnimatedTerminalProps) {
  const [currentSnippet, setCurrentSnippet] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [typedCode, setTypedCode] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const typeNextCharacter = useCallback(() => {
    const currentCode = codeSnippets[currentSnippet].code;
    if (typedCode.length < currentCode.length) {
      setTypedCode(currentCode.slice(0, typedCode.length + 1));
      return true;
    }
    return false;
  }, [codeSnippets, currentSnippet, typedCode]);

  const moveToNextSnippet = useCallback(() => {
    setIsTransitioning(true);
    setTypedCode('');
    setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    setIsTyping(true);
    setIsTransitioning(false);
  }, [codeSnippets.length]);

  useEffect(() => {
    if (isTransitioning) return;

    let timeout: NodeJS.Timeout;

    if (isTyping) {
      timeout = setTimeout(() => {
        const hasMoreToType = typeNextCharacter();
        if (!hasMoreToType) {
          setIsTyping(false);
        }
      }, 20);
    } else {
      timeout = setTimeout(() => {
        moveToNextSnippet();
      }, 7000);
    }

    return () => clearTimeout(timeout);
  }, [isTyping, typeNextCharacter, moveToNextSnippet, isTransitioning]);

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'python':
        return 'text-blue-400';
      case 'javascript':
        return 'text-yellow-400';
      case 'json':
        return 'text-green-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative aspect-[4/3] w-full max-w-[600px] overflow-hidden rounded-lg border border-foreground/10 bg-background/50 shadow-2xl backdrop-blur-sm"
    >
      {/* Terminal Header */}
      <div className="flex h-8 items-center justify-between border-b border-foreground/10 bg-background/80 px-4">
        <div className="flex items-center gap-4">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500/50" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
            <div className="h-3 w-3 rounded-full bg-green-500/50" />
          </div>
          <div className={`text-sm font-medium ${getLanguageColor(codeSnippets[currentSnippet].language)}`}>
            {codeSnippets[currentSnippet].language}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Contact Service
        </div>
      </div>

      {/* Terminal Content */}
      <div className="h-full overflow-auto p-4">
        <pre className="font-mono text-sm text-foreground/90">
          <code className={`language-${codeSnippets[currentSnippet].language}`}>
            {typedCode}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block h-4 w-2 bg-foreground/90"
            />
          </code>
        </pre>
      </div>

      {/* Snippet Progress Indicators */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 p-2">
        {codeSnippets.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-8 rounded-full transition-all duration-300 ${
              index === currentSnippet ? 'bg-foreground/60' : 'bg-foreground/20'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
