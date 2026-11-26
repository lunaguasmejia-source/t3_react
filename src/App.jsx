import { forwardRef, useState } from "react";
import {
  BrowserRouter,
  Link as RouterLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Home from "./feature/landing/components/Home";
import Login from "./feature/auth/components/login";
import SignUp from "./feature/auth/components/SignUp";
import RecoverAccount from "./feature/auth/components/RecuperaCuenta";
import AdminDashboard from "./feature/dashboard1/admin";
import ClientDashboard from "./feature/dashboard2/client";

// Hace que los botones y enlaces de MUI con href="/ruta" naveguen con
// react-router (sin recargar la página). Los enlaces tipo "#destinos" siguen
// funcionando como anclas normales.
const LinkBehavior = forwardRef(function LinkBehavior({ href, ...other }, ref) {
  if (typeof href === "string" && href.startsWith("/")) {
    return <RouterLink ref={ref} to={href} {...other} />;
  }
  return <a ref={ref} href={href} {...other} />;
});

const theme = createTheme({
  components: {
    MuiLink: { defaultProps: { component: LinkBehavior } },
    MuiButtonBase: { defaultProps: { LinkComponent: LinkBehavior } },
  },
});

// Solo deja pasar si hay sesión y el rol coincide; si no, manda al login.
function Protected({ user, role, children }) {
  return user?.role === role ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  // Sesión de prueba (sin base de datos): se guarda en el navegador para que
  // no se pierda al recargar la página.
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("viajafacil_user"));
    } catch {
      return null;
    }
  }); // { email, role } cuando hay sesión
  const navigate = useNavigate();

  const handleLogin = (data) => {
    setUser(data);
    try {
      localStorage.setItem("viajafacil_user", JSON.stringify(data));
    } catch {
      /* si el navegador no deja guardar, la sesión dura hasta recargar */
    }
    navigate(data.role === "administrador" ? "/admin" : "/cliente");
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem("viajafacil_user");
    } catch {
      /* nada que limpiar */
    }
    navigate("/login");
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/registro" element={<SignUp onRegistered={() => navigate("/login")} />} />
      <Route path="/recuperar" element={<RecoverAccount />} />

      <Route
        path="/admin"
        element={
          <Protected user={user} role="administrador">
            <AdminDashboard onLogout={handleLogout} />
          </Protected>
        }
      />
      <Route
        path="/cliente"
        element={
          <Protected user={user} role="cliente">
            <ClientDashboard onLogout={handleLogout} />
          </Protected>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}