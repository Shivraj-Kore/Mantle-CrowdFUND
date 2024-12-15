import { Layout } from '../components/layout'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Layout>
          {children}
          <Toaster position="bottom-right" />
        </Layout>
      </body>
    </html>
  )
}

