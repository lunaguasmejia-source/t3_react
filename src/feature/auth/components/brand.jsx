import { Box, Typography } from "@mui/material";
import ExploreIcon from "@mui/icons-material/Explore";

// Logo / nombre de la app. Cambia "ViajaFácil" por el nombre que elijas.
export default function Brand() {
  return (
    <Box sx={{ mt: 6, display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
      <ExploreIcon color="primary" fontSize="large" />
      <Typography variant="h5" component="div" fontWeight={700} color="primary">
        ViajaFácil
      </Typography>
    </Box>
  );
}