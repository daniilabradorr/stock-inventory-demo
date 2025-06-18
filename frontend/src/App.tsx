import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import InventoryPage from "./pages/InventoryPage";
import MovementsPage from "./pages/MovementsPage";    // ⬅️ nuevo
import RequireAuth from "./auth/RequireAuth";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/inventory"
          element={
            <RequireAuth>
              <InventoryPage />
            </RequireAuth>
          }
        />

        {/* nueva ruta protegida */}
        <Route
          path="/movements"
          element={
            <RequireAuth>
              <MovementsPage />
            </RequireAuth>
          }
        />

        {/* raíz y comodín */}
        <Route path="/" element={<Navigate to="/inventory" />} />
        <Route path="*" element={<Navigate to="/inventory" />} />
      </Routes>
    </BrowserRouter>
  );
}
