import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Rating,
} from "@mui/material";
import { styled } from "@mui/system";

const testimonials = [
  {
    name: "Lisa Rodriguez",
    location: "Mexico City, Mexico",
    flag: "🇲🇽",
    initial: "L",
    color: "#8e24aa",
    quote:
      "Reliable returns quarter after quarter. The mining sector expertise and global operations give me confidence in my investment.",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    location: "Mumbai, India",
    flag: "🇮🇳",
    initial: "R",
    color: "#ef6c00",
    quote:
      "Doubled my investment in 2 years—this is the real goldmine! The quarterly payouts are consistent and the transparency is unmatched.",
    rating: 5,
  },
  {
    name: "Ahmed Al-Rashid",
    location: "Dubai, UAE",
    flag: "🇦🇪",
    initial: "A",
    color: "#2e7d32",
    quote:
      "Finally found a mining venture that delivers as promised. The returns exceed expectations and the team is highly professional.",
    rating: 5,
  },
  {
    name: "Jeff Reugger",
    location: "Durban, Ireland",
    flag: "🇮🇪",
    initial: "J",
    color: "#ef6c00",
    quote:
      "Turned my initial investment into double in under two years. The returns are steady, and everything’s completely above board. This is where real value lies.",
    rating: 4.5,
  },
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
    <Box sx={{ py: 8, px: 3, backgroundColor: "#fff", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Testimonials
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        maxWidth={700}
        mx="auto"
        mb={6}
      >
        Hear from our global investors who have secured their financial future with AuricMine
      </Typography>

      <ScrollContainer>
        {testimonials.map((t, index) => (
          <Box key={index} sx={{ minWidth: 300, scrollSnapAlign: "start" }}>
            <Card elevation={2} sx={{ borderRadius: 3, textAlign: "left", height: "100%" }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ bgcolor: t.color, mr: 2 }}>{t.initial}</Avatar>
                  <Box>
                    <Typography fontWeight={600}>{t.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {t.location} {t.flag}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" mb={2}>
                  "{t.quote}"
                </Typography>
                <Rating value={t.rating} precision={0.5} readOnly size="small" />
              </CardContent>
            </Card>
          </Box>
        ))}
      </ScrollContainer>
    </Box>
  );
}