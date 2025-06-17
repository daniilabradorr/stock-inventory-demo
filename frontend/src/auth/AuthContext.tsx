// Contexto de auth: expongo login() y guardo el token.

import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { client } from "../api/client";

interface AuthCtxType {
  login: (u: string, p: string) => Promise<void>;
}
export const AuthCtx = createContext<AuthCtxType>({ login: async () => {} });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  const login = async (username: string, password: string) => {
    const { data } = await client.post("/token/", { username, password });
    localStorage.setItem("token", data.access); // persisto token
    setToken(data.access);                      // actualizo estado
  };

  return <AuthCtx.Provider value={{ login }}>{children}</AuthCtx.Provider>;
};
