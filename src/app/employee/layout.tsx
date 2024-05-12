import { LoadingComponent } from '@/components/LoadingComponent'
import { PageNotFound } from '@/components/PageNotFound'
import prisma from '@/lib/db/db'
import Providers from '@/lib/providers/Providers'
import '@/lib/styles/globals.css'
import { cn } from '@/lib/utils'
import { User } from '@prisma/client'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { redirect } from 'next/navigation'
import { getAuthSession } from '../../lib/auth'
import LoginModal from '../components/modals/LoginModal'
import RegisterModal from '../components/modals/RegisterModal'
import { Toaster } from '../components/toast/toaster'
import { NavbarDashboard } from './_components/Navbar'
import Sidebar from './_components/Sidebar'
import { UserSettings } from '@/components/UserSettings'
import { GenderModal } from '@/components/settings/GenderModal'
import { AvatarModal } from '@/components/settings/AvatarModal'
import { ProfileModal } from '@/components/settings/ProfileModal'
import { UsernameModal } from '@/components/settings/UsernameModal'
import { StaffDeactivated } from '@/components/staff-deactivated'
import { UrbanFarmDeactivated } from '@/components/urbanfarm-deactivated'
import { CommunityAvatarModal } from '@/components/settings/CommunityAvatarModal'
import { CommunityModal } from '@/components/settings/CommunityModal'
import { CommunityCarouselModal } from '@/components/settings/CommunityCarouselModal'

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

    if (!user || user.role === "SUPER_ADMIN" || user.role === "USER") redirect("/discussion")

    return (
        <html lang="en">
            <body className={cn("bg-[#E3E1E1]", inter.className)}>
                {user.role === "EMPLOYEE" || user?.role === "ADMIN" ? (
                    <>
                        {user.isDisabled ? (
                            <StaffDeactivated />
                        ) : (user.Community?.isArchived && (user.role === "ADMIN" || user.role === "EMPLOYEE")) ? (
                            <UrbanFarmDeactivated />
                        ) :
                            (
                                <Providers>
                                    <LoginModal />
                                    <RegisterModal />
                                    <NavbarDashboard user={user as User} />
                                    <UserSettings user={user as User} />
                                    <GenderModal user={user as User} />
                                    <AvatarModal />
                                    <ProfileModal user={user as User} />
                                    <UsernameModal user={user as User} />
                                    <CommunityAvatarModal />
                                    <CommunityModal
                                        //@ts-ignore
                                        user={user} />
                                    <CommunityCarouselModal
                                        //@ts-ignore
                                        user={user}
                                    />
                                    <Sidebar user={user} />
                                    <main className='lg:pl-[350px] bg-[#E3E1E1] h-screen p-12'>
                                        {children}
                                    </main>
                                    <Toaster />
                                </Providers>)
                        }

                    </>
                ) : (
                    <div className='flex flex-col gap-3 justify-center items-center h-screen w-full'>
                        <PageNotFound />
                    </div>
                )}
            </body>
        </html >
    )
}