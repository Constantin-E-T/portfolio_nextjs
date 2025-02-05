// app/(test)/test/client/runtime/page.tsx
'use client';

import { useEffect } from 'react';

export default function RuntimeErrorTest() {
  useEffect(() => {
    throw new Error('Test Runtime Error');
  }, []);

  return null;
}
