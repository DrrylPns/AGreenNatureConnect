import { LoadingComponent } from '@/components/LoadingComponent'
import { PageNotFound } from '@/components/PageNotFound'
import { UserSettings } from '@/components/UserSettings'
import { AvatarModal } from '@/components/settings/AvatarModal'
import { GenderModal } from '@/components/settings/GenderModal'
import { ProfileModal } from '@/components/settings/ProfileModal'
import { UsernameModal } from '@/components/settings/UsernameModal'
import prisma from '@/lib/db/db'
import Providers from '@/lib/providers/Providers'
import '@/lib/styles/globals.css'
import { User } from '@prisma/client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'
import { getAuthSession } from '../../lib/auth'
import LoginModal from '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal'
import { Toaster } from '../components/toast/toaster'
import Sidebar from './_components/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'AGreen Nature Connect',
    description: 'Greens in the Streets: Farming for a Better Tomorrow',
}

export default async function SuperAdminLayout({
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

    if (!user || user.role !== "SUPER_ADMIN") redirect("/discussion")

    return (
        <html lang="en">
            <body className={inter.className}>
                {user.role === "SUPER_ADMIN" ? (
                    <Providers>
                        <Sidebar />
                        <LoginModal />
                        <RegisterModal />
                        <UserSettings user={user as User} />
                        <GenderModal user={user as User} />
                        <AvatarModal />
                        <ProfileModal user={user as User} />
                        <UsernameModal user={user as User} />
                        <div className='min-h-screen flex flex-col'>
                            <main className='flex-1 flex flex-col justify-center'>
                                {children}
                            </main>
                        </div>
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