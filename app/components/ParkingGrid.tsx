"use client";

import { supabase } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { PostgrestError } from '@supabase/supabase-js';
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import React from "react";
import { Trash2 } from "lucide-react";
import { toast } from 'react-hot-toast';

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

type Reservation = {
  spot_id: number;
  date: string;
  user_id: number;
  user_name: string;
};

export default function ParkingGrid() {
  const [user, setUser] = useState<any>(null);

  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [data, setData] = useState<ParkingAvailability[]>([]);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [isUnreserveMode, setIsUnreserveMode] = useState(false);

  const [selectedSpotId, setSelectedSpotId] = useState<number | null>(null);
  const [reservedDatesForSpot, setReservedDatesForSpot] = useState<Date[]>([]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user || null);
    };

    getUser();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("parking_availability")
        .select("spot_id, date");

      if (error) {
        console.error(error);
        setError(error);
      } else {
        setData(data);

        const userDates = data
        .filter((el) => el.spot_id === user_role)
        .map((el) => new Date(el.date));

        setReservedDates(userDates);
      }

      setIsLoading(false); 
    }

    fetchData();
  }, [refreshTrigger]);

  useEffect(() => {
    const fetchReservations = async () => {
      const { data, error } = await supabase
        .from("parking_reservations")
        .select("spot_id, date, user_id, user_name")
        .eq("date", formattedToday);

      if (error) {
        console.error("Error fetching reservations:", error);
      } else {
        setReservations(data);
      }
    };

    fetchReservations();
  }, [formattedToday, refreshTrigger]);

  const handleReserve = async () => {
    if (!selectedDates || selectedDates.length === 0) {
      toast.error("Please select at least one date.");
      return;
    }

    const rowsToInsert = selectedDates.map(date => ({
      spot_id: user_role,
      date: formatDate(date),
    }));

    const { error } = await supabase
      .from("parking_availability")
      .insert(rowsToInsert);

    if (error) {
      if (error.code === '23505') {
        toast.error('This spot is already reserved on this date.');
      } else {
        toast.error('An error occurred while saving your reservation.');
      }
    } else {
      toast.success('Your reservation was successful!');
      setSelectedDates([]);
      setShowCalendar(false);
    }

    setRefreshTrigger(prev => prev + 1);
  };

  const handleUnreserve = async () => {
    console.log(selectedDates);
    if (!selectedDates || selectedDates.length === 0) {
      toast.error("Please select dates to unreserve.");
      return;
    }

    const datesToDelete = selectedDates?.map(date => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }) ?? [];

    const { error } = await supabase
      .from("parking_availability")
      .delete()
      .in("date", datesToDelete)
      .eq("spot_id", user_role);

    if (error) {
      console.error("Error deleting reservations:", error);
      toast.error("Failed to unreserve dates. Please try again.");
    } else {
      toast.success("Selected dates were successfully unreserved!");

      const { data, error } = await supabase
        .from("parking_availability")
        .select("date")
        .eq("spot_id", user_role);

      if (error) {
        console.error("Error fetching updated reservations:", error);
      } else {
        const updatedReservedDates = data.map(el => new Date(el.date));
        setReservedDates(updatedReservedDates);
      }

      setSelectedDates([]);
    }

    setRefreshTrigger(prev => prev + 1);
  };

  const handleSpotClick = async (spotId : number) => {
    setSelectedSpotId(spotId);
    setSelectedDates([]); // Clear selection
    setIsCalendarOpen(true);

    const { data, error } = await supabase
      .from('parking_availability')
      .select('date')
      .eq('spot_id', spotId);

    if (error) {
      console.error('Error fetching reserved dates:', error);
      return;
    }

    const reservedDates = data.map(row => new Date(row.date));
    setReservedDatesForSpot(reservedDates);
  };

  const handleReserveForSelectedSpot = async () => {
    if (!selectedDates || selectedDates.length === 0) {
      toast.error("Please select at least one date.");
      return;
    }

    if (!selectedSpotId) {
      toast.error("No spot selected.");
      return;
    }

    const formattedDates = selectedDates.map(date => formatDate(date));

    // Step 1 → Check if user already has a reservation on any of these dates
    const { data: existingReservations, error: checkError } = await supabase
      .from("parking_reservations")
      .select("id")
      .eq("user_id", user_role)
      .in("date", formattedDates);

    if (checkError) {
      console.error("Error checking existing reservations:", checkError);
      toast.error("An error occurred while checking reservations.");
      return;
    }

    if (existingReservations.length > 0) {
      toast.error("You already have a reservation on one or more of these dates.");
      return;
    }

    // Step 2 → Insert new reservations into parking_reservations
    const rowsToInsert = selectedDates.map(date => ({
      user_id: user?.email,
      user_name: user?.user_metadata?.name || "Unknown User",
      spot_id: selectedSpotId,
      date: formatDate(date),
    }));

    const { error: insertError } = await supabase
      .from("parking_reservations")
      .insert(rowsToInsert);

    if (insertError) {
      console.error("Error inserting reservations:");
      toast.error(`Error inserting reservations`);
      return;
    }

    // Step 3 → Delete the corresponding free rows from parking_availability
    const { error: deleteError } = await supabase
      .from("parking_availability")
      .delete()
      .in("date", formattedDates)
      .eq("spot_id", selectedSpotId);

    if (deleteError) {
      console.error("Error deleting availability:", deleteError);
      toast.error("An error occurred after reservation.");
      return;
    }

    // All done!
    toast.success("Spot reserved successfully!");
    setSelectedDates([]);
    setIsCalendarOpen(false);

    // Trigger grid refresh
    setRefreshTrigger(prev => prev + 1);
  };

  const user_role = 21;

  const allSpots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const ownerNames = ["Bella C.", "Liam T.", "Emma R.", "Noah J.", "Olivia M.", "Mason K.", "Ava L.", "Ethan W.", "Sophia G.", "Lucas B.", "Isabella S.", "Logan D.", "Mia F.", "James H.", "Charlotte N.", "Benjamin A.", "Amelia P.", "Elijah V.", "Harper Z.", "Alexander Q."];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-start p-10 justify-between relative">
      <h1 className="font-bold text-3xl text-black dark:text-white mb-12">Reserve Your Parking Spot Now</h1>
      <div className="w-full flex justify-between items-end pb-1 relative">
        <h3 className="text-[#323232] dark:text-darkmode-primary">1st floor</h3>
        {user_role < 8 ? (
          <div className="flex flex-row gap-x-1">
            <Button className="border border-border cursor-pointer"
              variant="ghost"
              onClick={() => {
                setIsUnreserveMode(true);
                setShowCalendar(prev => !prev)
              }}><Trash2 className="text-red-500"/></Button>
            <Button className="border border-border cursor-pointer"
              variant="ghost"
              onClick={() => {
                setShowCalendar(prev => !prev);
                setIsUnreserveMode(false)
              }}>Free up your spot</Button>
            {showCalendar && user_role < 8 && (
              isUnreserveMode ? (
                <div className="absolute top-10 right-0 flex flex-col justify-end items-center bg-white border border-border rounded-md pb-4 shadow-md z-10">
                  <Calendar className="bg-white rounded-md border-none"
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={(dates) => setSelectedDates(dates)}
                    fromDate={today}
                    toDate={nextWeekDate}
                    modifiers={{
                      reserved: reservedDates,
                      selectedForUnreserve: selectedDates ?? []
                    }}
                    modifiersClassNames={{
                      reserved: isUnreserveMode ? "bg-red-400 text-white" : "bg-gray-200 text-gray-500",
                      selectedForUnreserve: "!bg-black"
                    }}
                    disabled={(date) => {
                      const isReserved = reservedDates.some(d => d.toDateString() === date.toDateString());
                      return !isReserved;
                    }}
                  />
                  <Button className="mt-4 h-10 w-[90%] cursor-pointer border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    variant="outline"
                    onClick={handleUnreserve}>Delete Freed Up Spot</Button>
                </div>
              ) : (
                <div className="absolute top-10 right-0 flex flex-col justify-end items-center bg-white border border-border rounded-md pb-4 shadow-md z-10">
                  <Calendar className="bg-white rounded-md border-none"
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={(dates) => setSelectedDates(dates)}
                    fromDate={today}
                    toDate={nextWeekDate}
                    disabled={(date) => {
                      const isReserved = reservedDates.some(d => d.toDateString() === date.toDateString());
                      return isReserved
                    }}
                    modifiers={{
                      reserved: reservedDates
                    }}
                    modifiersClassNames={{
                      reserved: "bg-green-400 text-white" }}/>
                  <Button className="mt-4 h-10 w-[90%] cursor-pointer"
                    onClick={handleReserve}>Free Up</Button>
                </div>
              )
            )}
          </div>
          ) : null
        }
      </div>
      <div className="h-[0.5px] w-full bg-border dark:bg-darkmode-border mb-4"></div>
      <div className="w-fit grid grid-cols-4 gap-x-2 gap-y-6 relative">
        {allSpots.slice(0, 7).map(spot => {
          const availableToday = data?.find(el => el.spot_id == spot && el.date == formattedToday);
          const availableTommorow = data?.find(el => el.spot_id == spot && el.date == formattedTomorrow);

          // Spot class
          const spotClass = user_role == spot
            ? availableToday ? "bg-green-600" : "bg-red-600"
            : availableToday ? "bg-green-400" : "bg-red-400";

            return isLoading ? (
              <div className={`h-28 w-20 bg-gray-300 bg-opacity-50 flex justify-center items-center relative ${spot == 5 ? "col-start-2" : ""}`}
                key={spot}>
                <div className="h-8 w-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className={`${user_role == spot ? availableToday ? "bg-green-600" : "bg-red-600" : availableToday ? "bg-green-400" : "bg-red-400"} h-28 w-20 relative flex justify-center items-center ${spot == 5 ? "col-start-2" : ""} cursor-pointer ${isLoading ? "animate-pulse bg-gray-200" : spotClass}`}
                key={spot}
                onClick={() => {
                  if (!isLoading && user_role > 20) {
                    handleSpotClick(spot);
                  };
                }}>
                <h1 className="text-2xl font-bold text-gray-100">{spot}</h1>
                <p className={`text-[12px] font-semibold absolute bottom-0 ${spot == user_role ? "text-white" : "text-primary"}`}>
                    {(() => {
                      const spotReservation = reservations.find(r => r.spot_id === spot);
                      if (spotReservation) {
                        return spotReservation.user_name ?? "Unknown User";
                      } else {
                        return availableToday ? "" : ownerNames[spot - 1];
                      }
                    })()}
                </p>
                <div className={`absolute right-0 top-0 w-0 h-0 border-r-24 border-b-24 ${user_role == spot ? availableTommorow ? "border-green-800" : "border-red-800" : availableTommorow ? "border-green-600" : "border-red-600"} border-b-transparent`}></div>
              </div>
            )

        })}
      </div>
      <div className="w-full flex justify-between items-end pb-1 relative mt-24">
        <h3 className="text-[#323232] dark:text-darkmode-primary">2nd floor</h3>
        {user_role > 7 && user_role < 21 ? (
          <div className="flex flex-row gap-x-1">
            <Button className="border border-border cursor-pointer"
              variant="ghost"
              onClick={() => {
                setIsUnreserveMode(true);
                setShowCalendar(prev => !prev)
              }}><Trash2 className="text-red-500"/></Button>
            <Button className="border border-border cursor-pointer"
              variant="ghost"
              onClick={() => {
                setShowCalendar(prev => !prev);
                setIsUnreserveMode(false)
              }}>Free up your spot</Button>
            {showCalendar && user_role > 8 && (
              isUnreserveMode ? (
                <div className="absolute top-10 right-0 flex flex-col justify-end items-center bg-white border border-border rounded-md pb-4 shadow-md z-10">
                  <Calendar className="bg-white rounded-md border-none"
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={(dates) => setSelectedDates(dates)}
                    fromDate={today}
                    toDate={nextWeekDate}
                    modifiers={{
                      reserved: reservedDates,
                      selectedForUnreserve: selectedDates ?? []
                    }}
                    modifiersClassNames={{
                      reserved: isUnreserveMode ? "bg-red-400 text-white" : "bg-gray-200 text-gray-500",
                      selectedForUnreserve: "!bg-black"
                    }}
                    disabled={(date) => {
                      const isReserved = reservedDates.some(d => d.toDateString() === date.toDateString());
                      return !isReserved;
                    }}
                  />
                  <Button className="mt-4 h-10 w-[90%] cursor-pointer border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    variant="outline"
                    onClick={handleUnreserve}>Delete Freed Up Spot</Button>
                </div>
              ) : (
                <div className="absolute top-10 right-0 flex flex-col justify-end items-center bg-white border border-border rounded-md pb-4 shadow-md z-10">
                  <Calendar className="bg-white rounded-md border-none"
                    mode="multiple"
                    selected={selectedDates}
                    onSelect={(dates) => setSelectedDates(dates)}
                    fromDate={today}
                    toDate={nextWeekDate}
                    disabled={(date) => {
                      const isReserved = reservedDates.some(d => d.toDateString() === date.toDateString());
                      return isReserved
                    }}
                    modifiers={{
                      reserved: reservedDates
                    }}
                    modifiersClassNames={{
                      reserved: "bg-green-400 text-white"
                    }}/>
                  <Button className="mt-4 h-10 w-[90%] cursor-pointer"
                    onClick={handleReserve}>Free Up</Button>
                </div>
              )
            )}
          </div>
          ) : null}
      </div>
      <div className="h-[0.5px] w-full bg-border dark:bg-darkmode-border mt-1 mb-4"></div>
      <div className="w-fit grid grid-cols-7 gap-x-2 gap-y-6">
        {allSpots.slice(7, 20).map(spot => {
          const availableToday = data?.find(el => el.spot_id == spot && el.date == formattedToday);
          const availableTommorow = data?.find(el => el.spot_id == spot && el.date == formattedTomorrow);

          // Spot class
          const spotClass = user_role == spot
            ? availableToday ? "bg-green-600" : "bg-red-600"
            : availableToday ? "bg-green-400" : "bg-red-400";

          return isLoading ? (
            <div className={`h-28 w-20 bg-gray-300 bg-opacity-50 flex justify-center items-center relative ${spot == 8 ? "col-start-2" : ""}`}
              key={spot}>
              <div className="h-8 w-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className={`${user_role == spot ? availableToday ? "bg-green-600" : "bg-red-600" : availableToday ? "bg-green-400" : "bg-red-400"} h-28 w-20 relative flex justify-center items-center ${spot == 8 ? "col-start-2" : ""} cursor-pointer ${isLoading ? "animate-pulse bg-gray-200" : spotClass}`}
              key={spot}
              onClick={() => handleSpotClick(spot)}>
              <h1 className="text-2xl font-bold text-gray-100">{spot}</h1>
              <p className={`text-[12px] font-semibold absolute bottom-0 ${spot == user_role ? "text-white" : "text-primary"}`}>{availableToday ? "" : ownerNames[spot - 1]}</p>
              <div className={`absolute right-0 top-0 w-0 h-0 border-r-24 border-b-24 ${user_role == spot ? availableTommorow ? "border-green-800" : "border-red-800" : availableTommorow ? "border-green-600" : "border-red-600"} border-b-transparent`}></div>
            </div>
          )
        })}
      </div>

      {isCalendarOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-end items-center bg-white border border-border rounded-md pb-4 shadow-lg z-10">
          <Calendar className="bg-white rounded-md border-none"
            mode="multiple"
            selected={selectedDates}
            onSelect={(dates) => setSelectedDates(dates)}
            fromDate={today}
            toDate={nextWeekDate}
            disabled={(date) => {
              const isAvailable = reservedDatesForSpot.some(d => d.toDateString() === date.toDateString());
              return !isAvailable;
            }}
            modifiers={{
              available: reservedDatesForSpot
            }}
            modifiersClassNames={{
              available: "bg-green-500 text-white"
            }}/>
          <Button className={`${!selectedDates || selectedDates.length === 0 ? "hidden" : "block"} mt-4 h-10 w-[90%] cursor-pointer `}
            onClick={handleReserveForSelectedSpot}>Reserve Spot #{selectedSpotId}</Button>
          <Button className="mt-2 h-8 w-[90%] cursor-pointer"
            variant="outline"
            onClick={() => {
              setIsCalendarOpen(false);
              setReservedDatesForSpot([]);
            }}>Close</Button>
        </div>
      )}
    </div>
  )
}