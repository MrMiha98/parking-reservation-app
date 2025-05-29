import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <div className="h-16 w-full border-b border-border">
      <div className="h-16 max-w-3xl mx-auto flex items-center justify-between">
        <div className="h-full flex items-center gap-4">
          <Image src="/media/parking-area.png" alt="App Logo" width={32} height={32} />
          <Link href="/" className="font-medium text-sm text-primary flex justify-center items-center h-10 p-2 rounded-md transition-all ease-in duration-150 hover:bg-hovercolor">How To Use</Link>
          <Link href="/" className="font-medium text-sm text-primary flex justify-center items-center h-10 p-2 rounded-md transition-all ease-in duration-150 hover:bg-hovercolor">About Us</Link>
        </div>
      </div>
    </div>
  )
}