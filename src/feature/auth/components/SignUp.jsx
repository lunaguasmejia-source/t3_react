import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormHelperText,
  Grid,
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Brand from "./brand";

const initialValues = {
  role: "cliente", // "cliente" | "administrador"
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

function validate(values) {
  const errors = {};
  if (!values.firstName.trim()) errors.firstName = "El nombre es obligatorio";
  if (!values.lastName.trim()) errors.lastName = "El apellido es obligatorio";

  if (!values.email.trim()) {
    errors.email = "El correo es obligatorio";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Ingresa un correo válido";
  }

  if (!values.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (values.password.length < 8) {
    errors.password = "Debe tener al menos 8 caracteres";
  }

  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  if (!values.acceptTerms) {
    errors.acceptTerms = "Debes aceptar los términos y condiciones";
  }
  return errors;
}

export default function SignUp({ onRegistered }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [createdRole, setCreatedRole] = useState(null); // null hasta que se cree la cuenta

  const isAdmin = values.role === "administrador";

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
      const { confirmPassword, acceptTerms, ...payload } = values;
      console.log("Datos a enviar:", payload);
      // Aquí llamas a tu API, por ejemplo:
      // await fetch("/api/register", { method: "POST", body: JSON.stringify(payload) });
      setCreatedRole(values.role);
    }
  };

  /* ---------- Pantalla de éxito ---------- */
  if (createdRole) {
    return (
      <Container component="main" maxWidth="xs">
        <Brand />
        <Paper
          elevation={3}
          sx={{ mt: 2, p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
            <CheckCircleIcon />
          </Avatar>
          <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
            ¡Cuenta de {createdRole === "administrador" ? "administrador" : "viajero"} creada con éxito!
          </Alert>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            Ya puedes iniciar sesión con {values.email}.
          </Typography>
          <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={() => onRegistered?.()}>
            Ir a iniciar sesión
          </Button>
        </Paper>
      </Container>
    );
  }

  /* ---------- Formulario ---------- */
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
          Crea tu cuenta
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
          Regístrate y empieza a planear tu próximo viaje.
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <ToggleButtonGroup
            value={values.role}
            exclusive
            fullWidth
            color={isAdmin ? "secondary" : "primary"}
            onChange={handleRoleChange}
            aria-label="Tipo de cuenta"
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

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="firstName"
                label="Nombre"
                autoComplete="given-name"
                required
                fullWidth
                autoFocus
                value={values.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="lastName"
                label="Apellido"
                autoComplete="family-name"
                required
                fullWidth
                value={values.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                name="email"
                label="Correo electrónico"
                type="email"
                autoComplete="email"
                required
                fullWidth
                value={values.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
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
            </Grid>
            <Grid size={12}>
              <TextField
                name="confirmPassword"
                label="Confirmar contraseña"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                fullWidth
                value={values.confirmPassword}
                onChange={handleChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
              />
            </Grid>
            <Grid size={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="acceptTerms"
                    color={isAdmin ? "secondary" : "primary"}
                    checked={values.acceptTerms}
                    onChange={handleChange}
                  />
                }
                label="Acepto los términos y condiciones"
              />
              {errors.acceptTerms && <FormHelperText error>{errors.acceptTerms}</FormHelperText>}
            </Grid>
          </Grid>

          {Object.keys(errors).length > 0 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Revisa los campos marcados en rojo.
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color={isAdmin ? "secondary" : "primary"}
            sx={{ mt: 3, mb: 2 }}
          >
            Crear cuenta de {isAdmin ? "administrador" : "viajero"}
          </Button>

          <Box sx={{ textAlign: "right" }}>
            <Link href="/login" variant="body2">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}