// Wrapper que protege rutas; si no hay token → /login.
import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";   // ← importo el tipo

export default function RequireAuth({ children }: { children: ReactElement }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" replace />;
}
