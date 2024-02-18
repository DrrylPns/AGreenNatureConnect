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
import { getAuthSession } from "@/lib/auth";
// import { SkeletonTheme } from "react-loading-skeleton"
// import OnboardingPage from "../(auth)/onboarding/page"
import { Onboarding } from "../components/(user)/Onboarding";
import { ThemeProvider } from "../components/Ui/ThemeProvider";

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
  const session = await getAuthSession();

  console.log(session?.user.birthday);

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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {session?.user.birthday === null &&
              session?.user.role === "USER" ? (
              <>
                <Onboarding />
              </>
            ) : (
              <>
                <Navbar session={session} />
                <SIdebar />

                <LoginModal />
                <RegisterModal />
                <div className="pt-[8rem] md:pt-[6rem] sm:px-[3%] md:pl-[25%] z-0 bg-white dark:bg-[#121212] px-3">
                  {children}
                </div>

              </>
            )}

            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
