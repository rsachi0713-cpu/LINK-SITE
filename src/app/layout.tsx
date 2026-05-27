import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LinkLocker - Premium Content Gates',
  description: 'Create social gates to grow your audience. Lock links behind actions like subscribing or following.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="app-container">
          {children}
        </main>
      </body>
    </html>
  )
}
