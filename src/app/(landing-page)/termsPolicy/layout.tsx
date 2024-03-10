import "@/lib/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Navbar from "../components/NavbarPages";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AGreen Nature Connect",
  description: "Greens in the Streets: Farming for a Better Tomorrow",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
