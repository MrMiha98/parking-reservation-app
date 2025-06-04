const parkingStructure = {
  floor1: {
    columns: 4,
    rows: [
      {
        rowId: 1,
        startCol: 1,
        spots: [
          { id: 1, owner: "Alice M." },
          { id: 2, owner: "Bob D." },
          { id: 3, owner: "Charlie D." },
          { id: 4, owner: "Dana G." },
        ],
      },
      {
        rowId: 2,
        startCol: 2,
        spots: [
          { id: 5, owner: "Eve Q." },
          { id: 6, owner: "Frank G." },
          { id: 7, owner: "Grace J." },
        ],
      },
    ],
  },
  floor2: {
    columns: 7,
    rows: [
      {
        rowId: 3,
        startCol: 1,
        spots: [
          { id: 8, owner: "Hank O." },
          { id: 9, owner: "Ivy R." },
          { id: 10, owner: "Daisy L." },
          { id: 11, owner: "Patrick V." },
          { id: 12, owner: "Steve X." },
          { id: 13, owner: "John Y." },
          { id: 14, owner: "Johnny U." },
        ],
      },
      {
        rowId: 4,
        startCol: 2,
        spots: [
          { id: 15, owner: "Marc R." },
          { id: 16, owner: "Bella W." },
          { id: 17, owner: "Nikky F." },
          { id: 18, owner: "Nicola C." },
          { id: 19, owner: "Steven B." },
          { id: 20, owner: "Luke S." },
        ],
      },
    ],
  },
};


export default function ParkingGrid() {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col">
      <div className="w-full flex flex-col p-10">
        <h1 className="font-semibold text-black text-3xl dark:text-white">Reserve Your Parking Spot Now</h1>
        {Object.entries(parkingStructure).map(([floorKey, floorData]) => (
          <div key={floorKey} className="mt-10">
            <h3 className="text-[#323232] dark:text-[#d2d2d2]">{floorKey.replace("floor", "")} Floor</h3>
            <div className="flex flex-col gap-y-6 mt-4">
              {floorData.rows.map((row) => (
                <div key={row.rowId} className="w-fit grid gap-2" style={{ gridTemplateColumns: `repeat(${floorData.columns}, minmax(0, 1fr))`, gridColumnStart: row.startCol }}>
                  {/* Render empty cells for offset */}
                  {Array.from({ length: row.startCol - 1 }).map((_, i) => (
                    <div key={`empty-${row.rowId}-${i}`} />
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
        ))}
      </div>
    </div>
  )
}