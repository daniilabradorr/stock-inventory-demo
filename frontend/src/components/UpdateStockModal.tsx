// Un diálogo muy simple con MUI.
// Abro con item seleccionado y cierro con onClose.
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useUpdateItem } from "../hooks/useUpdateItem";
import type { Item } from "../hooks/useItems";

interface Props {
  open: boolean;
  onClose: () => void;
  item: Item;
}

export default function UpdateStockModal({ open, onClose, item }: Props) {
  const [qty, setQty] = useState(item.quantity);
  const update = useUpdateItem();

  // Si me pasan otro item, actualizo el estado local
  useEffect(() => setQty(item.quantity), [item]);

  const handleSave = () => {
    update.mutate(
      { id: item.id, quantity: qty },
      { onSuccess: onClose } // cierro solo si fue bien
    );
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Actualizar {item.sku}</DialogTitle>

      <Stack spacing={2} sx={{ p: 3, minWidth: 250 }}>
        <TextField
          label="Cantidad"
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          fullWidth
        />

        <Button
          variant="contained"
          onClick={handleSave}
          disabled={update.isPending}
        >
          {update.isPending ? <CircularProgress size={20} /> : "Guardar"}
        </Button>
      </Stack>
    </Dialog>
  );
}
