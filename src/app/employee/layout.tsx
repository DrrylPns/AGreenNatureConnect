import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/lib/styles/globals.css'
import Providers from '@/lib/providers/Providers'
import LoginModal from '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal'
import { Toaster } from '../components/toast/toaster'
import { getAuthSession } from '@/lib/auth'
import { notFound } from 'next/navigation'
import prisma from '@/lib/db/db'

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
    const session = await getAuthSession()

    if (session?.user.role === null) return <div>Loading...</div>

    if (session?.user.role !== "EMPLOYEE") {
        notFound()
    }

    

    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <LoginModal />
                    <RegisterModal />
                    {children}
                    <Toaster />
                </Providers >
            </body>
        </html>
    )
}