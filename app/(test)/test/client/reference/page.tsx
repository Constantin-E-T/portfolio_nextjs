// app/(test)/test/client/reference/page.tsx
'use client';

import { useEffect } from 'react';

export default function ReferenceErrorTest() {
  useEffect(() => {
    // @ts-expect-error - Intentionally causing a reference error
    nonExistentFunction();
  }, []);

  return null;
}

