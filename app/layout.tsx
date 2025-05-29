import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar"

const font = localFont({
  src: "../public/fonts/CalSans-Regular.woff2"
});

export const metadata: Metadata = {
  title: "Parking Reservation App",
  description: "Reserve your parking spot easily and efficiently.",
};

export default function RootLayout({ children } : Readonly<{ children : React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased bg-background`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}