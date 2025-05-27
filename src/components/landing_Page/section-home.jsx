import React from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "../../assets/styles/landingPage.css";
import BackgroundImage from "../../../src/assets/resources/r.jpg";



export default function SectionHome({ handleLogin }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <Box
      sx={{
        position: "relative",
        height: isMobile ? "100vh" : "90vh",
        width: "100%",
        backgroundImage: `url(${BackgroundImage})`, // Use your road background image here
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textAlign: "center",
        px: 2,
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box sx={{ position: "relative", zIndex: 2, maxWidth: "900px" }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: isMobile ? "2.5rem" : "4rem",
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          Invest in the <span style={{ color: "#FFA500" }}>Future of Iron</span>
        </Typography>

        <Typography
          sx={{
            fontSize: isMobile ? "1rem" : "1.25rem",
            mb: 3,
            color: "#e0e0e0",
          }}
        >
          Earn 6-10% Monthly Returns with Backed Iron Ore Ventures
        </Typography>

        <Button
          onClick={handleLogin}
          sx={{
            backgroundColor: "#FFA500",
            color: "#000",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: "8px",
            fontSize: "1rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#ffb733",
            },
          }}
        >
          Start Investing Now →
        </Button>

        {/* Stats Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "center",
            alignItems: "center",
            gap: isMobile ? 1.5 : 6,
            mt: 5,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#FFCC00" }}>
              6-10%
            </Typography>
            <Typography variant="body2">Annual Returns</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#FFCC00" }}>
              130M+
            </Typography>
            <Typography variant="body2">Tonnes Reserve</Typography>
          </Box>
          <Box>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#FFCC00" }}>
              1,200+
            </Typography>
            <Typography variant="body2">Global Investors</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
