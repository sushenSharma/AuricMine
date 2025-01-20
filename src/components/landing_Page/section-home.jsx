import React from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "../../assets/styles/landingPage.css"; // Import the CSS file for styling
import lad from "../../assets/resources/landingpage.png";

export default function SectionHome({ handleLogin }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      className="home-section-main"
      // style={{ backgroundImage: `url(${lad})` }}
    >
      {/* Left container for text */}
      <Box
  sx={{
    zIndex: 1,
    padding: isMobile ? "2rem" : "5rem",
    width: "100%", // Full width
  }}
>
  {/* Set a higher z-index to ensure text appears above the background */}
  <Typography
    sx={{
      fontSize: "3rem", // Adjust font size for smaller screens
      fontWeight: "600",
      textTransform: "uppercase",
      fontFamily: "Jura",
    }}
  >
    SWING TRADING, STREAMLINED <br /> WITH <br /> <span className="gradientText">TRADINGJOURNAL.AI</span>
  </Typography>
  <Typography
    sx={{
      fontSize: "2rem", // Adjust font size for smaller screens
      fontWeight: "600",
      fontFamily: "Jura",
      paddingY: isMobile ? "2rem" : "5rem",
      width: isMobile ? null : "75%",
    }}
  >
    Revolutionize your trades with our AI-driven platform. Track, analyze, and improve with ease.
  </Typography>
  <ul style={{ listStyleType: "disc", marginLeft: "2rem", fontFamily: "Jura" }}>
    <li>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "500",
        }}
      >
        <strong>Phase-Based Watchlists:</strong> Stay organized by tracking every stock—research, setup, entry, or exit.
      </Typography>
    </li>
    <li>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "500",
        }}
      >
        <strong>AI-Powered Insights:</strong> Discover what works with tailored recommendations for your swing strategies.
      </Typography>
    </li>
    <li>
      <Typography
        sx={{
          fontSize: "1.5rem",
          fontWeight: "500",
        }}
      >
        <strong>Proprietary Risk Management Algorithm:</strong> Dynamically adjust stop-losses based on performance for smarter trades.
      </Typography>
    </li>
  </ul>
  <Typography
    sx={{
      fontSize: "3rem", // Adjust font size for smaller screens
      fontFamily: "Jura",
      fontWeight: "600",
    }}
  >
  </Typography>
  <Button
    type="button"
    sx={{
      backgroundColor: "#ffffff",
      margin: "2rem 0", // Adjust margin for smaller screens
      fontSize: "16px", // Adjust font size for smaller screens
      fontFamily: "Jura",
      color: "#000",
      padding: "7px 16px 8px",
      borderRadius: "8px",
      fontWeight: 700,
    }}
    className="signup-button"
    onClick={handleLogin}
  >
    Sign Up
  </Button>
</Box>

      {/* Right container for background image */}
      {
        <Box
          sx={{
            position: "absolute", // Position the background image absolutely
            top: 0,
            right: 0,
            bottom: 0,
            left: isMobile ? 0 : 300,
            zIndex: 0, // Set a lower z-index so the text appears above
            backgroundImage: `url(${lad})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: isMobile ? "50vh" : "100%", // Adjust height as needed
            opacity: 0.7,
          }}
        />
      }
    </Box>
  );
}
