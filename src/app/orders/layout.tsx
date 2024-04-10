import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/lib/styles/globals.css'
import Providers from '@/lib/providers/Providers'
import LoginModal from '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal'
import { Toaster } from '../components/toast/toaster'
import { getAuthSession } from '../../lib/auth'
import { notFound, redirect } from 'next/navigation'
import prisma from '@/lib/db/db'
import { cn } from '@/lib/utils'
import { CartProvider } from '@/contexts/CartContext'
import Navbar from './_components/Navbar'
import { LoadingComponent } from '@/components/LoadingComponent'
import { PageNotFound } from '@/components/PageNotFound'

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

    if (session?.user.role === null) return <LoadingComponent />

    if (!session) redirect("/discussion")

        const user = await prisma.user.findUnique({
            where: { id: session?.user.id },
            include: {
                Community: true
            }
        })
    
        if (!user) redirect("/discussion")

    return (
        <html lang="en">
            <body className={cn("bg-[#E3E1E1]", inter.className)}>
                {user.role === "EMPLOYEE" ?
                    (
                        <CartProvider>
                        <Providers>
                            <LoginModal />
                            <RegisterModal />
                            <Navbar session={session} />
                            <main className='bg-[#E3E1E1] h-screen'>
                                {children}
                            </main>
                            <Toaster />
                        </Providers >
                    </CartProvider>)
                    :
                    (
                        <div className='flex flex-col gap-3 justify-center items-center h-screen w-full'>
                            <PageNotFound />
                        </div>
                    )
                }
            </body>
        </html>
    )
}