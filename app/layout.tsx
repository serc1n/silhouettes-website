import type { Metadata } from 'next'
import { Bebas_Neue, Noto_Sans } from 'next/font/google'
import React from 'react'
import './globals.css'
import Background from '../components/Background'
import Footer from '../components/Footer'
import GoogleAnalytics from '../components/GoogleAnalytics'

const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap'
})

const notoSans = Noto_Sans({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-noto',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Silhouettes by Serc',
  description: 'A minimalist art collection featuring white lines on black backgrounds',
  icons: {
    icon: [
      {
        url: '/images/logo.svg',
        type: 'image/svg+xml',
      },
    ],
    shortcut: '/images/logo.svg',
    apple: '/images/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Replace 'G-XXXXXXXXXX' with your actual Google Analytics Measurement ID
  const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

  return (
    <html lang="en" className={`${bebasNeue.variable} ${notoSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Noto+Sans:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className="text-white font-noto font-normal text-sm antialiased">
        <GoogleAnalytics GA_TRACKING_ID={GA_TRACKING_ID} />
        <Background />
        {children}
        <Footer />
      </body>
    </html>
  )
} 