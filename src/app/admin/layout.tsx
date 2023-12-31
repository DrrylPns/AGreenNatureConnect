import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/lib/styles/globals.css'
import Providers from '@/lib/providers/Providers'
import { Toaster } from '../components/toast/toaster'
import LoginModal from '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal'
import { getAuthSession } from '@/lib/auth'
import Sidebar from '../components/(admin)/Sidebar'
import { notFound } from 'next/navigation'

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

    if (session?.user.role !== "ADMIN") {
        notFound()
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <LoginModal />
                    <RegisterModal />

                    <Sidebar />
                    {/* links === 
                            dashboard, 
                            create employee, 
                            inventory system, 
                            products, 
                            transaction history
                            Logout??
                        */}
                    <main className='pl-[350px]'>
                        {children}
                    </main>
                    <Toaster />
                </Providers>
            </body>
        </html>
    )
}