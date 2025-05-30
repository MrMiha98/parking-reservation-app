import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <main className="w-full max-w-3xl mx-auto flex-grow p-4 sm:p-6">
      <div className="show w-full flex flex-row justify-between self-start">
        <div className="w-[55%] flex flex-col gap-y-6">
          <h1 className="font-bold text-primary text-5xl leading-16">Reserve Your Car Parking Spot</h1>
          <p className="text-[#323232]">Reserve your spot ahead of time and know exactly where to park before you leave home.</p>
          <div>Melinda Smith: "nsdj sjdb jasndk askd nask nda"</div>
          <Button className="w-full h-14 cursor-pointer font-bold text-lg rounded-lg">Reserve Now</Button>
        </div>
        <Image src="/media/parking-grid.png" width={256} height={256} alt="Car Parking Grid Layout" className="object-fit"/>
      </div>
    </main>
  );
}