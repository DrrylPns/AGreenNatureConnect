import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/lib/styles/globals.css'
import Providers from '@/lib/providers/Providers'
import { Toaster } from '../components/toast/toaster'
import LoginModal from '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal'

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
                <Providers>
                    <LoginModal />
                    <RegisterModal />
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    )
}