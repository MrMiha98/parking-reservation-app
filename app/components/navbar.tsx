"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import DarkmodeToggle from "./DarkModeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

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
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image src={session.user?.image || "/media/default-user-image.png"} width={40} height={40} alt="User Profile Picture" className="rounded-full cursor-pointer"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-border dark:border-darkmode-border mr-12">
              <DropdownMenuLabel className="text-black dark:text-white">{session.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => signOut({callbackUrl: "/"})} className="cursor-pointer text-primary dark:text-[#d2d2d2] hover:!bg-red-100 hover:!text-red-500 dark:hover:!bg-red-500 dark:hover:!text-white">Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="h-10 rounded-sm cursor-pointer dark:bg-white dark:hover:bg-[#c8c8c8]">Sign In</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-border dark:border-darkmode-border mr-12">
                <DropdownMenuLabel className="text-black dark:text-white">Sign In Using:</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-[#E2E8F0] dark:bg-[#373737]"/>
                <DropdownMenuItem onClick={() => signIn("github", { callbackUrl: "/dashboard" })} className="cursor-pointer text-primary dark:text-[#d2d2d2]">GitHub
                  <Image src="/media/github-logo-light.png" className="dark:hidden" height={24} width={24} alt="GitHub Logo"/>
                  <Image src="/media/github-logo-dark.png" className="hidden dark:block" height={24} width={24} alt="GitHub Logo"/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  )
}