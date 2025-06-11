"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import toast from "react-hot-toast";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        toast.error("Login failed or session missing");
        router.push("/"); // back to login
      } else {
        toast.success("Logged in successfully!");
        router.push("/dashboard"); // success!
      }
    };

    handleAuthRedirect();
  }, []);

  return <div className="p-10">Redirecting...</div>;
}