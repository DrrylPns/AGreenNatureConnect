import "@/lib/styles/globals.css"
import Navbar from "../components/(user)/Navbar"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SIdebar from "../components/SIdebar"
import LoginModal from "../components/modals/LoginModal"
import RegisterModal from "../components/modals/RegisterModal"
import Providers from "@/lib/providers/Providers"
import { Toaster } from "../components/toast/toaster"

const inter = Inter({ subsets: ['latin'] })

//server .... role based
export const metadata: Metadata = {
  title: 'AGreen Nature Connect',
  description: 'Greens in the Streets: Farming for a Better Tomorrow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
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