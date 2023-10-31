'use client'
import { usePathname, useRouter } from "next/navigation"
import LandingNavbar from '../components/Navbar/navbar'
import Navbar from "../components/Navbar"
import SIdebar from "../components/SIdebar"
import LoginModal from "../components/modals/LoginModal"
import RegisterModal from "../components/modals/RegisterModal"
import Providers from "@/lib/providers/Providers"
import { Toaster } from "../components/toast/toaster"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

  const pathname = usePathname()
  const isRootPath = pathname === '/'
  const isTermsPolicy = pathname === '/termsPolicy'
  return (
    <section className={`${isTermsPolicy ? 'bg-white' : 'bg-[#F0EEF6]'}`}>
      <Providers>
        {!isRootPath && (
          isTermsPolicy ? (
            <>
              <LandingNavbar />
            </>
          ) : (
            <>
              <Navbar />
              <SIdebar />
            </>
          )

        )}
        <LoginModal />
        <RegisterModal />
        {children}

        <Toaster />
      </Providers >
    </section>
  )
}