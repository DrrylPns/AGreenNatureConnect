import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/lib/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AGreen Nature Connect',
    description: 'Greens in the Streets: Farming for a Better Tomorrow',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}