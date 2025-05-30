import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

export default function Hero() {
  return (
    <main className="w-full max-w-3xl mx-auto flex-grow p-4 sm:p-6">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="font-bold text-black dark:text-white text-[42px] leading-12">Reserve Your Car Parking Spot</h1>
          <p className="mt-3 text-[#323232] dark:text-[#d2d2d2]">Reserve your spot ahead of time and know exactly where to park before you leave home.</p>
          <div className="mt-6 text-primary dark:text-darkmode-primary">"Fast booking, super easy! Parked stress-free, Will use again!" - Melinda Smith <BadgeCheck strokeWidth="3px" size="16" color="#1da1f2" className="inline align-middle mb-1"/></div>
          <Button className="mt-4 h-12 cursor-pointer dark:bg-white dark:hover:bg-[#c8c8c8]">Reserve Now</Button>
        </div>
        <Image src="/media/phone-click.png" alt="Parking Spot Grid Layout"  width={1000} height={1000} className="aspect-square object-fill rounded-2xl w-72 mt-8 mx-auto md:w-[45%] md:mt-0"/>
      </div>
    </main>
  );
}