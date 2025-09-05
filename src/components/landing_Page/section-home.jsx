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
        {/* FOMO Alert Banner */}
        <Box sx={{
          bgcolor: 'rgba(255, 77, 76, 0.9)',
          color: '#fff',
          py: 1,
          px: 3,
          borderRadius: '25px',
          mb: 3,
          fontSize: isMobile ? '0.9rem' : '1rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 4px 15px rgba(255, 77, 76, 0.4)',
          animation: 'pulse 2s infinite'
        }}>
          🔥 BREAKING: Only 847 Investment Spots Left for 2024! 🔥
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontWeight: 700,
            fontSize: isMobile ? "2.8rem" : "5rem",
            lineHeight: 1.1,
            mb: 2,
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
          Turn $1 Into $1,000+ 
        </Typography>

        <Typography
          sx={{
            fontSize: isMobile ? "1.3rem" : "1.8rem",
            mb: 1,
            color: "#4CAF50",
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.4
          }}
        >
          🚀 With Iron Ore Mining Bonds That Pay 400% Annual Returns
        </Typography>

        <Typography
          sx={{
            fontSize: isMobile ? "1rem" : "1.2rem",
            mb: 1,
            color: "#FFA500",
            fontFamily: '"Inter", sans-serif',
            fontWeight: 600,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: 1.5
          }}
        >
          💎 Backed by BHP Billiton • Rio Tinto • Vale Partnership Network
        </Typography>

        <Typography
          sx={{
            fontSize: isMobile ? "0.9rem" : "1rem",
            mb: 4,
            color: "#e0e0e0",
            fontFamily: '"Inter", sans-serif',
            fontWeight: 500,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontStyle: 'italic'
          }}
        >
          ⏰ Limited Time: First 100 investors get GUARANTEED 450% returns + $50 bonus
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Button
            onClick={handleLogin}
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #FFA500 100%)',
              color: "#fff",
              fontWeight: "bold",
              px: 6,
              py: 2.5,
              borderRadius: "25px",
              fontSize: isMobile ? "1.1rem" : "1.4rem",
              textTransform: "none",
              fontFamily: '"Inter", sans-serif',
              boxShadow: '0 10px 30px rgba(76, 175, 80, 0.5)',
              border: 'none',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              "&:hover": {
                background: 'linear-gradient(135deg, #FFA500 0%, #4CAF50 100%)',
                transform: 'translateY(-4px) scale(1.05)',
                boxShadow: '0 15px 40px rgba(76, 175, 80, 0.6)',
              },
            }}
          >
            🚀 GET MY 400% RETURNS NOW - FREE! 🚀
          </Button>
          
          <Typography sx={{
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            color: '#4CAF50',
            fontWeight: 600,
            animation: 'blink 1.5s infinite'
          }}>
            ⚡ 100% FREE TO START • NO HIDDEN FEES • INSTANT APPROVAL ⚡
          </Typography>
        </Box>

        {/* Live Success Stats */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
            gap: isMobile ? 2 : 4,
            mt: 6,
            p: isMobile ? 3 : 4,
            borderRadius: '25px',
            background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(255, 165, 0, 0.15) 100%)',
            backdropFilter: 'blur(15px)',
            border: '2px solid rgba(76, 175, 80, 0.3)',
            boxShadow: '0 12px 40px 0 rgba(76, 175, 80, 0.25)',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ 
              fontSize: isMobile ? "1.8rem" : "2.2rem", 
              fontWeight: "bold", 
              color: "#4CAF50",
              fontFamily: '"Inter", sans-serif',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              450% 🔥
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#e0e0e0',
              fontWeight: 600,
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}>MAX Returns</Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ 
              fontSize: isMobile ? "1.8rem" : "2.2rem", 
              fontWeight: "bold", 
              color: "#FFA500",
              fontFamily: '"Inter", sans-serif',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              847
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#FF4D4C',
              fontWeight: 600,
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}>Spots Left</Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ 
              fontSize: isMobile ? "1.8rem" : "2.2rem", 
              fontWeight: "bold", 
              color: "#4CAF50",
              fontFamily: '"Inter", sans-serif',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              $2.8B+
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#e0e0e0',
              fontWeight: 600,
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}>Paid Out</Typography>
          </Box>
          
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ 
              fontSize: isMobile ? "1.8rem" : "2.2rem", 
              fontWeight: "bold", 
              color: "#FFA500",
              fontFamily: '"Inter", sans-serif',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              24/7
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#4CAF50',
              fontWeight: 600,
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}>Live Support</Typography>
          </Box>
        </Box>

        {/* Authentic Mining Partners Banner */}
        <Box sx={{
          mt: 4,
          p: 3,
          borderRadius: '15px',
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        }}>
          <Typography sx={{
            fontSize: isMobile ? '0.9rem' : '1rem',
            color: '#e0e0e0',
            textAlign: 'center',
            mb: 2,
            fontWeight: 500
          }}>
            🏆 TRUSTED BY INDUSTRY LEADERS
          </Typography>
          <Typography sx={{
            fontSize: isMobile ? '0.8rem' : '0.9rem',
            color: '#FFA500',
            textAlign: 'center',
            fontWeight: 600,
            letterSpacing: '1px'
          }}>
            BHP BILLITON • RIO TINTO • VALE S.A. • FORTESCUE METALS • ANGLO AMERICAN
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
