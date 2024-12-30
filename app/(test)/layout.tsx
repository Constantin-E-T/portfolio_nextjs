// app/(test)/layout.tsx
import { redirect } from 'next/navigation';
import { env } from '@/lib/config/env';

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only allow access in development
  if (!env.isDevelopment) {
    redirect('/404');
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8">
        <h2 className="text-lg font-semibold text-yellow-500 mb-2">
          ⚠️ Test Environment - {env.current}
        </h2>
        <p className="text-sm text-yellow-600/80">
          These routes are only available in development mode for testing purposes.
        </p>
      </div>
      {children}
    </div>
  );
}

