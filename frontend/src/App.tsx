import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./auth/LoginPage";
import InventoryPage from "./pages/InventoryPage";
import RequireAuth from "./auth/RequireAuth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Ruta protegida */}
        <Route
          path="/inventory"
          element={
            <RequireAuth>
              <InventoryPage />
            </RequireAuth>
          }
        />

        {/* Raíz → inventario */}
        <Route path="/" element={<Navigate to="/inventory" />} />
        <Route path="*" element={<Navigate to="/inventory" />} />
      </Routes>
    </BrowserRouter>
  );
}
