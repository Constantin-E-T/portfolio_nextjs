// app/(test)/test/client/type/page.tsx
'use client';

import { useEffect } from 'react';

export default function TypeErrorTest() {
  useEffect(() => {
    // @ts-expect-error - Intentionally causing a type error
    const test: number = 'string';
    console.log(test.toFixed(2));
  }, []);

  return null;
}
