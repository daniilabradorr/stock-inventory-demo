import { useItems } from "../hooks/useItems";
import { DataGrid } from "@mui/x-data-grid";  
import type { GridColDef } from "@mui/x-data-grid";    
import { CircularProgress, Box } from "@mui/material";

export default function InventoryPage() {
  const { data = [], isLoading } = useItems();

  // columnas que quiero mostrar
  const cols: GridColDef[] = [
    { field: "sku", headerName: "SKU", flex: 1 },
    { field: "ean13", headerName: "EAN-13", flex: 1 },
    { field: "quantity", headerName: "Qty", flex: 0.5 },
  ];

  if (isLoading)
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ height: 500, width: "90%", mx: "auto", mt: 4 }}>
      <DataGrid rows={data} columns={cols} getRowId={(row) => row.id} />
    </Box>
  );
}
