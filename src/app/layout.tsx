import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AGreen Nature Connect',
  description: 'Greens in the Streets: Farming for a Better Tomorrow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F0EEF6]`}>{children}</body>
    </html>
  )
}
