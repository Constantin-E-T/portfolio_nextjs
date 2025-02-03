// app/(test)/test/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TestHomePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Error Testing Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Client Errors */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Client-Side Errors</h2>
          <div className="space-y-2">
            <Button asChild className="w-full justify-start">
              <Link href="/test/client/runtime">Runtime Error</Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href="/test/client/type">Type Error</Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href="/test/client/reference">Reference Error</Link>
            </Button>
          </div>
        </div>

        {/* Server Errors */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Server-Side Errors</h2>
          <div className="space-y-2">
            <Button asChild className="w-full justify-start">
              <Link href="/test/server/error">Server Error</Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href="/test/server/error/123">Dynamic Server Error</Link>
            </Button>
            <Button asChild className="w-full justify-start">
              <Link href="/test/not-found">404 Not Found</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
