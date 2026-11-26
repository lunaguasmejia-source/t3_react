import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import Brand from "./brand";

function validateEmail(email) {
  if (!email.trim()) return "El correo es obligatorio";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Ingresa un correo válido";
  return "";
}

export default function RecoverAccount() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    setError(validationError);

    if (!validationError) {
      console.log("Recuperar cuenta para:", email);
      // Aquí llamas a tu API, por ejemplo:
      // await fetch("/api/recover", { method: "POST", body: JSON.stringify({ email }) });
      setSent(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Brand />
      <Paper
        elevation={3}
        sx={{ mt: 2, p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockResetIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperar cuenta
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Ingresa el correo con el que te registraste y te enviaremos un enlace para
          restablecer tu contraseña.
        </Typography>

        {sent ? (
          <Alert severity="success" sx={{ mt: 3, width: "100%" }}>
            Si el correo está registrado, recibirás un enlace para restablecer tu
            contraseña en unos minutos.
          </Alert>
        ) : (
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
            <TextField
              name="email"
              label="Correo electrónico"
              type="email"
              autoComplete="email"
              required
              fullWidth
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(error)}
              helperText={error}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Enviar enlace
            </Button>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <Link href="/login" variant="body2">
            Volver a iniciar sesión
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}