"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession(); // destructure the session object and create session and status constants

  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

   if (!session) return null;

  return (
    <main className="show flex-grow flex flex-col">
    </main>
  )
}