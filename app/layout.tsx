import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Parking Reservation App",
  description: "Reserve your parking spot easily and efficiently.",
};

export default function RootLayout({ children } : Readonly<{ children : React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-background dark:bg-darkmode-background h-full min-h-screen flex flex-col`}>
        <Navbar/>
        {children}
        <Toaster position="top-right" reverseOrder={false} />
        <Footer/>
      </body>
    </html>
  );
}