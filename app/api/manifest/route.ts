// app/api/manifest/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: "Constantin Emilian Portfolio",
    short_name: "CE Portfolio",
    icons: [
      {
        src: "/logo/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/logo/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
    start_url: "/"
  };

  return new NextResponse(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=31536000, immutable'
    },
  });
}