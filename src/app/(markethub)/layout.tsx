import Providers from "@/lib/providers/Providers"
import "@/lib/styles/globals.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getAuthSession } from '../../lib/auth'
import Navbar from "../components/(user)/Navbar"
import LoginModal from "../components/modals/LoginModal"
import RegisterModal from "../components/modals/RegisterModal"
import { Toaster } from "../components/toast/toaster"
import '@smastrom/react-rating/style.css'
import { UserBanned } from "@/components/UserBanned"
import { UserSettings } from "@/components/UserSettings"
import { CartProvider } from "@/contexts/CartContext"
import prisma from "@/lib/db/db"
import { Suspense } from "react"
import { Onboarding } from "../components/(user)/Onboarding"
import Loading from "./loading"
import { User } from "@prisma/client"
import { GenderModal } from "@/components/settings/GenderModal"
import { AvatarModal } from "@/components/settings/AvatarModal"
import { ProfileModal } from "@/components/settings/ProfileModal"
import { UsernameModal } from "@/components/settings/UsernameModal"
import { redirect } from "next/navigation"
import { StaffDeactivated } from "@/components/staff-deactivated"
import { UrbanFarmDeactivated } from "@/components/urbanfarm-deactivated"
import { UserWithCommunity } from "@/lib/types"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AGreen Nature Connect',
  description: 'Greens in the Streets: Farming for a Better Tomorrow',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getAuthSession()

  const user = await prisma.user.findFirst({
    where: {
      id: session?.user.id,
    },
    include: {
      Community: true
    }
  })

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <CartProvider>
          <Providers>
            {session?.user.birthday === null && session?.user.role === "USER" ? (
              <>
                <Onboarding user={user as UserWithCommunity} />
              </>
            ) : session?.user && session.user.numberOfViolations >= 3 ? (
              <>
                <UserBanned />
              </>
            ) : (
              <>
                {user?.isDisabled === true ? (
                  <StaffDeactivated />
                ) : (user?.Community?.isArchived && (user?.role === "ADMIN" || user?.role === "EMPLOYEE")) ? (
                  <UrbanFarmDeactivated />
                ) : (
                  <>
                    <Navbar />
                    <LoginModal />
                    <RegisterModal />
                    <UserSettings user={user as User} />
                    <GenderModal user={user as User} />
                    <AvatarModal />
                    <ProfileModal user={user as User} />
                    <UsernameModal user={user as User} />
                    <Suspense fallback={<Loading />}>
                      <div className="relative pt-[5rem] md:pt-[5rem] z-0 bg-whit h-screen min-h-screen">
                        {children}
                      </div>
                    </Suspense>
                  </>
                )
                }
              </>
            )
            }
            <Toaster />
          </Providers >
        </CartProvider>
      </body>
    </html >
  )
}