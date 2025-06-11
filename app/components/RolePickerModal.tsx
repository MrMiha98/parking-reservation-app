"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function RolePickerModal({ onComplete }: { onComplete: () => void }) {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [takenSpots, setTakenSpots] = useState<number[]>([]);
  const router = useRouter();

  // Get the current user
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadTakenSpots = async () => {
      // Fetch current user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Fetch roles of other users (not the current one)
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .neq("id", user?.id); // exclude current user

      if (error) {
        console.error("Error fetching taken spots:", error.message);
        return;
      }

      const spots = data
        .map((item) => parseInt(item.role))
        .filter((spot) => !isNaN(spot)); // ignore "none" or invalid

      setTakenSpots(spots);
    };

    loadTakenSpots();
  }, []);

  const handleSave = async () => {
    if (!role) return alert("Please select a role.");
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, role });

    if (error) {
      alert("Failed to save role: " + error.message);
    } else {
      onComplete();
      router.push("/dashboard");
    }

    setLoading(false);
  };

  // All possible spot numbers
  const allSpots = Array.from({ length: 20 }, (_, i) => i + 1);
  const availableSpots = allSpots.filter((spot) => !takenSpots.includes(spot));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        <h2 className="text-xl mb-4">Select Your Parking Spot</h2>
        <select
          className="w-full border p-2 mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}>
          <option value="">-- Select --</option>
          {availableSpots.map((spot) => (
            <option key={spot} value={spot}>
              Spot {spot}
            </option>
          ))}
          <option value="none">I don’t own a spot</option>
        </select>
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {loading ? "Saving..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
