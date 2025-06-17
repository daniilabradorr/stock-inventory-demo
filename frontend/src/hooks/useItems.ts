// Traigo la lista de ítems con TanStack Query
import { useQuery } from "@tanstack/react-query";
import { client } from "../api/client";

export interface Item {
  id: number;
  sku: string;
  ean13: string;
  quantity: number;
}

export const useItems = () =>
  useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: () => client.get("/items/").then((r) => r.data),
  });
