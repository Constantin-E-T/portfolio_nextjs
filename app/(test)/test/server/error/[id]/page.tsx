// app/(test)/test/server/error/[id]/page.tsx
export const dynamic = 'force-dynamic';

export default function DynamicServerErrorTest() {
  throw new Error('Test Server Error');
}

// Generate params to prevent static generation
export function generateStaticParams() {
  return [];
}