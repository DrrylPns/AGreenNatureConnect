import "@/lib/styles/globals.css";
import Navbar from "../components/(user)/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SIdebar from "../components/SIdebar";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import Providers from "@/lib/providers/Providers";
import { Toaster } from "../components/toast/toaster";
// import { Suspense } from "react"
// import { SkeletonTheme } from "react-loading-skeleton"
// import OnboardingPage from "../(auth)/onboarding/page"
import { Onboarding } from "../components/(user)/Onboarding";
import { ThemeProvider } from "../components/Ui/ThemeProvider";
import { CartProvider } from "@/contexts/CartContext";
import prisma from "@/lib/db/db";
import { User } from "@prisma/client";
import { OnboardingUser } from "./_components/OnboardingUser";
import { UserBanned } from "@/components/UserBanned";
import { getAuthSession } from "../../lib/auth";
import { UserSettings } from "@/components/UserSettings";
import { GenderModal } from "@/components/settings/GenderModal";
import { AvatarModal } from "@/components/settings/AvatarModal";
import { ProfileModal } from "@/components/settings/ProfileModal";
import { UsernameModal } from "@/components/settings/UsernameModal";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AGreen Nature Connect",
  description: "Greens in the Streets: Farming for a Better Tomorrow",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
              {
                //google
                session?.user.birthday === null && session?.user.role === "USER" ? (
                  <>
                    <Onboarding />
                  </>
                  //normal user registration
                ) : session?.user.name === null && session?.user.role === "USER" ? (
                  <>
                    <OnboardingUser />
                  </>
                ) : session?.user && session.user.numberOfViolations >= 3 ? (
                  <>
                    <UserBanned />
                  </>
                ) : (
                  <>
                    <Navbar />
                    <SIdebar />
                    <LoginModal />
                    <RegisterModal />
                    <UserSettings user={user as User} />
                    <GenderModal user={user as User} />
                    <AvatarModal />
                    <ProfileModal user={user as User} />
                    <UsernameModal user={user as User} />
                    <div className="pt-[8rem] md:pt-[6rem] sm:px-[3%] md:pl-[25%] z-0 bg-white dark:bg-[#18191A] px-3 h-full">
                      {children}
                    </div>
                  </>
                )
              }

              <Toaster />
            </Providers>
          </ThemeProvider>
        </CartProvider>

      </body>
    </html>
  );
}
