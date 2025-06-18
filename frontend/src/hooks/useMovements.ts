// Traigo los movimientos con TanStack Query
import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";

export interface Movement {
  id: number;
  item: { sku: string };
  delta: number;
  created_at: string;
}

export const useMovements = () =>
  useQuery<Movement[]>({
    queryKey: ["movements"],
    queryFn: () => client.get("/movements/").then((r) => r.data),
  });
