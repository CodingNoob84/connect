import AuthProvider from '@/provider/Authprovider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Connect App',
  description: 'Connect with People',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        {children}</AuthProvider></body>
    </html>
  )
}
