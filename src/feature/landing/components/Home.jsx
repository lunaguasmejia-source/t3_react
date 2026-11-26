import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  GlobalStyles,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EventNoteIcon from "@mui/icons-material/EventNote";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SavingsIcon from "@mui/icons-material/Savings";
import EmailIcon from "@mui/icons-material/Email";
import Navbar from "./Navbar";
// Destinos de ejemplo para las tarjetas de la página de inicio
const featured = [
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
];

const formatCOP = (n) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(n);

const steps = [
  {
    icon: <SearchIcon fontSize="large" />,
    title: "1. Explora",
    text: "Descubre destinos con recomendaciones y costos aproximados por día.",
  },
  {
    icon: <EventNoteIcon fontSize="large" />,
    title: "2. Planea",
    text: "Elige fechas, define tu presupuesto y arma tu itinerario en minutos.",
  },
  {
    icon: <SavingsIcon fontSize="large" />,
    title: "3. Ahorra",
    text: "Sigue tu progreso de ahorro para que llegues tranquilo a tu viaje.",
  },
  {
    icon: <FlightTakeoffIcon fontSize="large" />,
    title: "4. Viaja",
    text: "Disfruta tu aventura con todo organizado desde el primer día.",
  },
];

// Color de cabecera de cada tarjeta según la categoría del destino
const categoryColors = {
  Playa: "linear-gradient(135deg, #29b6f6, #0277bd)",
  Montaña: "linear-gradient(135deg, #8d6e63, #4e342e)",
  Ciudad: "linear-gradient(135deg, #ab47bc, #6a1b9a)",
  Naturaleza: "linear-gradient(135deg, #66bb6a, #2e7d32)",
  Cultura: "linear-gradient(135deg, #ffa726, #e65100)",
};

export default function Home() {
  return (
    <>
      {/* Scroll suave y margen para que la navbar no tape los títulos */}
      <GlobalStyles
        styles={{
          html: { scrollBehavior: "smooth" },
          "[id]": { scrollMarginTop: "72px" },
        }}
      />

      <Navbar />

      {/* ---------- HERO ---------- */}
      <Box
        id="inicio"
        sx={{
          color: "white",
          py: { xs: 10, md: 16 },
          textAlign: "center",
          background: "linear-gradient(135deg, #0277bd 0%, #26a69a 100%)",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight={800} sx={{ fontSize: { xs: "2.2rem", md: "3.5rem" } }}>
            Planea tu próximo viaje sin complicaciones
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, mb: 4, opacity: 0.9, fontWeight: 400 }}>
            Elige tu destino, define tu presupuesto y organiza tu itinerario en un solo lugar.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Button href="/registro" size="large" variant="contained" color="secondary">
              Empezar a planear
            </Button>
            <Button
              href="#destinos"
              size="large"
              variant="outlined"
              sx={{ color: "white", borderColor: "white" }}
            >
              Ver destinos
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* ---------- DESTINOS DESTACADOS ---------- */}
      <Box id="destinos" sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
            Destinos destacados
          </Typography>
          <Typography color="text.secondary" align="center" sx={{ mb: 5 }}>
            Algunos lugares que nuestros viajeros más planean.
          </Typography>

          <Grid container spacing={3}>
            {featured.map((d) => (
              <Grid key={d.id} size={{ xs: 12, md: 4 }}>
                <Card sx={{ height: "100%" }}>
                  <Box
                    sx={{
                      height: 140,
                      background: categoryColors[d.category] ?? categoryColors.Ciudad,
                      display: "flex",
                      alignItems: "flex-end",
                      p: 2,
                    }}
                  >
                    <Chip label={d.category} size="small" sx={{ bgcolor: "white" }} />
                  </Box>
                  <CardContent>
                    <Typography variant="h6">{d.name}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {d.country} · desde {formatCOP(d.dailyCost)} por día
                    </Typography>
                    <Typography variant="body2">{d.recommendation}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button href="/login" variant="outlined">
              Inicia sesión para ver todos los destinos
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ---------- CÓMO FUNCIONA ---------- */}
      <Box id="como-funciona" sx={{ py: 8, bgcolor: "grey.100" }}>
        <Container maxWidth="lg">
          <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
            ¿Cómo funciona?
          </Typography>
          <Typography color="text.secondary" align="center" sx={{ mb: 5 }}>
            Cuatro pasos para pasar de la idea al viaje.
          </Typography>

          <Grid container spacing={4}>
            {steps.map((step) => (
              <Grid key={step.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      mx: "auto",
                      mb: 2,
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ---------- LLAMADO A LA ACCIÓN ---------- */}
      <Box sx={{ py: 8, textAlign: "center", bgcolor: "primary.main", color: "white" }}>
        <Container maxWidth="sm">
          <Typography variant="h4" fontWeight={700} gutterBottom>
            ¿Listo para tu próxima aventura?
          </Typography>
          <Typography sx={{ mb: 3, opacity: 0.9 }}>
            Crea tu cuenta gratis y empieza a planear hoy mismo.
          </Typography>
          <Button href="/registro" size="large" variant="contained" color="secondary">
            Crear cuenta gratis
          </Button>
        </Container>
      </Box>

      {/* ---------- CONTACTO / FOOTER ---------- */}
      <Box id="contacto" component="footer" sx={{ py: 6, bgcolor: "grey.900", color: "grey.300" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h6" color="white" gutterBottom>
                ViajaFácil
              </Typography>
              <Typography variant="body2">
                Tu planificador de viajes: destinos, presupuesto e itinerarios en un solo lugar.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="subtitle1" color="white" gutterBottom>
                Enlaces
              </Typography>
              <Stack spacing={0.5}>
                <Link href="#destinos" color="inherit" underline="hover">Destinos</Link>
                <Link href="#como-funciona" color="inherit" underline="hover">Cómo funciona</Link>
                <Link href="/login" color="inherit" underline="hover">Iniciar sesión</Link>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <Typography variant="subtitle1" color="white" gutterBottom>
                Contacto
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon fontSize="small" />
                <Typography variant="body2">contacto@viajafacil.com</Typography>
              </Box>
            </Grid>
          </Grid>
          <Typography variant="caption" display="block" align="center" sx={{ mt: 4, opacity: 0.7 }}>
            © {new Date().getFullYear()} ViajaFácil. Todos los derechos reservados.
          </Typography>
        </Container>
      </Box>
    </>
  );
}