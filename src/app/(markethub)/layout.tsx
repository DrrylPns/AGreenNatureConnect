import "@/lib/styles/globals.css"
import Navbar from "../components/(user)/Navbar"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SIdebar from "../components/SIdebar"
import LoginModal from "../components/modals/LoginModal"
import RegisterModal from "../components/modals/RegisterModal"
import Providers from "@/lib/providers/Providers"
import { Toaster } from "../components/toast/toaster"
import { getAuthSession } from "@/lib/auth"
import { Onboarding } from "../components/(user)/Onboarding"

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

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          {session?.user.birthday === null && session?.user.role === "USER" ? (
            <>
              <Onboarding />
            </>
          ):(
            <>
              <Navbar session={session} />

              <LoginModal />
              <RegisterModal />
              <div className="relative pt-[5rem] md:pt-[5rem] z-0 bg-whit h-screen min-h-screen">
                {children}
              </div>
            </>
            )
          }
          <Toaster />
        </Providers >

      </body>
    </html>
  )
}