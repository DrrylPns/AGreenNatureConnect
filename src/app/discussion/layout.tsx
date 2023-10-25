import { Inter } from "next/font/google"
import Navbar from "./_component/Navbar"
import SIdebar from "./_component/SIdebar"
import RegisterModal from "../components/modals/RegisterModal"
import LoginModal from "../components/modals/LoginModal"

const inter = Inter({ subsets: ['latin'] })

export default function DiscussionLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#F0EEF6]`}>
        <LoginModal />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>

  )
}