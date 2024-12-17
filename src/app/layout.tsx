import Notification from "@/components/Notification";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar";
import './styles.css'
import { Fjalla_One, Paytone_One, Poppins, Roboto, Tenor_Sans } from 'next/font/google'




export const metadata: Metadata = {
  title: "Moore pizza",
  description: "Best pizza in town",
};

const tenor_sans = Tenor_Sans({
  weight:['400'],
  subsets:['latin']
})


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-[#fcf6ef] ${tenor_sans.className}`}>
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
