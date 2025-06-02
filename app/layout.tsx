import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SessionWrapper from "@/components/sessionWrapper";

const inter = Inter({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Parking Reservation App",
  description: "Reserve your parking spot easily and efficiently.",
};

export default function RootLayout({ children } : Readonly<{ children : React.ReactNode }>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${inter.className} antialiased bg-background dark:bg-darkmode-background h-full min-h-screen flex flex-col`}>
          <Navbar/>
          {children}
          <Footer/>
        </body>
      </html>
    </SessionWrapper>
  );
}