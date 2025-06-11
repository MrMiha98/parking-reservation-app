import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="w-full max-w-3xl mx-auto flex flex-col flex-grow p-4 sm:p-6">
      <div className="w-full flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="font-bold text-black dark:text-white text-[42px] leading-12">Reserve Your Car Parking Spot</h1>
          <p className="mt-3 text-primary dark:text-[#d2d2d2]">Reserve your spot ahead of time and know exactly where to park before you leave home.</p>
          <div className="mt-6 text-[#323232] dark:text-darkmode-primary">✨"Fast booking, super easy! Parked stress-free, Will use again!"🤩 - Melinda Smith <BadgeCheck strokeWidth="3px" size="16" color="#1da1f2" className="inline align-middle mb-1"/></div>
          <Button className="mt-4 h-12 cursor-pointer dark:bg-white dark:hover:bg-[#c8c8c8] dark:font-semibold">Reserve Now</Button>
        </div>
        <Image className="aspect-square object-fill rounded-2xl w-72 mt-8 mx-auto md:w-[45%] md:mt-0"
          src="/media/phone-click.png"
          alt="Parking Spot Grid Layout"
          width={1000}
          height={1000}/>
      </div>
      <div className="w-full flex flex-row items-center justify-between mt-6 gap-x-6">
        <p className="flex-shrink-0 text-[#323232] dark:text-[#d2d2d2]">Trusted by the fast-growing <br /> companies around the world</p>
        <div className="relative h-16 flex-grow flex flex-row space-x-16 overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-16 z-99 bg-gradient-to-r from-white to-transparent dark:from-[#171717] dark:to-transparent"/>
          <div className="pointer-events-none absolute right-[-64px] top-0 h-full w-16 z-100 bg-gradient-to-l from-white to-transparent dark:from-[#171717] dark:to-transparent"/>
          <div className="flex flex-row space-x-16 animate-loop-scroll">
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce7fbdd5256b65794cec460d86f57f941b33faed?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 1"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2808119bf41dd8762cb7f1ce5697c5b65822cce1?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 2"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/06f31dae9e8e0dac3bd93df36de710dccb399fc5?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 3"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a6c804460c29e524646c39716489f06a3caa802?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 4"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab26b709dce652678631f4e31b487d8a1ffdd6a6?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 5"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/359232950a6a310efea7d28365f094b9b162c31e?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 6"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecce075cecd981060285aa9d2cfcc5ffd8efd624?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 7"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a452c8ae246b0e110f031f1e2d1d51da498b4fd?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 8"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/da71c75982d01469797b4c65d0c214a90bae79e9?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 9"/>
          </div>
          <div className="flex flex-row space-x-16 animate-loop-scroll" aria-hidden="true">
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce7fbdd5256b65794cec460d86f57f941b33faed?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 1"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2808119bf41dd8762cb7f1ce5697c5b65822cce1?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 2"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/06f31dae9e8e0dac3bd93df36de710dccb399fc5?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 3"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a6c804460c29e524646c39716489f06a3caa802?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 4"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab26b709dce652678631f4e31b487d8a1ffdd6a6?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 5"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/359232950a6a310efea7d28365f094b9b162c31e?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 6"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecce075cecd981060285aa9d2cfcc5ffd8efd624?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 7"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a452c8ae246b0e110f031f1e2d1d51da498b4fd?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 8"/>
            <img className="max-w-none"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/da71c75982d01469797b4c65d0c214a90bae79e9?placeholderIfAbsent=true&apiKey=38e1873ef02c4c548522ff537578e769"
              alt="Design element 9"/>
          </div>
        </div>
      </div>
    </main>
  );
}