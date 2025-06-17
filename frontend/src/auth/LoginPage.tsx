// Formulario muy simple: user + password → llama a login().

import { useContext, useState } from "react";
import { AuthCtx } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useContext(AuthCtx);
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const navigate = useNavigate();            // ← hook de navegación

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(u, p);     // intento loguear
      navigate("/inventory"); // si va bien → tabla
    } catch (e) {
      setErr("Credenciales incorrectas o API caída");
      console.error(e);
    }
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column", gap: 8, width: 260, margin: "120px auto" }}
      onSubmit={handleSubmit}
    >
      {err && <span style={{ color: "red" }}>{err}</span>}
      <input placeholder="User" value={u} onChange={(e) => setU(e.target.value)} />
      <input type="password" placeholder="Password" value={p} onChange={(e) => setP(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

