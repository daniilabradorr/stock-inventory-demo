import { useContext, useState } from "react";
import { AuthCtx } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Link,
} from "@mui/material";

// SVGs inline para facilidad, puedes sustituir por import de archivos si prefieres
const LinkedInIcon = () => (
  <svg width="24" height="24" fill="#0A66C2" viewBox="0 0 24 24">
    <path d="M4.98 3.5C4.98 4.88 3.9 6 2.49 6S0 4.88 0 3.5 1.08 1 2.49 1s2.49 1.12 2.49 2.5zM.1 8.5h4.78V24H.1V8.5zM8.7 8.5h4.6v2.1h.1c.6-1.1 2.1-2.3 4.4-2.3 4.7 0 5.6 3.1 5.6 7.1V24h-4.8v-7.8c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.1V24H8.7V8.5z" />
  </svg>
);
const GitHubIcon = () => (
  <svg width="24" height="24" fill="#000" viewBox="0 0 24 24">
    <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.8 10.9.6.2.8-.3.8-.6v-2.2c-3.2.7-3.9-1.5-3.9-1.5-.6-1.6-1.5-2-1.5-2-1.2-.8.1-.8.1-.8 1.3.1 2 .1 2 .1 1.2 2 3.1 1.4 3.8 1.1.1-.8.5-1.4.9-1.7-2.5-.3-5.2-1.2-5.2-5.3 0-1.2.4-2.1 1-2.9-.1-.3-.4-1.5.1-3.1 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.6-.3s1.8.1 2.6.3c2-.1 2.8-1 2.8-1 .6 1.6.3 2.8.1 3.1.7.8 1 1.7 1 2.9 0 4-2.7 5-5.3 5.3.5.4.9 1.1.9 2.3v3.4c0 .3.2.8.8.6C20.7 21.4 24 17.1 24 12 24 5.7 18.3.5 12 .5z" />
  </svg>
);

export default function LoginPage() {
  const { login } = useContext(AuthCtx);
  const navigate = useNavigate();

  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(u, p);
      navigate("/inventory");
    } catch (e) {
      setErr("Credenciales incorrectas o API caída");
      console.error(e);
    }
  };

  return (
    <>
      {/* App bar con título */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Inventario App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Contenedor principal */}
      <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <Paper elevation={3} sx={{ p: 4, width: 300 }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Iniciar sesión
            </Typography>
            {err && (
              <Typography color="error" sx={{ mb: 2 }}>
                {err}
              </Typography>
            )}
            <TextField
              label="Usuario"
              fullWidth
              value={u}
              onChange={(e) => setU(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              value={p}
              onChange={(e) => setP(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button type="submit" variant="contained" fullWidth>
              Entrar
            </Button>
          </form>
        </Paper>
      </Box>

      {/* Footer con logo y enlaces */}
      <Box
        component="footer"
        sx={{
          mt: 6,
          py: 2,
          textAlign: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Logo centrado */}
        <Box sx={{ mb: 1 }}>
          <img
            src="/logo.png"
            alt="Logo del proyecto"
            style={{ height: 200 }}
          />
        </Box>

        {/* Enlaces sociales */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Link
            href="https://www.linkedin.com/in/daniel-labrador-benito-6b794727b/"
            target="_blank"
            rel="noopener"
          >
            <LinkedInIcon />
          </Link>
          <Link
            href="https://github.com/daniilabradorr/stock-inventory-demo"
            target="_blank"
            rel="noopener"
          >
            <GitHubIcon />
          </Link>
        </Box>

        {/* Créditos/sobre */}
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          &copy; 2025 Daniel Labrador Benito – Proyecto de Entrevista
        </Typography>
      </Box>
    </>
  );
}