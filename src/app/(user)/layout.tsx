import "@/lib/styles/globals.css"
import Navbar from "../components/(user)/Navbar"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SIdebar from "../components/SIdebar"
import LoginModal from "../components/modals/LoginModal"
import RegisterModal from "../components/modals/RegisterModal"
import Providers from "@/lib/providers/Providers"
import { Toaster } from "../components/toast/toaster"
// import { Suspense } from "react"
import { getAuthSession } from "@/lib/auth"
// import { SkeletonTheme } from "react-loading-skeleton"
// import OnboardingPage from "../(auth)/onboarding/page"
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

  console.log(session?.user.birthday)

  // if (session?.user.birthday === null) {
  //   return (
  //     <Providers>
  //       <OnboardingPage />
  //     </Providers>
  //   )
  // }

  return (
    <html lang="en">
      <body className={`${inter.className}`}>

        <Providers>
          {session?.user.birthday === null ? (
            <>
              <Onboarding />
            </>
          )
            : (<>
              <Navbar session={session} />
              <SIdebar />

              <LoginModal />
              <RegisterModal />
              {children}
            </>)

          }

          <Toaster />
        </Providers >

      </body>
    </html>
  )
}