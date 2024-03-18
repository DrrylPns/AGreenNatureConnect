import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/lib/styles/globals.css'
import Providers from '@/lib/providers/Providers'
import { Toaster } from '../components/toast/toaster'

import { UserBanned } from '@/components/UserBanned'
import { getAuthSession } from '../../lib/auth'
import { ThemeProvider } from '../components/Ui/ThemeProvider'

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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
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
                </ThemeProvider>
            </body>
        </html>
    )
}