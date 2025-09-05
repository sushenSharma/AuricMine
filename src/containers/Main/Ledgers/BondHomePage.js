import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Tab,
  Tabs,
  useTheme,
  useMediaQuery,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import {
  Refresh,
  AccountBalance,
  TrendingUp,
  MonetizationOn
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import BondSelection from "../../../components/BondSelection";
import BondPortfolio from "../../../components/BondPortfolio";
import BondPriceChart from "../../../components/BondPriceChart";
import BondInvestmentModal from "./BondInvestmentModal";
import InvestorActivity from "../../../components/InvestorActivity";
import { supabase } from "../../../config/index_supabase";

const BondHomePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [selectedBondForModal, setSelectedBondForModal] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });
  const [userHasInvestments, setUserHasInvestments] = useState(true); // This would come from API/database
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { userSession } = useSelector(state => state.public);

  // Real user portfolio data
  const [userStats, setUserStats] = useState({
    totalInvestment: 0,
    totalReturns: 0,
    totalBonds: 0,
    portfolioValue: 0,
    loading: true
  });

  // Get user display name
  const getUserDisplayName = (user) => {
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.user_metadata?.name) return user.user_metadata.name;
    if (user?.email) return user.email.split('@')[0];
    return "Investor";
  };

  // Get user initials
  const getUserInitials = (user) => {
    const name = getUserDisplayName(user);
    if (name === "Investor") return "I";
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Function to fetch real user portfolio data
  const fetchUserPortfolioData = async () => {
    if (!userSession?.user) {
      console.log('No user session found');
      setUserStats({
        totalInvestment: 0,
        totalReturns: 0,
        totalBonds: 0,
        portfolioValue: 0,
        loading: false
      });
      return;
    }

    try {
      console.log('Fetching portfolio data for user:', userSession.user.id);
      
      // Fetch successful payments (investments) for the user
      let { data: payments, error: paymentsError } = await supabase
        .from('stripe_payments')
        .select('*')
        .eq('user_id', userSession.user.id)
        .eq('status', 'succeeded');

      if (paymentsError) {
        console.error('Error fetching user payments:', paymentsError);
        // Fallback to anonymous payments if user_id fails
        const { data: anonymousPayments, error: anonymousError } = await supabase
          .from('stripe_payments')
          .select('*')
          .eq('user_email', userSession.user.email)
          .eq('status', 'succeeded');
        
        if (anonymousError) {
          console.error('Error fetching anonymous payments:', anonymousError);
          setUserStats(prev => ({ ...prev, loading: false }));
          return;
        }
        
        payments = anonymousPayments;
      }

      console.log('Found payments:', payments);

      if (!payments || payments.length === 0) {
        setUserStats({
          totalInvestment: 0,
          totalReturns: 0,
          totalBonds: 0,
          portfolioValue: 0,
          loading: false
        });
        setUserHasInvestments(false);
        return;
      }

      // Calculate portfolio statistics from real payments
      const totalInvested = payments.reduce((sum, payment) => sum + (payment.amount / 100), 0); // Convert from cents
      const totalBonds = payments.length;
      
      // For now, assume 6-8% annual returns (average 7%) for calculation
      // In the future, this should be calculated based on actual bond performance
      const averageReturnRate = 0.07; // 7% annual return
      const averageHoldingTime = 6; // Assume average 6 months holding
      const estimatedReturns = totalInvested * averageReturnRate * (averageHoldingTime / 12);
      const portfolioValue = totalInvested + estimatedReturns;

      setUserStats({
        totalInvestment: parseFloat(totalInvested.toFixed(2)),
        totalReturns: parseFloat(estimatedReturns.toFixed(2)),
        totalBonds: totalBonds,
        portfolioValue: parseFloat(portfolioValue.toFixed(2)),
        loading: false
      });
      
      setUserHasInvestments(totalBonds > 0);

      console.log('Portfolio stats calculated:', {
        totalInvested: totalInvested.toFixed(2),
        totalReturns: estimatedReturns.toFixed(2),
        totalBonds,
        portfolioValue: portfolioValue.toFixed(2)
      });

    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setUserStats(prev => ({ ...prev, loading: false }));
    }
  };

  // Load portfolio data when component mounts or user changes
  useEffect(() => {
    fetchUserPortfolioData();
  }, [userSession?.user?.id]);

  const currentUser = {
    name: getUserDisplayName(userSession?.user || userSession) || "Investor",
    avatar: getUserInitials(userSession?.user || userSession) || "I"
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchUserPortfolioData();
    setRefreshTrigger(prev => prev + 1); // Trigger investor activity refresh
    setRefreshing(false);
    setNotification({
      open: true,
      message: 'Portfolio data refreshed successfully!',
      severity: 'success'
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInvestFromSelection = (investmentData) => {
    // This would trigger the investment modal with pre-selected bond
    setSelectedBondForModal(investmentData.bond);
    setShowInvestmentModal(true);
  };

  const handleBuyMore = (bond) => {
    setSelectedBondForModal(bond);
    setShowInvestmentModal(true);
  };

  const handleSell = (bond) => {
    setNotification({
      open: true,
      message: `Sell functionality for ${bond.name} - Coming Soon!`,
      severity: 'info'
    });
  };

  const handleInvestmentSuccess = async () => {
    setShowInvestmentModal(false);
    setSelectedBondForModal(null);
    
    // Refresh portfolio data with real user data
    await fetchUserPortfolioData();
    setRefreshTrigger(prev => prev + 1); // Trigger investor activity refresh
    
    setNotification({
      open: true,
      message: 'Investment completed successfully!',
      severity: 'success'
    });
    
    // Switch to portfolio tab if this is user's first investment
    if (!userHasInvestments) {
      setActiveTab(1); // Switch to portfolio tab
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  // Determine if user is new investor (no current investments)
  const isNewInvestor = !userHasInvestments || userStats.totalBonds === 0;

  // Show loading if user session is not loaded yet
  if (!userSession && !currentUser.name) {
    return (
      <Box
        sx={{
          background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
          minHeight: '100vh',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography variant="h6" sx={{ color: '#FFA500' }}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        minHeight: '100vh',
        color: '#fff',
        p: { xs: 2, md: 3 }
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: '#FF4D4C',
                  fontSize: '1.4rem',
                  fontWeight: 'bold'
                }}
              >
                {currentUser.avatar}
              </Avatar>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#FFA500',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  Welcome back, {currentUser.name}
                </Typography>
                <Typography variant="h6" sx={{ color: '#e0e0e0', mt: 0.5 }}>
                  {isNewInvestor ? 'Ready to start your bond investment journey?' : 'Your Bond Investment Dashboard'}
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

        {/* Stats Cards - Only show if user has investments */}
        {!isNewInvestor && (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{
                bgcolor: 'rgba(255, 165, 0, 0.1)',
                border: '1px solid rgba(255, 165, 0, 0.3)',
                borderRadius: 2
              }}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <MonetizationOn sx={{ color: '#FFA500', fontSize: '2rem' }} />
                    <Box>
                      <Typography variant="h5" sx={{ color: '#FFA500', fontWeight: 'bold' }}>
                        {userStats.loading ? '...' : `$${userStats.portfolioValue.toLocaleString()}`}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                        Portfolio Value
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{
                bgcolor: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                borderRadius: 2
              }}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TrendingUp sx={{ color: '#4CAF50', fontSize: '2rem' }} />
                    <Box>
                      <Typography variant="h5" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                        {userStats.loading ? '...' : `+$${userStats.totalReturns.toLocaleString()}`}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                        Total Returns
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{
                bgcolor: 'rgba(33, 150, 243, 0.1)',
                border: '1px solid rgba(33, 150, 243, 0.3)',
                borderRadius: 2
              }}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccountBalance sx={{ color: '#2196F3', fontSize: '2rem' }} />
                    <Box>
                      <Typography variant="h5" sx={{ color: '#2196F3', fontWeight: 'bold' }}>
                        {userStats.loading ? '...' : userStats.totalBonds}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                        Total Bonds
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{
                bgcolor: 'rgba(156, 39, 176, 0.1)',
                border: '1px solid rgba(156, 39, 176, 0.3)',
                borderRadius: 2
              }}>
                <CardContent sx={{ py: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <MonetizationOn sx={{ color: '#9C27B0', fontSize: '2rem' }} />
                    <Box>
                      <Typography variant="h5" sx={{ color: '#9C27B0', fontWeight: 'bold' }}>
                        {userStats.loading ? '...' : `$${userStats.totalInvestment.toLocaleString()}`}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                        Total Invested
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Investor Activity Section - Always visible */}
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <InvestorActivity refreshTrigger={refreshTrigger} />
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Main Content */}
      <Box>
        {/* Tabs for navigation */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            '& .MuiTab-root': {
              color: '#bbb',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem'
            },
            '& .MuiTab-root.Mui-selected': {
              color: '#FFA500'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#FFA500'
            }
          }}
        >
          <Tab label={isNewInvestor ? "Start Investing" : "Available Bonds"} />
          {!isNewInvestor && <Tab label="My Portfolio" />}
          {!isNewInvestor && <Tab label="Price Charts" />}
        </Tabs>

        {/* Tab Content */}
        <Box>
          {activeTab === 0 && (
            <BondSelection 
              onInvest={handleInvestFromSelection} 
              newInvestor={isNewInvestor}
            />
          )}
          
          {activeTab === 1 && !isNewInvestor && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <BondPortfolio 
                  onBuyMore={handleBuyMore}
                  onSell={handleSell}
                />
              </Grid>
            </Grid>
          )}
          
          {activeTab === 2 && !isNewInvestor && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <BondPriceChart />
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>

      {/* Investment Modal */}
      <BondInvestmentModal
        open={showInvestmentModal}
        onClose={() => setShowInvestmentModal(false)}
        onSuccess={handleInvestmentSuccess}
        preSelectedBond={selectedBondForModal}
      />

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BondHomePage;