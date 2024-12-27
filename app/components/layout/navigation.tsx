// app/components/layout/navigation.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-8">
        {navigation.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`relative text-sm font-medium transition-colors hover:text-primary 
                ${pathname === item.href 
                  ? "text-primary after:absolute after:bottom-[-1.5rem] after:left-0 after:h-[2px] after:w-full after:bg-primary after:content-['']" 
                  : "text-muted-foreground"
                }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}