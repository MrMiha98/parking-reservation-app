"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { PostgrestError } from '@supabase/supabase-js';
import { Calendar } from "@/components/ui/calendar"
import React from "react";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const format = (date: Date): string => date.toISOString().split('T')[0];
const formattedToday = format(today);
const formattedTomorrow = format(tomorrow);

type ParkingAvailability = {
  spot_id: number;
  date: string;
};

export default function ParkingGrid() {
  const [data, setData] = useState<ParkingAvailability[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);

  const [hoveredSpot, setHoveredSpot] = useState<number | null>(null);
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("parking_availability").select("spot_id, date");

      if (error) {
        console.error(error);
        setError(error);
      } else {
        setData(data);
      }
    }

    fetchData();
  }, []);

  const userId = 5;

  const allSpots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const ownerNames = ["Bella C.", "Liam T.", "Emma R.", "Noah J.", "Olivia M.", "Mason K.", "Ava L.", "Ethan W.", "Sophia G.", "Lucas B.", "Isabella S.", "Logan D.", "Mia F.", "James H.", "Charlotte N.", "Benjamin A.", "Amelia P.", "Elijah V.", "Harper Z.", "Alexander Q."];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-start p-10">
      <h1 className="font-bold text-3xl text-black dark:text-white mb-12">Reserve Your Parking Spot Now</h1>
      <h3 className="text-[#323232] dark:text-darkmode-primary">1st floor</h3>
      <div className="h-[0.5px] w-full bg-border dark:bg-darkmode-border mt-1 mb-4"></div>
      <div className="w-fit grid grid-cols-4 gap-x-2 gap-y-6">
        {allSpots.slice(0, 7).map(spot => {
          const availableToday = data?.find(el => el.spot_id == spot && el.date == formattedToday);
          const availableTommorow = data?.find(el => el.spot_id == spot && el.date == formattedTomorrow);

          return (
            <div key={spot} onMouseEnter={() => setHoveredSpot(spot)} onMouseLeave={() => setHoveredSpot(null)} className={`${userId == spot ? availableToday ? "bg-green-600" : "bg-red-600" : availableToday ? "bg-green-400" : "bg-red-400"} h-28 w-20 relative flex justify-center items-center ${spot == 5 ? "col-start-2" : ""} cursor-pointer`}>
              <h1 className="text-2xl font-bold text-gray-100">{spot}</h1>
              <p className={`text-[12px] font-semibold absolute bottom-0 ${spot == userId ? "text-white" : "text-primary"}`}>{availableToday ? "" : ownerNames[spot - 1]}</p>
              <div className={`absolute right-0 top-0 w-0 h-0 border-r-24 border-b-24 ${userId == spot ? availableTommorow ? "border-green-800" : "border-red-800" : availableTommorow ? "border-green-600" : "border-red-600"} border-b-transparent`}></div>
              {hoveredSpot == spot && hoveredSpot == userId && (
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border"/>
              )}
            </div>
          )
        })}
      </div>
      <h3 className="text-[#323232] dark:text-darkmode-primary mt-16">2nd floor</h3>
      <div className="h-[0.5px] w-full bg-border dark:bg-darkmode-border mt-1 mb-4"></div>
      <div className="w-fit grid grid-cols-7 gap-x-2 gap-y-6">
        {allSpots.slice(7, 20).map(spot => {
          const availableToday = data?.find(el => el.spot_id == spot && el.date == formattedToday);
          const availableTommorow = data?.find(el => el.spot_id == spot && el.date == formattedTomorrow);

          return (
            <div key={spot} className={`${userId == spot ? availableToday ? "bg-green-600" : "bg-red-600" : availableToday ? "bg-green-400" : "bg-red-400"} h-28 w-20 relative flex justify-center items-center ${spot == 8 ? "col-start-2" : ""} cursor-pointer`}>
              <h1 className="text-2xl font-bold text-gray-100">{spot}</h1>
              <p className={`text-[12px] font-semibold absolute bottom-0 ${spot == userId ? "text-white" : "text-primary"}`}>{availableToday ? "" : ownerNames[spot - 1]}</p>
              <div className={`absolute right-0 top-0 w-0 h-0 border-r-24 border-b-24 ${userId == spot ? availableTommorow ? "border-green-800" : "border-red-800" : availableTommorow ? "border-green-600" : "border-red-600"} border-b-transparent`}></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}