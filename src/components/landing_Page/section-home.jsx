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
import CarouselImage1 from "../../../src/assets/resources/TradeJournalTable.png";
import CarouselImage2 from "../../../src/assets/resources/AI Generated insights.png";
import CarouselImage3 from "../../../src/assets/resources/StockWatchlist.png";

export default function SectionHome({ handleLogin }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Carousel images
  const carouselImages = [CarouselImage1, CarouselImage2, CarouselImage3];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", // Two columns for desktop, single column for mobile
        gridTemplateRows: "auto auto", // Two rows (first row: title & carousel; second row: content)
        gridTemplateAreas: isMobile
          ? `
          "title"
          "carousel"
          "content"
        `
          : `
          "title carousel"
          "content content"
        `,
        gap: "2rem", // Space between boxes
        padding: "2rem",
      }}
    >
      {/* Title Box */}
      <Box
        sx={{
          fontSize: isMobile ? "2.5rem" : "4rem", // Slightly larger font for more prominence
          fontWeight: "800", // Thicker font weight
          textTransform: "uppercase",
          fontFamily: "Jura", // Use a bold font family like Roboto Bold or similar
          color: "#ffffff", // Ensures text visibility
          justifyContent:"center",
          textAlign:"center",
          

        }}
      >
        <Typography
          sx={{
            fontSize: isMobile ? "2rem" : "4rem",
            fontWeight: "900",
            textTransform: "uppercase",
            fontFamily: "Montserrat",
            color: "#ffffff",
            fontWeight:"bold"
          }}
        >
          SWING TRADING, STREAMLINED <br /> WITH <br />
          <span className="gradientText">TRADINGJOURNAL.AI</span>
        </Typography>
        
      </Box>

      {/* Carousel Box */}
      <Box
        sx={{
          gridArea: "carousel",
          position: "relative",
          zIndex: 1,
          height: isMobile ? "300px" : "500px",
        }}
      >
        <Carousel indicators={false} navButtonsAlwaysVisible>
          {carouselImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Feature ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ))}
        </Carousel>
      </Box>

      {/* Content Box */}
      <Box
        sx={{
          gridArea: "content",
          backgroundColor: isMobile ? "#1a1a1a" : "transparent", // Background to enhance text visibility
          padding: "2rem",
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            fontSize: isMobile ? "1.5rem" : "3rem",
            fontWeight: "600",
            fontFamily: "Jura",
            color: "#ffffff", // Ensures text visibility
            marginBottom: "2rem",
          }}
        >
          Revolutionize your trades with :-
        </Typography>

        <ul
  style={{
    listStyleType: "none", // Remove default bullets
    marginLeft: "-1rem",
    fontFamily: "Jura",
    padding: "0",
  }}
>
  <li
    style={{
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "1rem",
    }}
  >
    {/* Bullet Icon */}
    <span
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: "#ffffff", // Bullet color
        borderRadius: "50%", // Makes it a circle
        marginRight: "1rem", // Spacing between icon and text
        marginTop: "0.5rem", // Align bullet vertically
      }}
    ></span>

    {/* Text */}
    <Typography sx={{ fontSize: "1.8rem", fontWeight: "500", color: "#ffffff" }}>
      <strong>Stage-Based Watchlists:</strong> Map your stock’s journey—research, setup, entry, and exit
    </Typography>
  </li>

  <li
    style={{
      display: "flex",
      alignItems: "flex-start",
      marginBottom: "1rem",
    }}
  >
    {/* Bullet Icon */}
    <span
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "50%",
        marginRight: "1rem",
        marginTop: "0.5rem",
      }}
    ></span>

    {/* Text */}
    <Typography sx={{ fontSize: "1.8rem", fontWeight: "500", color: "#ffffff" }}>
      <strong>AI-Powered Insights:</strong> Discover what works with tailored recommendations for your swing strategies.
    </Typography>
  </li>

  <li
    style={{
      display: "flex",
      alignItems: "flex-start",
    }}
  >
    {/* Bullet Icon */}
    <span
      style={{
        width: "10px",
        height: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "50%",
        marginRight: "1rem",
        marginTop: "0.5rem",
      }}
    ></span>

    {/* Text */}
    <Typography sx={{ fontSize: "1.8rem", fontWeight: "500", color: "#ffffff" }}>
      <strong>Proprietary Risk Management Algorithm:</strong> Dynamically adjust stop-losses based on performance for smarter trades.
    </Typography>
  </li>
</ul>


        <Button
          type="button"
          sx={{
            backgroundColor: "#ffffff",
            marginTop: "2rem",
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
    </Box>
  );
}
