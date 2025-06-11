"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import DarkmodeToggle from "./DarkModeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/auth");
  };

  return (
    <nav className="h-16 w-full border-b border-border dark:border-darkmode-border">
      <div className="h-16 max-w-3xl mx-auto flex items-center justify-between px-4 sm:px-6">
        <div className="h-16 flex items-center gap-4">
          <Link href="/">
            <Image className="dark:hidden transition-all ease-in duration-150 hover:scale-105"
              src="/media/logo-dark.png"
              alt="App Logo"
              width={42}
              height={42}/>
            <Image className="hidden dark:block transition-all ease-in duration-150 hover:scale-105"
              src="/media/logo-light.png"
              alt="App Logo"
              width={42}
              height={42}/>
          </Link>
          <Link className="font-medium text-sm text-primary dark:text-darkmode-primary flex justify-center items-center h-10 p-2 rounded-sm transition-all ease-in duration-150 hover:bg-hovercolor dark:hover:bg-darkmode-hovercolor"
            href="/">How To Use</Link>
          <Link className="font-medium text-sm text-primary dark:text-darkmode-primary flex justify-center items-center h-10 p-2 rounded-sm transition-all ease-in duration-150 hover:bg-hovercolor dark:hover:bg-darkmode-hovercolor"
            href="/">About Us</Link>
        </div>
        <div className="flex flex-row items-center gap-x-6">
          <DarkmodeToggle/>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image className="rounded-full cursor-pointer"
                  src="/media/default-user-image.png"
                  width={40}
                  height={40}
                  alt="User Profile Picture"/>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-border dark:border-darkmode-border mr-12 mt-4">
              <DropdownMenuLabel className="text-black dark:text-white">{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator/>
                <DropdownMenuItem className="cursor-pointer text-primary dark:text-[#d2d2d2]">
                  <Link className="flex flex-row items-center gap-x-2"
                    href="/dashboard">Dashboard <LayoutDashboard className="text-primary dark:text-[#d2d2d2]" strokeWidth={1.5}/></Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex flex-row items-center gap-x-2 text-primary dark:text-[#d2d2d2] hover:!bg-red-100 hover:!text-red-500 dark:hover:!bg-red-500 dark:hover:!text-white"
                  onClick={handleLogout}>Sign Out <LogOut className="hover:text-red-500" strokeWidth={1.5}/></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth"><Button className="h-10 rounded-sm cursor-pointer dark:bg-white dark:hover:bg-[#c8c8c8]">Sign In</Button></Link>
          )}
        </div>
      </div>
    </nav>
  )
}