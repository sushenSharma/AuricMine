import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PublicIcon from '@mui/icons-material/Public';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';
import MineLandscape from "../../assets/resources/4trgr.png"

export default function InvestorCTASection() {
  return (
    <Box sx={{ py: 10, px: 4, background: '#2c2c2c', color: '#fff' }}>
      <Grid container spacing={6} alignItems="center" justifyContent="center">
        {/* Text Section */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Join 1,200+ global investors securing their future with iron.
          </Typography>
          <Typography variant="body1" color="#ccc" mb={4}>
            Start earning 18–24% annual returns with our proven iron ore mining operations. Your investment is protected by comprehensive security measures.
          </Typography>

          <Stack spacing={2} mb={4}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: '#f57c00' }}>
                <TrendingUpIcon />
              </Avatar>
              <Box>
                <Typography fontWeight={600}>18–24% Returns</Typography>
                <Typography variant="body2" color="#aaa">Quarterly Payouts</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: '#43a047' }}>
                <SecurityIcon />
              </Avatar>
              <Box>
                <Typography fontWeight={600}>100% Secure</Typography>
                <Typography variant="body2" color="#aaa">Escrow Protected</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: '#1e88e5' }}>
                <PublicIcon />
              </Avatar>
              <Box>
                <Typography fontWeight={600}>Global Operations</Typography>
                <Typography variant="body2" color="#aaa">Brazil & Australia</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: '#8e24aa' }}>
                <VerifiedUserIcon />
              </Avatar>
              <Box>
                <Typography fontWeight={600}>Fully Audited</Typography>
                <Typography variant="body2" color="#aaa">Third-Party Verified</Typography>
              </Box>
            </Stack>
          </Stack>

          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: '#f57c00', fontWeight: 700, borderRadius: 2 }}
          >
            Become an Investor Today →
          </Button>

          <Typography variant="caption" display="block" mt={2} color="#aaa">
            Minimum investment: 0,000 • No hidden fees • 90-day money-back guarantee
          </Typography>
        </Grid>

        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
            <Box
              component="img"
              src={MineLandscape}
              alt="Mine Landscape"
              sx={{ width: '100%', height: 320, objectFit: 'cover' }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'space-between',
                padding: 2,
              }}
            >
              <Box>
                <Typography fontWeight={600} color="orange">130M</Typography>
                <Typography variant="caption" color="#ccc">Tonnes Reserve</Typography>
              </Box>
              <Box>
                <Typography fontWeight={600} color="orange">$450M</Typography>
                <Typography variant="caption" color="#ccc">Assets Managed</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
