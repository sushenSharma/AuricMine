import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Carousel from "react-material-ui-carousel"; // Install this package with npm or yarn
import "../../assets/styles/landingPage.css"; // Import the CSS file for styling
import CarouselImage1 from "../../../src/assets/resources/MainTable.jpg"
import CarouselImage2 from "../../../src/assets/resources/Carousel2.jpg"
import CarouselImage3 from "../../../src/assets/resources/carousel3.jpg"
import CarouselImage4 from "../../../src/assets/resources/Carousel4.jpg"
import CarouselImage5 from "../../../src/assets/resources/carousel6.jpg"


export default function SectionHome({ handleLogin }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Carousel images (replace with actual images)
  const carouselImages = [
  CarouselImage1,CarouselImage2,CarouselImage3,CarouselImage4,CarouselImage5
  ];

  return (
    <Box className="home-section-main">
      {/* Left container for text */}
      <Box
        sx={{
          zIndex: 1,
          padding: isMobile ? "2rem" : "5rem",
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontSize: "3rem",
            fontWeight: "600",
            textTransform: "uppercase",
            fontFamily: "Jura",
          }}
        >
          SWING TRADING, STREAMLINED <br /> WITH <br />{" "}
          <span className="gradientText">TRADINGJOURNAL.AI</span>
        </Typography>
        <Typography
          sx={{
            fontSize: "2rem",
            fontWeight: "600",
            fontFamily: "Jura",
            paddingY: isMobile ? "2rem" : "5rem",
            width: isMobile ? null : "75%",
          }}
        >
          Revolutionize your trades with our AI-driven platform. Track, analyze,
          and improve with ease.
        </Typography>
        <ul
          style={{
            listStyleType: "disc",
            marginLeft: "2rem",
            fontFamily: "Jura",
          }}
        >
          <li>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
              <strong>Stage-Based Watchlists :</strong> Map your stock’s journey—research, setup, entry, and exit
            </Typography>
          </li>
          <li>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
              <strong>AI-Powered Insights :</strong> Discover what works with
              tailored recommendations for your swing strategies.
            </Typography>
          </li>
          <li>
            <Typography sx={{ fontSize: "1.5rem", fontWeight: "500" }}>
              <strong>Proprietary Risk Management Algorithm :</strong>{" "}
              Dynamically adjust stop-losses based on performance for smarter
              trades.
            </Typography>
          </li>
        </ul>
        <Button
          type="button"
          sx={{
            backgroundColor: "#ffffff",
            margin: "2rem 0",
            fontSize: "16px",
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

      {/* Right container for carousel */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          padding: "1rem",
          width: "110%", // Adjust the width as needed
          height: "200%", // Adjust the height as needed
          marginRight: isMobile ? "2rem" : "2rem", // Add gap on the right
          marginLeft: isMobile ? "2rem" : "5rem", // Optionally shift carousel left
        }}
      >
        <Carousel
          indicators={false}
          navButtonsAlwaysVisible={true}
          sx={{
            height: isMobile ? "300px" : "500px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {carouselImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Feature ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "30px",
              }}
            />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}
