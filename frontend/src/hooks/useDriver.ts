import { useQuery } from "@tanstack/react-query";

import { getDriver } from "../lib/api";

export function useDriver(driverId: string) {
  return useQuery({
    queryKey: ["driver", driverId],

    queryFn: () => getDriver(driverId),

    enabled: !!driverId,
  });
}