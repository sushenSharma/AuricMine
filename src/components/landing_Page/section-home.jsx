import React from "react";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: isMobile ? "2.5rem" : "4.5rem",
            lineHeight: 1.1,
            mb: 3,
            fontFamily: '"Inter", sans-serif',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            background: 'linear-gradient(45deg, #ffffff 0%, #FFA500 50%, #FF4D4C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 3s ease-in-out infinite'
          }}
        >
          Invest in the Future of Iron
        </Typography>

        <Typography
          sx={{
            fontSize: isMobile ? "1.1rem" : "1.4rem",
            mb: 4,
            color: "#e0e0e0",
            fontFamily: '"Inter", sans-serif',
            fontWeight: 400,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          Earn 6-10% Monthly Returns with Backed Iron Ore Ventures
        </Typography>

        <Button
          onClick={handleLogin}
          sx={{
            background: 'linear-gradient(135deg, #FF4D4C 0%, #FFA500 100%)',
            color: "#fff",
            fontWeight: "bold",
            px: 5,
            py: 2,
            borderRadius: "16px",
            fontSize: isMobile ? "1rem" : "1.2rem",
            textTransform: "none",
            fontFamily: '"Inter", sans-serif',
            boxShadow: '0 8px 24px rgba(255, 77, 76, 0.4)',
            border: 'none',
            transition: 'all 0.3s ease',
            "&:hover": {
              background: 'linear-gradient(135deg, #FFA500 0%, #FF4D4C 100%)',
              transform: 'translateY(-3px)',
              boxShadow: '0 12px 32px rgba(255, 77, 76, 0.5)',
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
            gap: isMobile ? 3 : 8,
            mt: 6,
            p: isMobile ? 2 : 4,
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ 
              fontSize: isMobile ? "2rem" : "2.5rem", 
              fontWeight: "bold", 
              color: "#FFA500",
              fontFamily: '"Inter", sans-serif',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              6-10%
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#e0e0e0',
              fontWeight: 500,
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>Annual Returns</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ 
              fontSize: isMobile ? "2rem" : "2.5rem", 
              fontWeight: "bold", 
              color: "#FFA500",
              fontFamily: '"Inter", sans-serif',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              130M+
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#e0e0e0',
              fontWeight: 500,
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>Tonnes Reserve</Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ 
              fontSize: isMobile ? "2rem" : "2.5rem", 
              fontWeight: "bold", 
              color: "#FFA500",
              fontFamily: '"Inter", sans-serif',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              1,200+
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#e0e0e0',
              fontWeight: 500,
              fontSize: isMobile ? '0.9rem' : '1rem'
            }}>Global Investors</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
