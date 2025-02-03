// app/(test)/test/server/error/page.tsx
'use client';

import { useEffect } from 'react';

export default function ServerErrorTest() {
  useEffect(() => {
    throw new Error('Test Server Error');
  }, []);

  return null;
}
