// Página de movimientos: lista los ajustes de stock.
// Incluye la misma barra de navegación para coherencia.
import { useMovements } from "../hooks/useMovements";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import {
  CircularProgress,
  Box,
  Chip,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function MovementsPage() {
  // 0) Primero coloco el hook de navegación, siempre antes de cualquier return
  const nav = useNavigate();

  // 1) Traigo los movimientos de la API con TanStack Query
  const { data = [], isLoading } = useMovements();

  // 2) Defino columnas del DataGrid.
  // Como he cambiado el serializer, ahora recibo directamente `sku` y `created_at`,
  // así que ya no necesito acceder a objetos anidados ni usar valueGetter.
  const cols: GridColDef[] = [
    {
      field: "sku", // ← antes necesitaba ir a item.sku, pero ahora lo tengo directo
      headerName: "SKU",
      flex: 1,
    },
    {
      field: "delta",
      headerName: "Δ Qty",
      flex: 0.4,
      renderCell: (p: any) => (
        <Chip
          label={p.value}
          color={(p.value ?? 0) > 0 ? "success" : "error"}
          size="small"
        />
      ),
    },
    {
      field: "created_at", // ← cambiado para usar el nombre del nuevo campo del serializer
      headerName: "Fecha",
      flex: 1,
      renderCell: (p: any) => (
        <span>
        {p?.value ? dayjs(p.value).format("DD/MM/YYYY HH:mm") : "—"}
        </span>
    ),
    },
  ];

  // 3) Mientras se carga muestro el spinner centrado
  if (isLoading)
    return (
      <Box sx={{ mt: 10, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );

  // 4) Cuando ya tengo los datos, muestro la barra de navegación y la tabla
  return (
    <>
      {/* Barra superior de navegación con botones para cambiar de página y cerrar sesión */}
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
              // Al hacer logout borro el token y redirijo al login
              localStorage.removeItem("token");
              nav("/login");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Tabla con los movimientos de stock */}
      <Box sx={{ height: 500, width: "90%", mx: "auto", mt: 4 }}>
        <DataGrid rows={data} columns={cols} getRowId={(r) => r.id} />
      </Box>
    </>
  );
}
