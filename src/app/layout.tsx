import Notification from "@/components/Notification";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Banti Restaurant",
  description: "Best restaurant in town",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#fcf6ef]`}>
        <AuthProvider>
          <QueryProvider>
        <div className="relative">
          {/* <Notification /> */}
          <Navbar />
          {children}
          <div className="z-50">
          <Toaster />
          </div>
          <Footer />
        </div>
        </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
