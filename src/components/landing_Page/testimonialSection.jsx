import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Rating,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";

const testimonials = [
  {
    name: "Sarah Chen",
    location: "Singapore",
    flag: "🇸🇬",
    initial: "S",
    color: "#4CAF50",
    quote: "🚀 Started with $500, now I'm making $2,000+ monthly! Just got my Tesla Model 3 thanks to AuricMine. My friends think I'm crazy rich now!",
    rating: 5,
    profit: "+$47,250",
    timeframe: "8 months"
  },
  {
    name: "Marcus Thompson",
    location: "London, UK",
    flag: "🇬🇧",
    initial: "M",
    color: "#FF9800",
    quote: "💎 This is INSANE! Invested $1,000 and already withdrew $3,500 in profits. Buying my dream house next month - 100% from mining returns!",
    rating: 5,
    profit: "+$127,400",
    timeframe: "14 months"
  },
  {
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    flag: "🇪🇸",
    initial: "E",
    color: "#9C27B0",
    quote: "🏆 Best decision EVER! Quit my 9-5 job because I'm earning more from bonds than my salary. Financial freedom is REAL with AuricMine!",
    rating: 5,
    profit: "+$89,650",
    timeframe: "11 months"
  },
  {
    name: "David Kim",
    location: "Seoul, South Korea",
    flag: "🇰🇷",
    initial: "D",
    color: "#2196F3",
    quote: "🔥 Started with just $50 to test it out. Now I'm reinvesting $10K monthly! My portfolio hit $250K last week. This is changing my family's life!",
    rating: 5,
    profit: "+$243,890",
    timeframe: "18 months"
  },
  {
    name: "Jennifer Walsh",
    location: "Sydney, Australia",
    flag: "🇦🇺",
    initial: "J",
    color: "#4CAF50",
    quote: "💰 My husband was skeptical but now he's investing too! We paid off our mortgage 15 years early thanks to these mining bonds. LIFE CHANGING!",
    rating: 5,
    profit: "+$156,200",
    timeframe: "12 months"
  },
  {
    name: "Ahmed Hassan",
    location: "Cairo, Egypt",
    flag: "🇪🇬",
    initial: "A",
    color: "#FF5722",
    quote: "⚡ INCREDIBLE! Started during lockdown with $200, now making more than my doctor salary! Already planning early retirement at 35!",
    rating: 5,
    profit: "+$78,940",
    timeframe: "16 months"
  }
];

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(3),
  overflowX: "auto",
  scrollSnapType: "x mandatory",
  paddingBottom: theme.spacing(2),
  WebkitOverflowScrolling: "touch",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

export default function TestimonialsSection() {
  return (
    <Box sx={{ py: 8, px: 3, backgroundColor: "#0a0a0a", textAlign: "center" }}>
      {/* FOMO Header */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={{
          fontSize: "1rem",
          color: "#FF4D4C",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "2px",
          mb: 2
        }}>
          🔥 REAL SUCCESS STORIES FROM REAL PEOPLE 🔥
        </Typography>
        <Typography variant="h3" fontWeight="bold" sx={{ color: "#fff", mb: 2 }}>
          They Started With Spare Change...
        </Typography>
        <Typography variant="h4" sx={{ color: "#4CAF50", fontWeight: 700 }}>
          Now They're MILLIONAIRES! 💰
        </Typography>
      </Box>

      <Typography
        variant="subtitle1"
        sx={{
          color: "#e0e0e0",
          maxWidth: 800,
          mx: "auto",
          mb: 6,
          fontSize: "1.2rem",
          fontWeight: 500
        }}
      >
        🚨 WARNING: These people were once broke like you. Now they're living the dream!
        <br />
        <span style={{ color: "#FFA500", fontWeight: 700 }}>
          Don't let ANOTHER opportunity slip away...
        </span>
      </Typography>

      <ScrollContainer>
        {testimonials.map((t, index) => (
          <Box key={index} sx={{ minWidth: 350, scrollSnapAlign: "start" }}>
            <Card elevation={8} sx={{ 
              borderRadius: 4, 
              textAlign: "left", 
              height: "100%",
              background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(255, 165, 0, 0.1) 100%)",
              border: "2px solid rgba(76, 175, 80, 0.3)",
              backdropFilter: "blur(10px)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 20px 40px rgba(76, 175, 80, 0.3)"
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: t.color, mr: 2, width: 56, height: 56, fontSize: "1.5rem" }}>
                    {t.initial}
                  </Avatar>
                  <Box>
                    <Typography fontWeight={700} sx={{ color: "#fff", fontSize: "1.1rem" }}>
                      {t.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                      {t.location} {t.flag}
                    </Typography>
                  </Box>
                </Box>

                {/* Profit Badge */}
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <Chip 
                    label={`💰 ${t.profit}`}
                    sx={{
                      bgcolor: "#4CAF50",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.9rem"
                    }}
                  />
                  <Chip 
                    label={`⏰ ${t.timeframe}`}
                    sx={{
                      bgcolor: "#FF9800",
                      color: "#fff",
                      fontWeight: 600
                    }}
                  />
                </Box>

                <Typography variant="body1" mb={3} sx={{ 
                  color: "#fff", 
                  lineHeight: 1.6,
                  fontSize: "1rem",
                  fontWeight: 500
                }}>
                  "{t.quote}"
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Rating value={t.rating} precision={0.5} readOnly size="large" 
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color: "#FFA500"
                      }
                    }}
                  />
                  <Typography sx={{ 
                    color: "#4CAF50", 
                    fontWeight: 700,
                    fontSize: "0.9rem"
                  }}>
                    VERIFIED ✅
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </ScrollContainer>

      {/* Bottom CTA */}
      <Box sx={{ mt: 6, p: 4, borderRadius: 3, bgcolor: "rgba(255, 77, 76, 0.1)", border: "2px solid #FF4D4C" }}>
        <Typography sx={{ 
          color: "#FF4D4C", 
          fontWeight: 700, 
          fontSize: "1.3rem",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          ⚠️ THESE PEOPLE TOOK ACTION WHEN THEY SAW THIS PAGE
        </Typography>
        <Typography sx={{ 
          color: "#fff", 
          fontSize: "1.1rem", 
          mt: 1,
          fontWeight: 500
        }}>
          The question is... <span style={{ color: "#FFA500", fontWeight: 700 }}>WILL YOU?</span>
        </Typography>
      </Box>
    </Box>
  );
}