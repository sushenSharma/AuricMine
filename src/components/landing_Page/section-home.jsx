import React from "react";
import { Box, Button, Typography } from "@mui/material";
import "../../assets/styles/landingPage.css"; // Import the CSS file for styling
import lad from "../../assets/resources/landingImage.jpg";

export default function SectionHome({onLogin}) {
  return (
    <Box
      sx={{
        display: "flex",
        color: "#ffffff",
        position: "relative", // Set the container position to relative
        paddingLeft: "5rem",
      }}
    >
      {/* Left container for text */}
      <Box sx={{ zIndex: 1, paddingTop: "10rem" }}>
        {" "}
        {/* Set a higher z-index to ensure text appears above the background */}
        <Typography
          sx={{
            fontSize: "64px",
            fontWeight: "500",
            textTransform: "uppercase",
            fontFamily: "Jura",
          }}
        >
          TRADING MADE EASY <br /> WITH <br /> TRADING JOURNAL
        </Typography>
        <Typography
          sx={{
            fontSize: "48px",
            fontWeight: "400",
            fontFamily: "Jura",
            paddingY: "5rem",
            width: "75%",
          }}
        >
          Revolutionize your trades with our AI-driven journal app. Gain
          insights and track performance effortlessly on our cloud-based
          platform.
        </Typography>
        <Typography
          sx={{
            fontSize: "64px",
            fontFamily: "Jura",
          }}
        >
          Welcome to a <span className="gradientText">Smater</span> way to trade
        </Typography>
        <Button
          type="button"
          sx={{
            backgroundColor: "#ffffff",
            marginY: "5rem", 
            fontSize: "32px",
            fontFamily: "Jura",
            color: "black",
            padding: "1rem 2rem",
            borderRadius: "20px"
          }}
          onClick={onLogin}
        >
          Sign Up
        </Button>
      </Box>
      {/* Right container for background image */}
      <Box
        sx={{
          position: "absolute", // Position the background image absolutely
          top: 0,
          right: 0,
          bottom: 0,
          left: 356,
          zIndex: 0, // Set a lower z-index so the text appears above
          backgroundImage: `url(${lad})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "65%"
        }}
      />
    </Box>
  );
}
