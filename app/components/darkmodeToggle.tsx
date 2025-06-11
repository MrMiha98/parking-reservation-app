"use client"

import { Sun, Moon } from "lucide-react"
import { useState, useEffect } from "react"

export default function DarkmodeToggle () {
  const [darkmode, setDarkmode] = useState(false);

  function handleClick() {
    setDarkmode((prevDarkmode) => !prevDarkmode);
  }

  useEffect(() => {
    const html = document.documentElement;
    
    if (darkmode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkmode]);

  return (
    <button className="cursor-pointer transition-all ease-in duration-150 hover:scale-105"
      onClick={handleClick}>
      {darkmode ? <Sun className="text-yellow-500" /> : <Moon className="text-[#424c55]" />}
    </button>
  )
}