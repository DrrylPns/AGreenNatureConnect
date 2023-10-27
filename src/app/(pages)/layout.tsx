'use client'
import { usePathname, useRouter } from "next/navigation"
import LandingNavbar from '../components/Navbar/navbar'
import Navbar from "../components/Navbar"
import SIdebar from "../components/SIdebar"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {
    
    const router = useRouter()
    const pathname = usePathname()
    const isRootPath = pathname === '/'
    const isTermsPolicy = pathname === '/termsPolicy'
    return (
        <section className={`${isTermsPolicy ? 'bg-white': 'bg-[#F0EEF6]' }`}>
            {!isRootPath && (
              isTermsPolicy?(
                <>
                <LandingNavbar/>
                </>
              ):(
              <>
                <Navbar/>
                <SIdebar/>
              </>
              )
            
            )}
            {children}
        </section>
    )
  }