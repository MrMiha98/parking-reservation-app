"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import ParkingGrid from "../components/ParkingGrid";
import RolePickerModal from "../components/RolePickerModal";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndRole = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!authData.user) {
        router.push("/");
        return;
      }

      setUser(authData.user);

      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", authData.user.id);

      if (error) {
        console.error("Error fetching role:", error.message);
      } else if (profiles && profiles.length > 0) {
        setRole(profiles[0].role);
      } else {
        setRole(null);
      }

      setLoading(false);
    };

    fetchUserAndRole();
  }, []);

  if (loading) {
    return <div className="flex flex-grow justify-center items-center">Loading...</div>;
  }

  return (
    <main className="w-full flex-grow flex flex-col">
      {role ? (
        <ParkingGrid />
      ) : (
        <RolePickerModal onComplete={() => setRole("just anything to close modal")} />
      )}
    </main>
  );
}
