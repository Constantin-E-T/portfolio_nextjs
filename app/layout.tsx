// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/app/components/general/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Constantin Emilian - Portfolio',
  description: 'Full Stack Developer Portfolio',
  icons: {
    icon: [
      {
        url: '/logo/favicon/favicon-32x32.png',  // Updated path
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/logo/favicon/favicon-16x16.png',  // Updated path
        sizes: '16x16',
        type: 'image/png',
      }
    ],
    apple: {
      url: '/logo/favicon/apple-touch-icon.png',  // Updated path
      sizes: '180x180',
      type: 'image/png',
    },
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/logo/favicon/android-chrome-192x192.png',  // Updated path
      },
      {
        rel: 'android-chrome-512x512',
        url: '/logo/favicon/android-chrome-512x512.png',  // Updated path
      }
    ],
  },
  manifest: '/logo/favicon/site.webmanifest'  // Added manifest path
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/logo/favicon/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}