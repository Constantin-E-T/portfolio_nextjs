// lib/constants/navigation.ts

import { env } from '@/lib/config/env';

export const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
  // Only show test route in development
  ...(env.isDevelopment ? [{ name: 'Test', href: '/test' }] : []),
] as const;

export interface NavLink {
  name: string;
  href: string;
}