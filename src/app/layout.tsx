import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/providers/SessionProvider'
import { ToastProvider } from '@/context/ToastContext'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MultiV — Professional Verification Bot',
  description: 'Secure your Discord server with MultiV. 7 verification methods, real-time logs, CAPTCHA, and more.',
  keywords: 'discord bot, verification, captcha, anti-spam, moderation',
  openGraph: {
    title: 'MultiV — Professional Verification Bot',
    description: 'Secure your Discord server with MultiV. 7 verification methods, real-time logs, CAPTCHA, and more.',
    url: 'https://multi-v.netlify.app',
    siteName: 'MultiV',
    images: [
      {
        url: 'https://multi-v.netlify.app/icon.png',
        width: 256,
        height: 256,
        alt: 'MultiV',
      },
    ],
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-base text-text-primary antialiased">
        <SessionProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
