import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinkUp - The All-in-One Social Planner',
  description: 'Simplify group planning by bringing all social coordination tools into one seamless platform',
  keywords: 'social planning, group events, calendar sync, polls, expense splitting',
  authors: [{ name: 'LinkUp Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className={inter.className}>
        <ScrollProgress />
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
} 