import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Brand from "./brand";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const initialValues = {
  role: "cliente", // "cliente" | "administrador"
  email: "",
  password: "",
  remember: false,
};

function validate(values) {
  const errors = {};
  if (!values.email.trim()) {
    errors.email = "El correo es obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Ingresa un correo válido";
  }
  if (!values.password) errors.password = "La contraseña es obligatoria";
  return errors;
}

export default function Login({ onLogin }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  // ToggleButtonGroup devuelve null si se vuelve a pulsar el botón activo
  const handleRoleChange = (_, newRole) => {
    if (newRole !== null) setValues((prev) => ({ ...prev, role: newRole }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { email, password, role } = values;
      console.log("Login:", { email, password, role });
      // Login de prueba: acepta cualquier dato válido. Cuando tengas el backend,
      // llama onLogin solo si la API confirma las credenciales y el rol.
      onLogin?.({ email, role });
      // Aquí llamas a tu API, por ejemplo:
      // const res = await fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password, role }) });
      // Luego rediriges según el rol:
      // navigate(role === "administrador" ? "/admin" : "/inicio");
    }
  };

  const isAdmin = values.role === "administrador";

  return (
    <Container component="main" maxWidth="xs">
      <Brand />
      <Paper
        elevation={3}
        sx={{ mt: 2, p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Avatar sx={{ m: 1, bgcolor: isAdmin ? "secondary.main" : "primary.main" }}>
          <FlightTakeoffIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: "100%" }}>
          <ToggleButtonGroup
            value={values.role}
            exclusive
            fullWidth
            color={isAdmin ? "secondary" : "primary"}
            onChange={handleRoleChange}
            aria-label="Tipo de usuario"
            sx={{ mb: 3 }}
          >
            <ToggleButton value="cliente">
              <PersonIcon sx={{ mr: 1 }} />
              Viajero
            </ToggleButton>
            <ToggleButton value="administrador">
              <AdminPanelSettingsIcon sx={{ mr: 1 }} />
              Administrador
            </ToggleButton>
          </ToggleButtonGroup>

          <TextField
            name="email"
            label="Correo electrónico"
            type="email"
            autoComplete="email"
            margin="normal"
            required
            fullWidth
            autoFocus
            value={values.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
          />
          <TextField
            name="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            margin="normal"
            required
            fullWidth
            value={values.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="mostrar u ocultar contraseña"
                      onClick={() => setShowPassword((s) => !s)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                color={isAdmin ? "secondary" : "primary"}
                checked={values.remember}
                onChange={handleChange}
              />
            }
            label="Recordarme"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={isAdmin ? "secondary" : "primary"}
            sx={{ mt: 2, mb: 2 }}
          >
            Entrar como {isAdmin ? "administrador" : "viajero"}
          </Button>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link href="/recuperar" variant="body2">
              ¿Olvidaste tu contraseña?
            </Link>
            {!isAdmin && (
              <Link href="/registro" variant="body2">
                Crear cuenta
              </Link>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}