import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PlaceIcon from '@mui/icons-material/Place';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ImageA from "../../../src/assets/resources/a.jpg"
import ImageB from "../../../src/assets/resources/b.jpg"
import ImageC from "../../../src/assets/resources/c.jpeg"
import ImageD from "../../../src/assets/resources/d.jpeg"

export default function WhyIronOreSection() {
  return (
    <Box sx={{ py: 8, px: 3, backgroundColor: "#f9f9f9", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Why Iron Ore?
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" maxWidth={600} mx="auto" mb={6}>
        Iron ore drives global infrastructure growth and remains the backbone of modern civilization
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Data Cards */}
        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Global Steel Demand
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h5" fontWeight={700} color="orange">
                    1.9B
                  </Typography>
                  <Typography variant="body2">Tonnes Annually</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" fontWeight={600} color="orange">
                    +3.2%
                  </Typography>
                  <Typography variant="body2">Annual Growth</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card elevation={2} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                China’s Import Dependence
              </Typography>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="h5" fontWeight={700} color="red">
                    70%
                  </Typography>
                  <Typography variant="body2">Import Dependency</Typography>
                </Box>
                <Avatar sx={{ bgcolor: "red", width: 48, height: 48 }}>CN</Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Image Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Avatar
            variant="rounded"
            src={ImageA}
            alt="data-stats"
            sx={{ width: "100%", height: 140, borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Avatar
            variant="rounded"
            src={ImageB}
            alt="map"
            sx={{ width: "100%", height: 140, borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Avatar
            variant="rounded"
            src={ImageC}
            alt="earth"
            sx={{ width: "100%", height: 140, borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Avatar
            variant="rounded"
            src={ImageD}
            alt="globe"
            sx={{ width: "100%", height: 140, borderRadius: 2 }}
          />
        </Grid>
      </Grid>

      {/* Feature Cards */}
      <Grid container spacing={3} justifyContent="center" mt={5}>
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Avatar sx={{ bgcolor: "#e0f7e9", color: "green" }}>
                  <TrendingUpIcon />
                </Avatar>
                <Typography fontWeight={600}>Recession-Resilient Commodity</Typography>
              </Box>
              <Typography color="textSecondary">
                Iron ore maintains stable demand during economic downturns as infrastructure needs persist globally.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Avatar sx={{ bgcolor: "#e3f2fd", color: "#1e88e5" }}>
                  <PlaceIcon />
                </Avatar>
                <Typography fontWeight={600}>High-Volume Exports</Typography>
              </Box>
              <Typography color="textSecondary">
                Brazil & Australia dominate global iron ore exports with established shipping infrastructure.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={2} sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Avatar sx={{ bgcolor: "#fff8e1", color: "#f9a825" }}>
                  <VerifiedUserIcon />
                </Avatar>
                <Typography fontWeight={600}>Government-Backed Leases</Typography>
              </Box>
              <Typography color="textSecondary">
                Our mining operations are secured by government-approved leases with long-term extraction rights.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}