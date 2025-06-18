// Página de inventario: tabla + modal editar + barra de navegación.
import { useItems } from "../hooks/useItems";
import type { Item } from "../hooks/useItems";           // ← import type 👍
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import {
  CircularProgress,
  Box,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import UpdateStockModal from "../components/UpdateStockModal";

export default function InventoryPage() {
  // 0) Hook de navegación → lo declaro ANTES del if early-return.
  const nav = useNavigate();

  // 1) Traigo los ítems vía TanStack Query
  const { data = [], isLoading } = useItems();

  // 2) Guardo el item seleccionado para mostrar el modal
  const [sel, setSel] = useState<Item | null>(null);

  // 3) Defino columnas, añadiendo la de "Editar"
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

  // 4) Spinner si aún carga
  if (isLoading)
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  // 5) Barra de navegación + tabla + modal
  return (
    <>
      {/* Barra superior con navegación y logout */}
      <AppBar position="static">
        <Toolbar>
          <Button component={RouterLink} to="/inventory" color="inherit">
            Stock
          </Button>
          <Button component={RouterLink} to="/movements" color="inherit">
            Movimientos
          </Button>
          <Button
            sx={{ ml: "auto" }}
            color="inherit"
            onClick={() => {
              localStorage.removeItem("token");
              nav("/login");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Tabla de inventario */}
      <Box sx={{ height: 500, width: "90%", mx: "auto", mt: 4 }}>
        <DataGrid rows={data} columns={cols} getRowId={(r) => r.id} />
      </Box>

      {/* Modal editar cantidad */}
      {sel && (
        <UpdateStockModal
          open
          onClose={() => setSel(null)}
          item={sel}
        />
      )}
    </>
  );
}
