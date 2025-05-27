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
  const carouselImages = [CarouselImage1, CarouselImage2, CarouselImage3];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isMobile ? "2rem 1rem" : "4rem",
        backgroundColor: "#000",
        gap: "3rem",
      }}
    >
      {/* Text Section */}
      <Box sx={{ flex: 1, textAlign: isMobile ? "center" : "left" }}>
        <Typography
          sx={{
            fontSize: isMobile ? "2rem" : "3.5rem",
            fontWeight: 800,
            textTransform: "uppercase",
            color: "#ffffff",
            lineHeight: 1.2,
            fontFamily: "Montserrat",
          }}
        >
          Auric Mine Delivers
          <br />
          <span style={{ color: "#FF6666" }}>20% Monthly Returns</span>
          <br />
          <span style={{ color: "#ffffff" }}>with</span>
          <br />
          <span style={{ color: "#FF9999" }}>
            Reliably, Transparently, Consistently
          </span>
        </Typography>

        <Typography
          sx={{
            marginTop: "2rem",
            fontSize: isMobile ? "1.2rem" : "1.6rem",
            color: "#aaaaaa",
            fontFamily: "Jura",
            fontWeight: 400,
            lineHeight: 1.5,
          }}
        >
          Revolutionize your passive income through real-world mining assets
          backed by data and trust.
        </Typography>

        <Button
          type="button"
          sx={{
            backgroundColor: "#ffffff",
            marginTop: "2rem",
            fontSize: "16px",
            fontFamily: "Jura",
            color: "#000",
            padding: "10px 24px",
            borderRadius: "8px",
            fontWeight: 700,
          }}
          className="signup-button"
          onClick={handleLogin}
        >
          Start Earning Now
        </Button>
      </Box>

      {/* Carousel Section */}
      <Box
        sx={{
          flex: 1,
          height: isMobile ? "280px" : "450px",
          width: "100%",
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
                borderRadius: "12px",
              }}
            />
          ))}
        </Carousel>
      </Box>
    </Box>
  );
}
