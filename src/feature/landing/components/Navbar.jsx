import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExploreIcon from "@mui/icons-material/Explore";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Destinos", href: "#destinos" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Contacto", href: "#contacto" },
];

// Navbar fija: se queda arriba mientras haces scroll.
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          {/* Logo */}
          <Box
            component="a"
            href="#inicio"
            sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none", flexGrow: { xs: 1, md: 0 }, mr: { md: 4 } }}
          >
            <ExploreIcon color="primary" fontSize="large" />
            <Typography variant="h6" fontWeight={700} color="primary">
              ViajaFácil
            </Typography>
          </Box>

          {/* Enlaces (escritorio) */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}>
            {links.map((link) => (
              <Button key={link.href} href={link.href} color="inherit">
                {link.label}
              </Button>
            ))}
          </Box>

          {/* Botones de sesión (escritorio) */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
            <Button href="/login" variant="outlined">
              Iniciar sesión
            </Button>
            <Button href="/registro" variant="contained">
              Crear cuenta
            </Button>
          </Box>

          {/* Botón hamburguesa (celular) */}
          <IconButton
            aria-label="abrir menú"
            sx={{ display: { md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Menú lateral (celular) */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260 }} role="presentation">
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton aria-label="cerrar menú" onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {links.map((link) => (
              <ListItemButton key={link.href} component="a" href={link.href} onClick={() => setOpen(false)}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            <Button href="/login" variant="outlined" fullWidth>
              Iniciar sesión
            </Button>
            <Button href="/registro" variant="contained" fullWidth>
              Crear cuenta
            </Button>
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}