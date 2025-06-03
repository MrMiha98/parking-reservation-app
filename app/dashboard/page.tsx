import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ParkingGrid from "../components/ParkingGrid";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main className="w-full flex-grow flex flex-col">
      <ParkingGrid/>
    </main>
  )
}