import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/lib/styles/globals.css'
import Providers from '@/lib/providers/Providers'
import { Toaster } from '../components/toast/toaster'
import { getAuthSession } from '@/lib/auth'
import { UserBanned } from '@/components/UserBanned'

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


    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    {session?.user && session.user.numberOfViolations >= 3 ? (
                        <>
                            <UserBanned />
                        </>
                    ) : (
                        <>
                            {children}
                        </>
                    )}
                    <Toaster />
                </Providers>
            </body>
        </html>
    )
}