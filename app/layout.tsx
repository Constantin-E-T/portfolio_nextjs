import { Metadata } from 'next'
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/app/components/general/theme-provider";
import { CountlyAnalytics } from "@/app/components/analytics/CountlyAnalytics";
import { SessionProvider } from "next-auth/react"

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: true,
  display: 'swap'  // Add this for better font loading performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: true,
  display: 'swap'  // Add this for better font loading performance
});



export const metadata: Metadata = {
  metadataBase: new URL('https://conn.digital'),
  title: {
    default: 'Constantin Emilian - Full Stack Developer Portfolio',
    template: '%s | Constantin Emilian'
  },
  description: 'Full Stack Developer specializing in React, Node.js, and modern web technologies. View my projects and get in touch.',
  keywords: ['Full Stack Developer', 'Web Development', 'React', 'Node.js', 'TypeScript', 'Next.js', 'Portfolio', 'Software Engineer'],
  authors: [{ name: 'Constantin Emilian', url: 'https://conn.digital' }],
  creator: 'Constantin Emilian',
  publisher: 'Constantin Emilian',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/logo/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/logo/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    apple: {
      url: '/logo/favicon/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/logo/favicon/android-chrome-192x192.png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/logo/favicon/android-chrome-512x512.png',
      }
    ],
  },
  manifest: '/api/manifest',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://conn.digital',
    siteName: 'Constantin Emilian Portfolio',
    title: 'Constantin Emilian - Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Node.js, and modern web technologies.',
    images: [
      {
        url: '/logo/Logo.png',
        width: 1200,
        height: 630,
        alt: 'Constantin Emilian Portfolio',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Constantin Emilian - Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Node.js, and modern web technologies.',
    creator: '@YourTwitterHandle',
    images: ['/logo/Logo.png'],
  },
  verification: {
    other: {
      me: ['mailto:constantin@woooba.io', 'https://github.com/Constantin-E-T'],
    },
  },
  alternates: {
    canonical: 'https://conn.digital',
    languages: {
      'en-US': 'https://conn.digital',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/api/manifest" />
        <link rel="canonical" href="https://conn.digital" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preload" href="/logo/logo.svg" as="image" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <CountlyAnalytics />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}