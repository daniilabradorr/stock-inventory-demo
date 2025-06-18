import { useItems } from "../hooks/useItems";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Box, Button } from "@mui/material";
import { useState } from "react";
import UpdateStockModal from "../components/UpdateStockModal";
import type { Item } from "../hooks/useItems";

export default function InventoryPage() {
  const { data = [], isLoading } = useItems();

  // item seleccionado para el modal (null = cerrado)
  const [sel, setSel] = useState<Item | null>(null);

  // columnas: añado la de acciones al final
  const cols: GridColDef[] = [
    { field: "sku", headerName: "SKU", flex: 1 },
    { field: "ean13", headerName: "EAN-13", flex: 1 },
    { field: "quantity", headerName: "Qty", flex: 0.5 },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button size="small" onClick={() => setSel(params.row as Item)}>
          Editar
        </Button>
      ),
    },
  ];

  if (isLoading)
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Box sx={{ height: 500, width: "90%", mx: "auto", mt: 4 }}>
        <DataGrid rows={data} columns={cols} getRowId={(r) => r.id} />
      </Box>

      {/* Modal abierto solo si hay item seleccionado */}
      {sel && (
        <UpdateStockModal
          open={!!sel}
          onClose={() => setSel(null)}
          item={sel}
        />
      )}
    </>
  );
}
