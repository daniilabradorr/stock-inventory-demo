// Creo una instancia de Axios que usaré en toda la app
import axios from "axios";

export const client = axios.create({
  // Si en producción paso VITE_API_URL la uso; si no, asumo localhost
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

// ────────────────────────────────────────────────────────────────
// Interceptor de *petición* → añade el JWT a cada request
// ────────────────────────────────────────────────────────────────
client.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("token");   // busco token en localStorage
  if (t) {
    cfg.headers = cfg.headers ?? {};
    cfg.headers.Authorization = `Bearer ${t}`;   // lo inyecto en headers
  }
  return cfg;
});

// ────────────────────────────────────────────────────────────────
// Interceptor de *respuesta* → si la API devuelve 401 (token caducado
// o inválido), borro el token y redirijo al /login.
// ────────────────────────────────────────────────────────────────
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");        // limpio token
      window.location.href = "/login";         // fuerzo re-login
    }
    return Promise.reject(err);
  }
);
