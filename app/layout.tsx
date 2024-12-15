import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientLayout } from '@/components/ClientLayout'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MantleFund - Decentralized Crowdfunding on Mantle',
  description: 'Join our global community of changemakers and support meaningful causes on the Mantle blockchain.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ClientLayout>
          {children}
          <Toaster position="bottom-right" />
        </ClientLayout>
      </body>
    </html>
  )
}