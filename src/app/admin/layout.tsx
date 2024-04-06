import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/lib/styles/globals.css'
import Providers from '@/lib/providers/Providers'
import { Toaster } from '../components/toast/toaster'
import LoginModal from '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal'
import { notFound, redirect } from 'next/navigation'
import Sidebar from './_components/Sidebar'
import { cn } from '@/lib/utils'
import { getAuthSession } from '../../lib/auth'
import { PageNotFound } from '@/components/PageNotFound'
import { LoadingComponent } from '@/components/LoadingComponent'
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

    if (session?.user.role === null) return <LoadingComponent />

    if (!session) redirect("/discussion")

    const user = await prisma.user.findUnique({
        where: { id: session?.user.id },
    })

    if (!user) redirect("/discussion")

    return (
        <html lang="en">
            <body className={cn("bg-[#E3E1E1]", inter.className)}>

                {user.role === "ADMIN" ? (
                    <Providers>
                        <LoginModal />
                        <RegisterModal />
                        <Sidebar />
                        <main className='pl-[350px] bg-[#E3E1E1] h-screen p-12'>
                            {children}
                        </main>
                    </Providers>
                ) :
                    <div className='flex flex-col gap-3 justify-center items-center h-screen w-full'>
                        <PageNotFound />
                    </div>
                }
                <Toaster />

            </body>
        </html>
    )
}