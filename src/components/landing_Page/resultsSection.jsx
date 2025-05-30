import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Divider,
} from "@mui/material";
import ProvenTrackRecordBackgroungImage from "../../assets/resources/gerger.png"

const returnsData = [
  { year: "Year 1 (2022)", target: 18, actual: 20.5, color: "#4caf50" },
  { year: "Year 2 (2023)", target: 20, actual: 23.1, color: "#4caf50" },
  { year: "Year 3 (2024)", target: 22, actual: 18.7, color: "#fb8c00" },
];

export default function ReturnsSection() {
  return (
    <Box sx={{ py: 8, px: 3, backgroundColor: "#f9f9f9", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Returns
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" maxWidth={700} mx="auto" mb={6}>
        Consistent performance with transparent reporting and quarterly payouts to secure your investment future
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Proven Track Record Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 4, overflow: "hidden", textAlign: "left" }}>
          <Box
             component="img"
             src={ProvenTrackRecordBackgroungImage}
             alt="Proven Track Record"
             sx={{
                width: "100%",
                height: "200px",
                objectFit: "contain",
                backgroundColor: "#fff",
                }}
/>

            <CardContent>
              <Typography variant="h6" fontWeight={600}>Proven Track Record</Typography>
              <Typography variant="body2" color="textSecondary">3+ years of consistent outperformance</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Projected vs Actual Returns */}
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 4 }}>
            <CardContent sx={{ textAlign: "left" }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Projected vs Actual Returns
              </Typography>
              {returnsData.map((item, idx) => (
                <Box key={idx} mb={2}>
                  <Typography fontWeight={500} mb={0.5}>{item.year}</Typography>
                  <LinearProgress
                    variant="determinate"
                    value={item.actual}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#e0e0e0",
                      ["& .MuiLinearProgress-bar"]: {
                        backgroundColor: item.color,
                      },
                    }}
                  />
                  <Box display="flex" justifyContent="space-between" mt={0.5}>
                    <Typography variant="caption" color="textSecondary">Target: {item.target}%</Typography>
                    <Typography variant="caption" color={item.color === "#4caf50" ? "green" : "#fb8c00"}>
                      {item.year.includes("2024") ? `Current: ${item.actual}%` : `Actual: ${item.actual}%`}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Revenue Model + Quarterly Payouts */}
        <Grid item xs={12} md={8}>
          <Card elevation={3} sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Revenue Model Breakdown
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Iron Ore Sales</Typography>
                <Typography fontWeight={600}>75%</Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between" my={1}>
                <Typography>Processing Fees</Typography>
                <Typography fontWeight={600}>15%</Typography>
              </Box>
              <Divider />
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography>Other Revenue</Typography>
                <Typography fontWeight={600}>10%</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3} sx={{ borderRadius: 4, backgroundColor: "#1b5e20", color: "white" }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Quarterly Payouts
              </Typography>
              <Box display="flex" justifyContent="space-between">
                <Typography>Q1 2024</Typography>
                <Typography fontWeight={600}>4.2%</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Q2 2024</Typography>
                <Typography fontWeight={600}>4.8%</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Q3 2024</Typography>
                <Typography fontWeight={600}>5.1%</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Q4 2024</Typography>
                <Typography fontWeight={600}>Est. 4.6%</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
