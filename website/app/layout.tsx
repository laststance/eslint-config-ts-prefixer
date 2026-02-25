import type React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { IBM_Plex_Sans, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Analytics } from '@vercel/analytics/next'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'eslint-config-ts-prefixer Documentation',
  description: 'Documentation for eslint-config-ts-prefixer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ibmPlexSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed inset-0 -z-50">
            <img
              src="/images/background.jpg"
              alt="Scenic background of green grass and blue sky"
              className="object-cover w-full h-full filter blur-[2px] brightness-75"
            />
          </div>
          <Header />
          <div className="relative z-0">{children}</div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
