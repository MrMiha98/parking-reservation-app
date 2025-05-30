import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import DarkmodeToggle from "./darkmodeToggle"

export default function Navbar() {
  return (
    <nav className="h-16 w-full border-b border-border dark:border-darkmode-border">
      <div className="h-16 max-w-3xl mx-auto flex items-center justify-between px-4 sm:px-6">
        <div className="h-16 flex items-center gap-4">
          <Link href="/">
            <Image src="/media/logo-dark.png" alt="App Logo" width={42} height={42} className="dark:hidden transition-all ease-in duration-150 hover:scale-105"/>
            <Image src="/media/logo-light.png" alt="App Logo" width={42} height={42} className="hidden dark:block transition-all ease-in duration-150 hover:scale-105"/>
          </Link>
          <Link href="/" className="font-medium text-sm text-primary dark:text-darkmode-primary flex justify-center items-center h-10 p-2 rounded-sm transition-all ease-in duration-150 hover:bg-hovercolor dark:hover:bg-darkmode-hovercolor">How To Use</Link>
          <Link href="/" className="font-medium text-sm text-primary dark:text-darkmode-primary flex justify-center items-center h-10 p-2 rounded-sm transition-all ease-in duration-150 hover:bg-hovercolor dark:hover:bg-darkmode-hovercolor">About Us</Link>
        </div>
        <div className="flex flex-row items-center gap-x-6">
          <DarkmodeToggle/>
          <Link href="/">
            <Button className="h-10 rounded-sm cursor-pointer dark:bg-white dark:hover:bg-[#c8c8c8]">Sign In</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}