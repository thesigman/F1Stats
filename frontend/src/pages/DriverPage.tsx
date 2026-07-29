import { useParams } from "react-router-dom";

import { useDriver } from "../hooks/useDriver";
import DriverCareerChart from "@/components/charts/DriverCareerChart";

export default function DriverPage() {
  const { driverId } = useParams();

  const { data: driver, isLoading, isError } = useDriver(driverId ?? "");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !driver) {
    return <div>Driver not found.</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">
        {driver.first_name} {driver.last_name}
      </h1>

      <p>Entries: {driver.entries}</p>
      <p>Wins: {driver.wins}</p>
      <p>Podiums: {driver.podiums}</p>
      <p>Pole Positions: {driver.polePositions}</p>
      <p>Fastest Laps: {driver.fastestLaps}</p>

      <DriverCareerChart history={driver.championshipHistory} />
    </div>
  );
}
