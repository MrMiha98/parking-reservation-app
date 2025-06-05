import { supabase } from "@/lib/supabaseClient";

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
const format = (date: Date): string => date.toISOString().split('T')[0];
const formattedToday = format(today);
const formattedTomorrow = format(tomorrow);

export default async function ParkingGrid() {
  const { data, error } = await supabase.from("parking_availability").select("spot_id, date, name");

  if (error) {
    console.error(error);
  }

  const allSpots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-start p-10">
      <h1 className="font-bold text-3xl text-black dark:text-white mb-12">Reserve Your Parking Spot Now</h1>
      <h3 className="text-[#323232] dark:text-darkmode-primary">1st floor</h3>
      <div className="h-[1px] w-full bg-border dark:bg-darkmode-border mt-1 mb-4"></div>
      <div className="w-fit grid grid-cols-4 gap-x-2 gap-y-6">
        {allSpots.slice(0, 7).map(spot => {
          const availableToday = data?.find(el => el.spot_id == spot && el.date == formattedToday);
          const availableTommorow = data?.find(el => el.spot_id == spot && el.date == formattedTomorrow);
          const name = availableToday ? data?.find(el => el.spot_id === spot)?.name: null;

          return (
            <div key={spot} className={`${availableToday ? "bg-green-300" : "bg-red-300"} h-28 w-20 relative flex justify-center items-center`}>
              <h1 className="text-2xl font-bold text-gray-100">{spot}</h1>
              <p className="text-primary text-sm font-semibold absolute bottom-0">{name}</p>
              <div className={`absolute right-0 top-0 w-0 h-0 border-r-24 border-b-24 ${availableTommorow ? "border-green-500" : "border-red-500"} border-b-transparent`}></div>
            </div>
          )
        })}
      </div>
      <h3 className="text-[#323232] dark:text-darkmode-primary mt-16">2nd floor</h3>
      <div className="h-[1px] w-full bg-border dark:bg-darkmode-border mt-1 mb-4"></div>
      <div className="w-fit grid grid-cols-7 gap-x-2 gap-y-6">
        {allSpots.slice(7, 20).map(spot => {
          const availableToday = data?.find(el => el.spot_id == spot && el.date == formattedToday);
          const availableTommorow = data?.find(el => el.spot_id == spot && el.date == formattedTomorrow);
          const name = availableToday ? data?.find(el => el.spot_id === spot)?.name: null;

          return (
            <div key={spot} className={`${availableToday ? "bg-green-300" : "bg-red-300"} h-28 w-20 relative flex justify-center items-center ${spot == 8 ? "col-start-2" : ""}`}>
              <h1 className="text-2xl font-bold text-gray-100">{spot}</h1>
              <p className="text-primary text-sm font-semibold absolute bottom-0">{name}</p>
              <div className={`absolute right-0 top-0 w-0 h-0 border-r-24 border-b-24 ${availableTommorow ? "border-green-500" : "border-red-500"} border-b-transparent`}></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}