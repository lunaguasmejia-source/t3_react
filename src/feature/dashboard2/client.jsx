import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CardTravelIcon from "@mui/icons-material/CardTravel";
import PublicIcon from "@mui/icons-material/Public";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EventIcon from "@mui/icons-material/Event";
import SavingsIcon from "@mui/icons-material/Savings";
import MenuIcon from "@mui/icons-material/Menu";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";

/* ------------------------------------------------------------------ */
/* Datos de ejemplo (reemplázalos por llamadas a tu API más adelante)  */
/* ------------------------------------------------------------------ */
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

const initialTrips = [
  { id: 1, destinationId: 1, start: "2026-12-20", end: "2026-12-27", budget: 3000000, saved: 1800000 },
  { id: 2, destinationId: 5, start: "2027-02-10", end: "2027-02-13", budget: 1000000, saved: 250000 },
];

const formatCOP = (n) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);

const daysBetween = (start, end) => {
  if (!start || !end) return 0;
  const diff = Math.round((new Date(end) - new Date(start)) / 86400000);
  return Math.max(0, diff);
};

const formatDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/* ------------------------------------------------------------------ */
/* Estructura de la página (barra superior + menú lateral)             */
/* ------------------------------------------------------------------ */
const drawerWidth = 240;

const menuItems = [
  { key: "resumen", label: "Resumen", icon: <DashboardIcon /> },
  { key: "viajes", label: "Mis viajes", icon: <CardTravelIcon /> },
  { key: "explorar", label: "Explorar destinos", icon: <PublicIcon /> },
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
          <Chip label={roleLabel} size="small" sx={{ mr: 2 }} />
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
/* Dashboard del cliente (viajero)                                     */
/* ------------------------------------------------------------------ */
const emptyForm = { destinationId: "", start: "", end: "", budget: "" };

export default function ClientDashboard({ onLogout }) {
  const [section, setSection] = useState("resumen");
  const [destinations] = useState(initialDestinations);
  const [trips, setTrips] = useState(initialTrips);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const getDestination = (id) => destinations.find((d) => d.id === id);

  const handleLogout = () => onLogout?.();

  const openNewTrip = (destinationId = "") => {
    setForm({ ...emptyForm, destinationId });
    setDialogOpen(true);
  };

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Costo estimado = días × costo diario del destino
  const selectedDestination = getDestination(form.destinationId);
  const nights = daysBetween(form.start, form.end);
  const estimatedCost = selectedDestination ? nights * selectedDestination.dailyCost : 0;

  const datesInvalid = form.start && form.end && nights <= 0;
  const formValid = form.destinationId && nights > 0 && Number(form.budget) > 0;

  const handleSave = () => {
    setTrips((prev) => [
      ...prev,
      {
        id: Date.now(),
        destinationId: form.destinationId,
        start: form.start,
        end: form.end,
        budget: Number(form.budget),
        saved: 0,
      },
    ]);
    // Aquí llamas a tu API (POST) para guardar el itinerario
    setDialogOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Eliminar este viaje?")) {
      setTrips((prev) => prev.filter((t) => t.id !== id));
      // Aquí llamas a tu API (DELETE)
    }
  };

  const sortedTrips = [...trips].sort((a, b) => a.start.localeCompare(b.start));
  const nextTrip = sortedTrips[0];
  const totalBudget = trips.reduce((sum, t) => sum + t.budget, 0);

  const TripCard = ({ trip }) => {
    const destination = getDestination(trip.destinationId);
    const progress = Math.min(100, Math.round((trip.saved / trip.budget) * 100));
    return (
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <Box>
              <Typography variant="h6">
                {destination?.name}, {destination?.country}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(trip.start)} → {formatDate(trip.end)} · {daysBetween(trip.start, trip.end)} días
              </Typography>
            </Box>
            <IconButton aria-label="eliminar viaje" color="error" onClick={() => handleDelete(trip.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Ahorrado {formatCOP(trip.saved)} de {formatCOP(trip.budget)}
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ mt: 1, height: 8, borderRadius: 4 }} />
        </CardContent>
      </Card>
    );
  };

  return (
    <Layout
      title="Mi espacio de viajes"
      roleLabel="Viajero"
      userName="Luna"
      items={menuItems}
      current={section}
      onChange={setSection}
      onLogout={handleLogout}
    >
      {/* ---------- RESUMEN ---------- */}
      {section === "resumen" && (
        <>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            ¡Hola! ¿A dónde vamos?
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard label="Viajes planeados" value={trips.length} icon={<CardTravelIcon />} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard
                label="Próximo viaje"
                value={nextTrip ? getDestination(nextTrip.destinationId)?.name : "—"}
                icon={<EventIcon />}
                color="secondary.main"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <StatCard
                label="Presupuesto total"
                value={formatCOP(totalBudget)}
                icon={<SavingsIcon />}
                color="success.main"
              />
            </Grid>
          </Grid>

          {nextTrip ? (
            <>
              <Typography variant="h6" gutterBottom>
                Tu próximo viaje
              </Typography>
              <TripCard trip={nextTrip} />
              <Paper sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle2">Recomendación del administrador</Typography>
                <Typography variant="body2" color="text.secondary">
                  {getDestination(nextTrip.destinationId)?.recommendation}
                </Typography>
              </Paper>
            </>
          ) : (
            <Paper sx={{ p: 4, textAlign: "center" }}>
              <Typography gutterBottom>Aún no tienes viajes planeados.</Typography>
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => openNewTrip()}>
                Planear mi primer viaje
              </Button>
            </Paper>
          )}
        </>
      )}

      {/* ---------- MIS VIAJES ---------- */}
      {section === "viajes" && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" fontWeight={700}>
              Mis viajes
            </Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => openNewTrip()}>
              Nuevo viaje
            </Button>
          </Box>
          <Grid container spacing={3}>
            {sortedTrips.map((trip) => (
              <Grid key={trip.id} size={{ xs: 12, md: 6 }}>
                <TripCard trip={trip} />
              </Grid>
            ))}
            {trips.length === 0 && (
              <Grid size={12}>
                <Paper sx={{ p: 4, textAlign: "center" }}>No tienes viajes todavía.</Paper>
              </Grid>
            )}
          </Grid>
        </>
      )}

      {/* ---------- EXPLORAR DESTINOS ---------- */}
      {section === "explorar" && (
        <>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Explorar destinos
          </Typography>
          <Grid container spacing={3}>
            {destinations.map((d) => (
              <Grid key={d.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="h6">{d.name}</Typography>
                      <Chip label={d.category} size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {d.country} · {formatCOP(d.dailyCost)} por día aprox.
                    </Typography>
                    <Typography variant="body2">{d.recommendation}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" startIcon={<AddIcon />} onClick={() => openNewTrip(d.id)}>
                      Planear viaje
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* ---------- DIÁLOGO NUEVO VIAJE ---------- */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Planear un viaje</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 0.5 }}>
            <Grid size={12}>
              <TextField
                name="destinationId"
                label="Destino"
                select
                fullWidth
                required
                value={form.destinationId}
                onChange={handleChange}
              >
                {destinations.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}, {d.country}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="start"
                label="Fecha de ida"
                type="date"
                fullWidth
                required
                value={form.start}
                onChange={handleChange}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                name="end"
                label="Fecha de regreso"
                type="date"
                fullWidth
                required
                value={form.end}
                onChange={handleChange}
                error={Boolean(datesInvalid)}
                helperText={datesInvalid ? "Debe ser posterior a la ida" : ""}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                name="budget"
                label="Tu presupuesto (COP)"
                type="number"
                fullWidth
                required
                value={form.budget}
                onChange={handleChange}
                helperText={
                  estimatedCost > 0
                    ? `Costo estimado para ${nights} días: ${formatCOP(estimatedCost)}`
                    : "Elige destino y fechas para ver un costo estimado"
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSave} disabled={!formValid}>
            Guardar viaje
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
}