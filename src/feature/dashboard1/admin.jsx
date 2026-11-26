import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import MenuIcon from "@mui/icons-material/Menu";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";

/* ------------------------------------------------------------------ */
/* Datos de ejemplo (reemplázalos por llamadas a tu API más adelante)  */
/* ------------------------------------------------------------------ */
const categories = ["Playa", "Montaña", "Ciudad", "Naturaleza", "Cultura"];

const initialDestinations = [
  {
    id: 1,
    name: "Cartagena",
    country: "Colombia",
    category: "Playa",
    dailyCost: 350000,
    recommendation: "Visita la ciudad amurallada al atardecer y toma un tour a las Islas del Rosario.",
  },
  {
    id: 2,
    name: "Cusco",
    country: "Perú",
    category: "Cultura",
    dailyCost: 280000,
    recommendation: "Llega con unos días de anticipación para aclimatarte a la altura antes de ir a Machu Picchu.",
  },
  {
    id: 3,
    name: "San Andrés",
    country: "Colombia",
    category: "Playa",
    dailyCost: 400000,
    recommendation: "Alquila un carrito de golf para recorrer la isla y no te pierdas el mar de siete colores.",
  },
  {
    id: 4,
    name: "Buenos Aires",
    country: "Argentina",
    category: "Ciudad",
    dailyCost: 420000,
    recommendation: "Reserva con tiempo una cena con show de tango y recorre San Telmo el domingo.",
  },
  {
    id: 5,
    name: "Salento",
    country: "Colombia",
    category: "Naturaleza",
    dailyCost: 220000,
    recommendation: "Haz la caminata por el Valle de Cocora temprano en la mañana para evitar la lluvia.",
  },
];

const initialUsers = [
  { id: 1, name: "Laura Gómez", email: "laura@correo.com", role: "cliente", trips: 3 },
  { id: 2, name: "Andrés Ríos", email: "andres@correo.com", role: "cliente", trips: 1 },
  { id: 3, name: "Camila Torres", email: "camila@correo.com", role: "cliente", trips: 5 },
  { id: 4, name: "Admin Principal", email: "admin@viajafacil.com", role: "administrador", trips: 0 },
];

const formatCOP = (n) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);

/* ------------------------------------------------------------------ */
/* Estructura de la página (barra superior + menú lateral)             */
/* ------------------------------------------------------------------ */
const drawerWidth = 240;

const menuItems = [
  { key: "resumen", label: "Resumen", icon: <DashboardIcon /> },
  { key: "destinos", label: "Destinos", icon: <PlaceIcon /> },
  { key: "usuarios", label: "Usuarios", icon: <PeopleIcon /> },
];

function Layout({ title, roleLabel, userName, items, current, onChange, onLogout, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawer = (
    <div>
      <Toolbar>
        <ExploreIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" color="primary" fontWeight={700}>
          ViajaFácil
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {items.map((item) => (
          <ListItemButton
            key={item.key}
            selected={current === item.key}
            onClick={() => {
              onChange(item.key);
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: { md: `calc(100% - ${drawerWidth}px)` }, ml: { md: `${drawerWidth}px` } }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            aria-label="abrir menú"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Chip label={roleLabel} color="secondary" size="small" sx={{ mr: 2 }} />
          <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: "secondary.dark" }}>{userName?.[0]}</Avatar>
          <IconButton color="inherit" aria-label="cerrar sesión" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          bgcolor: "grey.100",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

function StatCard({ label, value, icon, color = "primary.main" }) {
  return (
    <Paper sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>{icon}</Avatar>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h5" fontWeight={700}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard del administrador                                         */
/* ------------------------------------------------------------------ */
const emptyForm = { name: "", country: "", category: "Ciudad", dailyCost: "", recommendation: "" };

export default function AdminDashboard({ onLogout }) {
  const [section, setSection] = useState("resumen");
  const [destinations, setDestinations] = useState(initialDestinations);
  const [users] = useState(initialUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const handleLogout = () => onLogout?.();

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (destination) => {
    setEditingId(destination.id);
    setForm({ ...destination, dailyCost: String(destination.dailyCost) });
    setDialogOpen(true);
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const formValid = form.name.trim() && form.country.trim() && Number(form.dailyCost) > 0;

  const handleSave = () => {
    const data = { ...form, dailyCost: Number(form.dailyCost) };
    if (editingId) {
      setDestinations((prev) => prev.map((d) => (d.id === editingId ? { ...d, ...data } : d)));
    } else {
      setDestinations((prev) => [...prev, { ...data, id: Date.now() }]);
    }
    // Aquí llamas a tu API (POST o PUT) para guardar en el servidor
    setDialogOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar este destino?")) {
      setDestinations((prev) => prev.filter((d) => d.id !== id));
      // Aquí llamas a tu API (DELETE)
    }
  };

  return (
    <Layout
      title="Panel de administración"
      roleLabel="Administrador"
      userName="Admin"
      items={menuItems}
      current={section}
      onChange={setSection}
      onLogout={handleLogout}
    >
      {/* ---------- RESUMEN ---------- */}
      {section === "resumen" && (
        <>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Resumen general
          </Typography>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard label="Destinos" value={destinations.length} icon={<PlaceIcon />} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard label="Usuarios" value={users.length} icon={<PeopleIcon />} color="secondary.main" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard
                label="Itinerarios creados"
                value={users.reduce((sum, u) => sum + u.trips, 0)}
                icon={<FlightTakeoffIcon />}
                color="success.main"
              />
            </Grid>
          </Grid>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Últimos destinos agregados
            </Typography>
            <Stack spacing={1}>
              {destinations.slice(-3).reverse().map((d) => (
                <Box key={d.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>
                    {d.name}, {d.country}
                  </Typography>
                  <Chip label={d.category} size="small" />
                </Box>
              ))}
            </Stack>
          </Paper>
        </>
      )}

      {/* ---------- DESTINOS ---------- */}
      {section === "destinos" && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" fontWeight={700}>
              Destinos
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={openNew}>
              Nuevo destino
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Destino</TableCell>
                  <TableCell>Categoría</TableCell>
                  <TableCell>Costo diario</TableCell>
                  <TableCell>Recomendación</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {destinations.map((d) => (
                  <TableRow key={d.id} hover>
                    <TableCell>
                      <Typography fontWeight={600}>{d.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {d.country}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={d.category} size="small" />
                    </TableCell>
                    <TableCell>{formatCOP(d.dailyCost)}</TableCell>
                    <TableCell sx={{ maxWidth: 320 }}>
                      <Typography variant="body2" noWrap title={d.recommendation}>
                        {d.recommendation}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="editar" onClick={() => openEdit(d)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="eliminar" color="error" onClick={() => handleDelete(d.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {destinations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No hay destinos todavía.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* ---------- USUARIOS ---------- */}
      {section === "usuarios" && (
        <>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Usuarios
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Correo</TableCell>
                  <TableCell>Rol</TableCell>
                  <TableCell align="right">Itinerarios</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id} hover>
                    <TableCell>{u.name}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={u.role === "administrador" ? "Administrador" : "Viajero"}
                        color={u.role === "administrador" ? "secondary" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">{u.trips}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* ---------- DIÁLOGO CREAR / EDITAR DESTINO ---------- */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editingId ? "Editar destino" : "Nuevo destino"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField name="name" label="Ciudad o lugar" fullWidth required value={form.name} onChange={handleChange} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField name="country" label="País" fullWidth required value={form.country} onChange={handleChange} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField name="category" label="Categoría" select fullWidth value={form.category} onChange={handleChange}>
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="dailyCost"
                label="Costo diario aprox. (COP)"
                type="number"
                fullWidth
                required
                value={form.dailyCost}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                name="recommendation"
                label="Recomendación para el viajero"
                fullWidth
                multiline
                minRows={3}
                value={form.recommendation}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave} disabled={!formValid}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}