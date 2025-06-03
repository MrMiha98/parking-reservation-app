export default function ParkingGrid() {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col">
      <div className="w-full flex flex-col p-10">
        <h1 className="font-semibold text-black text-3xl dark:text-white">Reserve Your Parking Spot Now</h1>
        <h3 className="mt-6 dark:text-darkmode-primary">1st Floor</h3>
        <div className="w-fit grid grid-rows-2 grid-cols-4 justify-items-end gap-y-8 border border-border mt-2">
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden ">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden col-start-2">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col px-10 pb-10 mt-4">
        <h3 className="dark:text-darkmode-primary">2nd Floor</h3>
        <div className="w-fit grid grid-rows-2 grid-cols-8 justify-items-start gap-y-8 border border-border mt-2">
          <div className="h-24 w-20 relative border-r-2 border-l-2 border-border overflow-hidden col-start-2">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}} ></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-r-2 border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
          <div className="h-24 w-20 relative border-border overflow-hidden">
            <p className="absolute inset-0 flex justify-center items-center font-bold text-yellow-500">10</p>
            <p className="w-full absolute bottom-1 flex justify-center items-center font-semibold text-primary text-sm">john doe</p>
            <span className="absolute top-0 right-0" style={{ width: 0, height: 0, borderBottom: "20px solid transparent", borderRight: "20px solid red"}}></span>
          </div>
        </div>
      </div>
    </div>
  )
}