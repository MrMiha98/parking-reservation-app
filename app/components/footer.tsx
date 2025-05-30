import Link from "next/link"
import { SquareArrowOutUpRight, ScreenShare } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full py-10">
      <div className="mx-auto px-4 sm:px-6 max-w-3xl flex justify-between">
        <Link href="https://github.com/MrMiha98/parking-reservation-app" className="flex flex-row items-center gap-x-2 cursor-pointer">
          <p className="font-normal text-sm text-primary underline underline-offset-4 dark:text-darkmode-primary">Source on GitHub</p>
          <SquareArrowOutUpRight size="16" className="text-primary dark:text-darkmode-primary"/>
        </Link>
        <div className="flex flex-row items-center gap-x-2 cursor-pointer">
          <p className="font-normal text-sm text-primary dark:text-darkmode-primary">Website hosted by:</p>
          <Link href="https://vercel.com" className="flex flex-row items-center gap-x-2">
            <p className="font-normal text-sm text-primary dark:text-darkmode-primary flex flex-row items-center gap-x-2 hover:underline underline-offset-4">Vercel™</p>
            <ScreenShare size="16" className="text-primary dark:text-darkmode-primary"/>
          </Link>
        </div>
      </div>
    </footer>
  )
}