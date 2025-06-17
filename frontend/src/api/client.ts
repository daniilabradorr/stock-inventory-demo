// Creo una instancia de Axios que usaré en toda la app
import axios from "axios";

export const client = axios.create({
  // Si en producción paso VITE_API_URL la uso; si no, asumo localhost
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

// Antes de cada petición añado el JWT si está guardado
client.interceptors.request.use((cfg) => {
  const t = localStorage.getItem("token");   // busco token en localStorage
  if (t) cfg.headers.Authorization = `Bearer ${t}`;   // lo inyecto en headers
  return cfg;
});
