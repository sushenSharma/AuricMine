import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  LinearProgress,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AustralianMine from "../../assets/resources/AustraliaMine.jpg"

const projectData = [
  {
    title: "Brazil – Minas Gerais",
    reserve: "80M",
    capacity: "12M",
    lease: "Government lease until 2045",
    access: "Direct port access - 45km",
    grade: "65% iron content grade",
    image: {AustralianMine},
    flag: "/images/flag-brazil.png",
    status: "Active",
    progress: 92,
    color: "#4caf50",
  },
  {
    title: "Australia – Pilbara Belt",
    reserve: "50M",
    capacity: "8M",
    lease: "Mining rights until 2050",
    access: "Rail connection to Port Hedland",
    grade: "62% iron content grade",
    image: "/images/australia.jpg",
    flag: "/images/flag-australia.png",
    status: "Expanding",
    progress: 78,
    color: "#3f51b5",
  },
  {
    title: "India – Odisha Ridge",
    reserve: "60M",
    capacity: "9M",
    lease: "License valid till 2042",
    access: "Road link to Paradip port",
    grade: "64% iron content grade",
    image: "/images/india.jpg",
    flag: "/images/flag-india.png",
    status: "Active",
    progress: 85,
    color: "#4caf50",
  },
  {
    title: "South Africa – Northern Cape",
    reserve: "55M",
    capacity: "10M",
    lease: "Long-term lease till 2048",
    access: "Bulk rail corridor available",
    grade: "63% iron content grade",
    image: "/images/southafrica.jpg",
    flag: "/images/flag-southafrica.png",
    status: "Developing",
    progress: 60,
    color: "#ff9800",
  },
];

export default function OurProjectsSection() {
  return (
    <Box sx={{ py: 8, px: 3, backgroundColor: "#fff", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Our Projects
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" maxWidth={700} mx="auto" mb={6}>
        Strategic mining operations across two continents with proven reserves and established infrastructure
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {projectData.map((proj, index) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
            <Card elevation={3} sx={{ borderRadius: 4, overflow: 'hidden' }}>
              <Box position="relative">
                <CardMedia
                  component="img"
                  height="180"
                  image={proj.image}
                  alt={proj.title}
                />
                <Chip
                  label={proj.status}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    backgroundColor: proj.status === 'Active' ? '#4caf50' : proj.status === 'Expanding' ? '#3f51b5' : '#ff9800',
                    color: "#fff",
                    fontWeight: 600
                  }}
                />
                <Avatar
                  src={proj.flag}
                  sx={{ position: "absolute", top: 12, right: 12, width: 28, height: 20 }}
                  variant="square"
                />
              </Box>
              <CardContent sx={{ textAlign: 'left' }}>
                <Typography variant="h6" fontWeight={600}>{proj.title}</Typography>
                <Stack direction="row" spacing={4} mt={1} mb={1}>
                  <Box>
                    <Typography fontWeight={700} color="orange">{proj.reserve}</Typography>
                    <Typography variant="body2">Tonnes Reserve</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={700} color="orange">{proj.capacity}</Typography>
                    <Typography variant="body2">Annual Capacity</Typography>
                  </Box>
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="body2"><CheckCircleIcon fontSize="small" color="success" sx={{ verticalAlign: 'middle' }} /> {proj.lease}</Typography>
                  <Typography variant="body2"><CheckCircleIcon fontSize="small" color="success" sx={{ verticalAlign: 'middle' }} /> {proj.access}</Typography>
                  <Typography variant="body2"><CheckCircleIcon fontSize="small" color="success" sx={{ verticalAlign: 'middle' }} /> {proj.grade}</Typography>
                </Stack>
                <Box mt={3}>
                  <Typography variant="body2" fontWeight={600} mb={0.5}>
                    Production Status <span style={{ float: 'right', color: proj.color }}>{proj.progress}% Capacity</span>
                  </Typography>
                  <LinearProgress variant="determinate" value={proj.progress} sx={{ height: 8, borderRadius: 10, [`& .MuiLinearProgress-bar`]: { backgroundColor: proj.color } }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
