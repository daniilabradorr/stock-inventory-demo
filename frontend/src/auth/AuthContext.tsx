// Contexto de auth: expongo login() y guardo el token.

import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { client } from "../api/client";

interface AuthCtxType {
  login: (u: string, p: string) => Promise<void>;
}
export const AuthCtx = createContext<AuthCtxType>({ login: async () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Ignoro el token inicial y solo uso el setter para forzar re-render
  // sin que TS me dé warning de variable sin usar.
  const [, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // Función de login:
  // 1) Llamo a la API y recibo data.access
  // 2) Guardo el access token en localStorage
  // 3) Llamo a setToken para forzar que React re-renderice si lo necesito
  const login = async (username: string, password: string) => {
    const { data } = await client.post("/token/", { username, password });
    localStorage.setItem("token", data.access); // persisto token
    setToken(data.access);                      // fuerzo re-render
  };

  return <AuthCtx.Provider value={{ login }}>{children}</AuthCtx.Provider>;
};
