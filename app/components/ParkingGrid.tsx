"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { PostgrestError } from '@supabase/supabase-js';
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import React from "react";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const format = (date: Date): string => date.toISOString().split('T')[0];
const formattedToday = format(today);
const formattedTomorrow = format(tomorrow);

const t = new Date();
const nextWeekDate = new Date();
nextWeekDate.setDate(t.getDate() + 7);

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

type ParkingAvailability = {
  spot_id: number;
  date: string;
};

export default function ParkingGrid() {
  const [data, setData] = useState<ParkingAvailability[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("parking_availability").select("spot_id, date");

      if (error) {
        console.error(error);
        setError(error);
      } else {
        setData(data);

        const userDates = data
          .filter((el) => el.spot_id === userId)
          .map((el) => new Date(el.date));

        setReservedDates(userDates);
      }
    }

    fetchData();
  }, []);

  const handleReserve = async () => {
    if (!selectedDates || selectedDates.length === 0) {
      alert("Please select at least one date.");
      return;
    }

    const rowsToInsert = selectedDates.map(date => ({
      spot_id: userId,
      date: formatDate(date),
    }));

    const { error } = await supabase.from("parking_availability").insert(rowsToInsert);

    if (error) {
      console.error("Error inserting reservations:", error);
      alert("An error occurred while saving your reservation.");
    } else {
      alert("Your reservation was successful!");
      setSelectedDates([]);
      setShowCalendar(false);
    }
  };

  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [reservedDates, setReservedDates] = useState<Date[]>([]);

  const userId = 10;

  const allSpots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const ownerNames = ["Bella C.", "Liam T.", "Emma R.", "Noah J.", "Olivia M.", "Mason K.", "Ava L.", "Ethan W.", "Sophia G.", "Lucas B.", "Isabella S.", "Logan D.", "Mia F.", "James H.", "Charlotte N.", "Benjamin A.", "Amelia P.", "Elijah V.", "Harper Z.", "Alexander Q."];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-start p-10 justify-between">
      <h1 className="font-bold text-3xl text-black dark:text-white mb-12">Reserve Your Parking Spot Now</h1>
      <div className="w-full flex justify-between items-end pb-1 relative">
        <h3 className="text-[#323232] dark:text-darkmode-primary">1st floor</h3>
        {userId < 8 ? (<Button variant="ghost" className="border border-border cursor-pointer" onClick={() => setShowCalendar(prev => !prev)}>Reserve your spot now</Button>) : null}
        {showCalendar && userId < 8 && (
          <div className="absolute top-10 right-0 flex flex-col justify-end items-center bg-white border border-border rounded-md pb-4 shadow-md z-10">
            <Calendar mode="multiple" selected={selectedDates} onSelect={(dates) => setSelectedDates(dates)} fromDate={today} toDate={nextWeekDate} modifiers={{ reserved: reservedDates }} modifiersClassNames={{ reserved: "bg-green-400 text-white" }} className="bg-white rounded-md border-none"/>
            <Button className="mt-4 h-10 w-[90%] cursor-pointer" onClick={handleReserve}>Reserve</Button>
          </div>
        )}
      </div>
      <div className="h-[0.5px] w-full bg-border dark:bg-darkmode-border mb-4"></div>
      <div className="w-fit grid grid-cols-4 gap-x-2 gap-y-6">
        {allSpots.slice(0, 7).map(spot => {
          const availableToday = data?.find(el => el.spot_id == spot && el.date == formattedToday);
          const availableTommorow = data?.find(el => el.spot_id == spot && el.date == formattedTomorrow);

          return (
            <div key={spot} className={`${userId == spot ? availableToday ? "bg-green-600" : "bg-red-600" : availableToday ? "bg-green-400" : "bg-red-400"} h-28 w-20 relative flex justify-center items-center ${spot == 5 ? "col-start-2" : ""} cursor-pointer`}>
              <h1 className="text-2xl font-bold text-gray-100">{spot}</h1>
              <p className={`text-[12px] font-semibold absolute bottom-0 ${spot == userId ? "text-white" : "text-primary"}`}>{availableToday ? "" : ownerNames[spot - 1]}</p>
              <div className={`absolute right-0 top-0 w-0 h-0 border-r-24 border-b-24 ${userId == spot ? availableTommorow ? "border-green-800" : "border-red-800" : availableTommorow ? "border-green-600" : "border-red-600"} border-b-transparent`}></div>
            </div>
          )
        })}
      </div>
      <div className="w-full flex justify-between items-end pb-1 relative mt-24">
        <h3 className="text-[#323232] dark:text-darkmode-primary">2nd floor</h3>
        {userId > 7 ? (<Button variant="ghost" className="border border-border cursor-pointer" onClick={() => setShowCalendar(prev => !prev)}>Reserve your spot now</Button>) : null}
        {showCalendar && userId > 7 && (
          <div className="absolute top-10 right-0 flex flex-col justify-end items-center bg-white border border-border rounded-md pb-4 z-10 shadow-md">
            <Calendar mode="multiple" selected={selectedDates} onSelect={(dates) => setSelectedDates(dates)} fromDate={today} toDate={nextWeekDate} modifiers={{ reserved: reservedDates }} modifiersClassNames={{ reserved: "bg-green-400 text-white" }} className="bg-white rounded-md border-none"/>
            <Button className="mt-4 h-10 w-[90%] cursor-pointer" onClick={handleReserve}>Reserve</Button>
          </div>
        )}
      </div>
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