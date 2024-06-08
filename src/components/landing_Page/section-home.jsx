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
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/routerConstant";

export default function SectionHome() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigator = useNavigate();
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
          TRADING MADE EASY <br /> WITH <br /> TRADING JOURNAL
        </Typography>
        <Typography
          sx={{
            fontSize: "2rem", // Adjust font size for smaller screens
            fontWeight: "600",
            fontFamily: "Jura",
            paddingY: isMobile ? "2rem" : "5rem",
            width: isMobile ? null : "75%",
            // padding: "2rem 0",
          }}
        >
          Revolutionize your trades with our AI-driven journal app. Gain
          insights and track performance effortlessly on our cloud-based
          platform.
        </Typography>
        <Typography
          sx={{
            fontSize: "3rem", // Adjust font size for smaller screens
            fontFamily: "Jura",
            fontWeight: "600",
          }}
        >
          Welcome to a <span className="gradientText">Smarter</span> way to
          Trade
        </Typography>
        <Button
          type="button"
          sx={{
            backgroundColor: "#ffffff",
            margin: "2rem 0", // Adjust margin for smaller screens
            fontSize: "1.5rem", // Adjust font size for smaller screens
            fontFamily: "Jura",
            color: "black",
            padding: "1rem 2rem",
            borderRadius: "20px",
          }}
          className="signup-button"
          onClick={() => navigator(PATHS.DEFAULT_LOGIN)}
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
