import "@/lib/styles/globals.css"
import Navbar from "../components/(user)/Navbar"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SIdebar from "../components/SIdebar"
import LoginModal from "../components/modals/LoginModal"
import RegisterModal from "../components/modals/RegisterModal"
import Providers from "@/lib/providers/Providers"
import { Toaster } from "../components/toast/toaster"
import { Suspense } from "react"
import { getAuthSession } from "@/lib/auth"

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
          {/**I removed the session={session} */}
          <Navbar />
          <SIdebar />

          <LoginModal />
          <RegisterModal />
            {children}
          <Toaster />
        </Providers >
      </body>
    </html>
  )
}