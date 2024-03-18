import "@/lib/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Navbar from "../components/Navbar/navbar";
import { getAuthSession } from "../../lib/auth";
import prisma from "@/lib/db/db";

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
      id: session?.user.id
    }
  })

  console.log(user)

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Suspense>
          <Navbar />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
