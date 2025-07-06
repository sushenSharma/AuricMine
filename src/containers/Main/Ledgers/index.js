import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Tab,
  Tabs,
  Avatar,
  Chip,
  LinearProgress,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  Divider
} from "@mui/material";
import {
  Dashboard,
  AccountTree,
  TrendingUp,
  People,
  MonetizationOn,
  Assessment,
  Refresh,
  Visibility,
  Add,
  Person,
  GroupWork
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import UserHierarchyDashboard from "./UserHierarchyDashboard";
import FinancialDashboard from "./FinancialDashboard";
import TeamManagement from "./TeamManagement";
import BondInvestmentModal from "./BondInvestmentModal";
import "./styles.css";

const Ledgers = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { userSession } = useSelector(state => state.public);
  
  // Debug: Log the user session to see what data is available
  console.log("🔍 User Session Debug:", {
    userSession,
    userSessionUser: userSession?.user,
    userMetadata: userSession?.user?.user_metadata,
    appMetadata: userSession?.user?.app_metadata,
    identities: userSession?.user?.identities
  });

  // Get actual user data from session
  const getUserInitials = (user) => {
    // Try to get initials from actual name first
    if (user?.user_metadata?.full_name) {
      const nameParts = user.user_metadata.full_name.split(' ');
      if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      }
      return user.user_metadata.full_name.substring(0, 2).toUpperCase();
    }
    
    // Try Google/OAuth name fields
    if (user?.user_metadata?.name) {
      const nameParts = user.user_metadata.name.split(' ');
      if (nameParts.length >= 2) {
        return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
      }
      return user.user_metadata.name.substring(0, 2).toUpperCase();
    }
    
    // Try first and last name
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return (user.user_metadata.first_name[0] + user.user_metadata.last_name[0]).toUpperCase();
    }
    
    // Try identities data (for OAuth providers)
    if (user?.identities && user.identities.length > 0) {
      const identity = user.identities[0];
      if (identity.identity_data?.full_name) {
        const nameParts = identity.identity_data.full_name.split(' ');
        if (nameParts.length >= 2) {
          return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
        }
        return identity.identity_data.full_name.substring(0, 2).toUpperCase();
      }
      if (identity.identity_data?.name) {
        const nameParts = identity.identity_data.name.split(' ');
        if (nameParts.length >= 2) {
          return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
        }
        return identity.identity_data.name.substring(0, 2).toUpperCase();
      }
    }
    
    // Fallback to email-based initials
    if (!user?.email) return "U";
    const name = user.email.split('@')[0];
    const parts = name.split(/[._-]/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getUserDisplayName = (user) => {
    // Try to get the actual name from user metadata
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    
    // Try Google/OAuth name fields
    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }
    
    // Try first and last name combination
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    
    // Try just first name
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    
    // Try identities data (for OAuth providers)
    if (user?.identities && user.identities.length > 0) {
      const identity = user.identities[0];
      if (identity.identity_data?.full_name) {
        return identity.identity_data.full_name;
      }
      if (identity.identity_data?.name) {
        return identity.identity_data.name;
      }
    }
    
    // Try app metadata
    if (user?.app_metadata?.full_name) {
      return user.app_metadata.full_name;
    }
    
    // Fallback to email-based name
    if (!user?.email) return "User";
    const name = user.email.split('@')[0];
    const parts = name.split(/[._-]/);
    if (parts.length >= 2) {
      return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const currentUser = {
    name: getUserDisplayName(userSession?.user || userSession),
    role: "Senior Mine Director",
    level: "Level 3",
    avatar: getUserInitials(userSession?.user || userSession),
    email: userSession?.user?.email || userSession?.email || "user@ironore.com",
    joinDate: "January 2023",
    totalInvestment: 245000,
    totalReturns: 18450,
    activeBonds: 12,
    teamSize: 24,
    monthlyEarnings: 2850
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const handleNewInvestment = () => {
    setShowInvestmentModal(true);
  };

  const handleInvestmentSuccess = () => {
    // Refresh the dashboard data after successful investment
    handleRefresh();
    // You can also dispatch actions to update the user's portfolio
  };

  const handleCloseInvestmentModal = () => {
    setShowInvestmentModal(false);
  };

  const tabItems = [
    { label: "Dashboard", icon: <Dashboard /> },
    { label: "My Network", icon: <AccountTree /> },
    { label: "Team Management", icon: <GroupWork /> },
    { label: "Performance", icon: <Assessment /> }
  ];

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        minHeight: '100vh',
        color: '#fff',
        p: { xs: 2, md: 3 }
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: { xs: 60, md: 80 },
                  height: { xs: 60, md: 80 },
                  bgcolor: '#FF4D4C',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 'bold'
                }}
              >
                {currentUser.avatar}
              </Avatar>
              <Box>
                <Typography
                  variant={isMobile ? 'h5' : 'h4'}
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(45deg, #FF4D4C, #FFA500)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Welcome back, {currentUser.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                  <Chip
                    icon={<Person />}
                    label={currentUser.role}
                    sx={{
                      bgcolor: 'rgba(255, 165, 0, 0.2)',
                      color: '#FFA500',
                      borderColor: '#FFA500'
                    }}
                    variant="outlined"
                  />
                  <Chip
                    label={currentUser.level}
                    sx={{
                      bgcolor: 'rgba(255, 77, 76, 0.2)',
                      color: '#FF4D4C',
                      borderColor: '#FF4D4C'
                    }}
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
              <IconButton
                onClick={handleRefresh}
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFA500',
                  '&:hover': { bgcolor: 'rgba(255, 165, 0, 0.2)' }
                }}
                disabled={refreshing}
              >
                <Refresh className={refreshing ? 'rotating' : ''} />
              </IconButton>
              <Button
                startIcon={<Add />}
                onClick={handleNewInvestment}
                sx={{
                  background: 'linear-gradient(135deg, #FF4D4C 0%, #FFA500 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: 2,
                  px: 3,
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FFA500 0%, #FF4D4C 100%)'
                  }
                }}
              >
                {isMobile ? 'Invest' : 'New Investment'}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Quick Stats Cards */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center'
              }}
            >
              <CardContent>
                <MonetizationOn sx={{ color: '#FFA500', fontSize: '2rem', mb: 1 }} />
                <Typography variant="h6" sx={{ color: '#FFA500', fontWeight: 'bold' }}>
                  ₹{currentUser.totalInvestment.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                  Total Investment
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center'
              }}
            >
              <CardContent>
                <TrendingUp sx={{ color: '#4CAF50', fontSize: '2rem', mb: 1 }} />
                <Typography variant="h6" sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
                  +₹{currentUser.totalReturns.toLocaleString()}
                </Typography>
                <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                  Total Returns
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center'
              }}
            >
              <CardContent>
                <Assessment sx={{ color: '#2196F3', fontSize: '2rem', mb: 1 }} />
                <Typography variant="h6" sx={{ color: '#2196F3', fontWeight: 'bold' }}>
                  {currentUser.activeBonds}
                </Typography>
                <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                  Active Bonds
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} md={3}>
            <Card
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center'
              }}
            >
              <CardContent>
                <People sx={{ color: '#9C27B0', fontSize: '2rem', mb: 1 }} />
                <Typography variant="h6" sx={{ color: '#9C27B0', fontWeight: 'bold' }}>
                  {currentUser.teamSize}
                </Typography>
                <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                  Team Members
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Navigation Tabs */}
      <Card
        sx={{
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          mb: 3
        }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'fullWidth'}
          scrollButtons={isMobile ? 'auto' : false}
          TabIndicatorProps={{
            style: {
              backgroundColor: '#FF4D4C',
              height: '3px'
            }
          }}
          sx={{
            '& .MuiTab-root': {
              color: '#e0e0e0',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              minHeight: 64,
              '&.Mui-selected': {
                color: '#FF4D4C'
              }
            }
          }}
        >
          {tabItems.map((tab, index) => (
            <Tab
              key={index}
              icon={tab.icon}
              label={tab.label}
              iconPosition="start"
            />
          ))}
        </Tabs>
      </Card>

      {/* Tab Content */}
      <Box>
        {activeTab === 0 && <FinancialDashboard currentUser={currentUser} />}
        {activeTab === 1 && <UserHierarchyDashboard currentUser={currentUser} />}
        {activeTab === 2 && <TeamManagement currentUser={currentUser} />}
        {activeTab === 3 && <FinancialDashboard currentUser={currentUser} showPerformanceOnly={true} />}
      </Box>

      {/* Investment Modal */}
      <BondInvestmentModal
        open={showInvestmentModal}
        onClose={handleCloseInvestmentModal}
        onSuccess={handleInvestmentSuccess}
      />
    </Box>
  );
};

export default Ledgers;
