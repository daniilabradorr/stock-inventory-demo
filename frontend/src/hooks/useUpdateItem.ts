// Este hook envía el PATCH
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "../api/client";

// invalido la Query "items" para que TanStack vuelva a pedir la lista.
export const useUpdateItem = () => {
  const qc = useQueryClient();

  // p = { id, quantity }
  return useMutation({
    mutationFn: (p: { id: number; quantity: number }) =>
      client.patch(`/items/${p.id}/`, { quantity: p.quantity }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["items"] }),
  });
};
