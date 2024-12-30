// app/components/layout/navigation.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { navigationLinks } from "@/lib/constants/navigation";

const navVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function Navigation() {
  const pathname = usePathname();

  return (
    <motion.nav 
      className="hidden md:block"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.ul className="flex items-center gap-8">
        {navigationLinks.map((item) => (
          <motion.li 
            key={item.href}
            variants={itemVariants}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={item.href}
              className="relative text-sm font-medium transition-colors group inline-block"
            >
              <span className={`${
                pathname === item.href 
                  ? "text-primary" 
                  : "text-muted-foreground group-hover:text-primary"
              } transition-colors duration-200`}>
                {item.name}
              </span>
              <span 
                className={`absolute -bottom-[1.5rem] left-0 h-[2px] bg-primary transition-all duration-300
                  ${pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}
              />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
}