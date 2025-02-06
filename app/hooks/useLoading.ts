// hooks/useLoading.ts

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function useLoading() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    // Reset loading state on route change
    handleStart();
    
    // Simulate minimum loading time for better UX
    const timer = setTimeout(handleComplete, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  return isLoading;
}