'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { navigationLinks } from "@/constants/navigation";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
      <ul className="flex items-center gap-8">
        {navigationLinks.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`relative text-sm font-medium transition-colors group inline-block
                ${pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
                }`}
            >
              {item.name}
              <span
                className={`absolute -bottom-6 left-0 h-[2px] bg-primary transition-all duration-300
                  ${pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}