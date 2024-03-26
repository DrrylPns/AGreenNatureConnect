import Providers from "@/lib/providers/Providers"
import "@/lib/styles/globals.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getAuthSession } from '../../lib/auth'
import Navbar from "../components/(user)/Navbar"
import LoginModal from "../components/modals/LoginModal"
import RegisterModal from "../components/modals/RegisterModal"
import { Toaster } from "../components/toast/toaster"

import { UserBanned } from "@/components/UserBanned"
import { UserSettings } from "@/components/UserSettings"
import { CartProvider } from "@/contexts/CartContext"
import prisma from "@/lib/db/db"
import { Suspense } from "react"
import { Onboarding } from "../components/(user)/Onboarding"
import Loading from "./loading"
import { User } from "@prisma/client"

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
    }
  })

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <CartProvider>
          <Providers>
            {session?.user.birthday === null && session?.user.role === "USER" ? (
              <>
                <Onboarding />
              </>
            ) : session?.user && session.user.numberOfViolations >= 3 ? (
              <>
                <UserBanned />
              </>
            ) : (
              <>
                <Navbar />

                <LoginModal />
                <RegisterModal />
                <UserSettings user={user as User} />
                <Suspense fallback={<Loading />}>
                  <div className="relative pt-[5rem] md:pt-[5rem] z-0 bg-whit h-screen min-h-screen">
                    {children}
                  </div>
                </Suspense>
              </>
            )
            }
            <Toaster />
          </Providers >
        </CartProvider>
      </body>
    </html>
  )
}