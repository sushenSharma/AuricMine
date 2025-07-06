import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  useTheme,
  useMediaQuery,
  IconButton,
  Fab
} from "@mui/material";
import {
  Add,
  TrendingUp,
  MonetizationOn,
  Refresh
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import FinancialDashboard from "./FinancialDashboard";
import BondInvestmentModal from "./BondInvestmentModal";
import "./styles.css";

const SimplifiedHome = () => {
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { userSession } = useSelector(state => state.public);

  // Get user display name
  const getUserDisplayName = (user) => {
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.user_metadata?.name) return user.user_metadata.name;
    if (user?.email) return user.email.split('@')[0];
    return "User";
  };

  // Get user initials
  const getUserInitials = (user) => {
    const name = getUserDisplayName(user);
    if (name === "User") return "U";
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const currentUser = {
    name: getUserDisplayName(userSession?.user || userSession),
    avatar: getUserInitials(userSession?.user || userSession),
    totalInvestment: 245000,
    totalReturns: 18450
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const handleNewInvestment = () => {
    setShowInvestmentModal(true);
  };

  const handleCloseInvestmentModal = () => {
    setShowInvestmentModal(false);
  };

  const handleInvestmentSuccess = () => {
    handleRefresh();
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        minHeight: '100vh',
        color: '#fff',
        p: { xs: 2, md: 3 }
      }}
    >
      {/* Simplified Header */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: '#FF4D4C',
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}
              >
                {currentUser.avatar}
              </Avatar>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: '#FFA500',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Welcome, {currentUser.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#e0e0e0', mt: 0.5 }}>
                  AuricMine Dashboard
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
              <IconButton
                onClick={handleRefresh}
                sx={{
                  color: '#e0e0e0',
                  '&:hover': { color: '#FFA500' }
                }}
                disabled={refreshing}
              >
                <Refresh className={refreshing ? 'rotating' : ''} />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Simplified Stats - Only 2 Key Metrics */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 165, 0, 0.3)',
                borderRadius: 2
              }}
            >
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <MonetizationOn sx={{ color: '#FFA500', fontSize: '1.8rem' }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#FFA500', fontWeight: 'bold', mb: 0 }}>
                      ₹{currentUser.totalInvestment.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                      Total Investment
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                borderRadius: 2
              }}
            >
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <TrendingUp sx={{ color: '#4CAF50', fontSize: '1.8rem' }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 'bold', mb: 0 }}>
                      +₹{currentUser.totalReturns.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                      Total Returns
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Main Dashboard Content */}
      <Box sx={{ mt: 3 }}>
        <FinancialDashboard currentUser={currentUser} simplified={true} />
      </Box>

      {/* Floating Action Button for New Investment */}
      <Fab
        onClick={handleNewInvestment}
        sx={{
          position: 'fixed',
          bottom: { xs: 16, md: 24 },
          right: { xs: 16, md: 24 },
          background: 'linear-gradient(135deg, #FF4D4C 0%, #FFA500 100%)',
          color: '#fff',
          '&:hover': {
            background: 'linear-gradient(135deg, #FFA500 0%, #FF4D4C 100%)'
          }
        }}
      >
        <Add />
      </Fab>

      {/* Investment Modal */}
      <BondInvestmentModal
        open={showInvestmentModal}
        onClose={handleCloseInvestmentModal}
        onSuccess={handleInvestmentSuccess}
      />
    </Box>
  );
};

export default SimplifiedHome;