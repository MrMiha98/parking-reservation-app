const parkingRows = [
  {
    rowId: 1,
    startCol: 1,
    spots: [
      { id: 1, owner: "Alice" },
      { id: 2, owner: "Bob" },
      { id: 3, owner: "Charlie" },
      { id: 4, owner: "Dana" },
    ],
  },
  {
    rowId: 2,
    startCol: 2,
    spots: [
      { id: 5, owner: "Eve" },
      { id: 6, owner: "Frank" },
      { id: 7, owner: "Grace" },
    ],
  },
];

export default function ParkingGrid() {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col">

      {/* Top Parking Spot Layout */}
      <div className="w-full flex flex-col p-10">
        <h1 className="font-semibold text-black text-3xl dark:text-white">Reserve Your Parking Spot Now</h1>
        <h3 className="mt-6 text-[#323232] dark:text-[#d2d2d2]">1st Floor</h3>
        <div className="flex flex-col gap-y-6">
          {parkingRows.map((row) => (
            <div key={row.rowId} className="w-fit grid grid-cols-4 gap-2" style={{gridColumnStart: row.startCol}}>
              {/* Render empty cells for offset */}
              {Array.from({ length: row.startCol - 1 }).map((_, i) => (
                <div key={`empty-${i}`}/>
              ))}

              {/* Render parking spots */}
              {row.spots.map((spot) => (
                <div key={spot.id} className="relative h-28 w-20 bg-green-300 border border-gray-700 flex items-center justify-center">
                  <p className="absolute text-yellow-500 font-bold">{spot.id}</p>
                  <p className="absolute bottom-0 text-sm">{spot.owner}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Parking Spot layout */}

    </div>
  )
}