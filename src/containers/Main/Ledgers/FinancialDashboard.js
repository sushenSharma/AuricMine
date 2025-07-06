import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Visibility,
  Add,
  MonetizationOn,
  Assessment,
  Timeline,
  Security
} from '@mui/icons-material';

const FinancialDashboard = ({ currentUser, showPerformanceOnly = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Dummy bond data - replace with actual data
  const bondPortfolio = [
    {
      id: 'IRN001',
      name: 'Australia Pilbara Iron Bond',
      type: 'Premium',
      investment: 50000,
      currentValue: 53250,
      returns: 6.5,
      status: 'Active',
      maturity: '2025-12-15',
      riskLevel: 'Low',
      region: 'Australia'
    },
    {
      id: 'IRN002',
      name: 'Brazil Minas Gerais Bond',
      type: 'Growth',
      investment: 75000,
      currentValue: 81750,
      returns: 9.0,
      status: 'Active',
      maturity: '2026-06-20',
      riskLevel: 'Medium',
      region: 'Brazil'
    },
    {
      id: 'IRN003',
      name: 'India Goa Iron Venture',
      type: 'Starter',
      investment: 25000,
      currentValue: 26875,
      returns: 7.5,
      status: 'Active',
      maturity: '2024-09-10',
      riskLevel: 'Low',
      region: 'India'
    },
    {
      id: 'IRN004',
      name: 'South Africa Mining Bond',
      type: 'Premium',
      investment: 95000,
      currentValue: 104500,
      returns: 10.0,
      status: 'Maturing',
      maturity: '2024-03-30',
      riskLevel: 'High',
      region: 'South Africa'
    }
  ];

  const monthlyPerformance = [
    { month: 'Jan', earnings: 2450, target: 2500, achievement: 98 },
    { month: 'Feb', earnings: 2680, target: 2500, achievement: 107 },
    { month: 'Mar', earnings: 2850, target: 2600, achievement: 110 },
    { month: 'Apr', earnings: 3120, target: 2800, achievement: 111 },
    { month: 'May', earnings: 2950, target: 3000, achievement: 98 },
    { month: 'Jun', earnings: 3250, target: 3200, achievement: 102 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#4CAF50';
      case 'Maturing': return '#FF9800';
      case 'Completed': return '#2196F3';
      default: return '#757575';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'High': return '#F44336';
      default: return '#757575';
    }
  };

  const totalInvestment = bondPortfolio.reduce((sum, bond) => sum + bond.investment, 0);
  const totalCurrentValue = bondPortfolio.reduce((sum, bond) => sum + bond.currentValue, 0);
  const totalReturns = totalCurrentValue - totalInvestment;
  const avgReturns = (totalReturns / totalInvestment * 100).toFixed(2);

  if (showPerformanceOnly) {
    return (
      <Box>
        <Grid container spacing={3}>
          {/* Performance Overview */}
          <Grid item xs={12}>
            <Card
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: '#FFA500', mb: 3, fontWeight: 600 }}>
                  Performance Analytics
                </Typography>
                <Grid container spacing={3}>
                  {monthlyPerformance.map((month, index) => (
                    <Grid item xs={6} md={2} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#FFA500', fontWeight: 'bold' }}>
                          ${month.earnings.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#e0e0e0', mb: 1 }}>
                          {month.month} 2024
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={month.achievement}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: month.achievement >= 100 ? '#4CAF50' : '#FF9800',
                              borderRadius: 4
                            }
                          }}
                        />
                        <Typography variant="caption" sx={{ color: '#bbb' }}>
                          {month.achievement}% of target
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Portfolio Overview */}
        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#FFA500', fontWeight: 600 }}>
                  Bond Portfolio
                </Typography>
                <Button
                  startIcon={<Add />}
                  sx={{
                    background: 'linear-gradient(135deg, #FF4D4C 0%, #FFA500 100%)',
                    color: '#fff',
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                >
                  New Bond
                </Button>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Bond</TableCell>
                      <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Investment</TableCell>
                      <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Current Value</TableCell>
                      <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Returns</TableCell>
                      <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Status</TableCell>
                      <TableCell sx={{ color: '#e0e0e0', fontWeight: 600 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bondPortfolio.map((bond) => (
                      <TableRow key={bond.id}>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ color: '#FFA500', fontWeight: 600 }}>
                              {bond.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#bbb' }}>
                              {bond.id} • {bond.region}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ color: '#e0e0e0' }}>
                            ${bond.investment.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ color: '#e0e0e0' }}>
                            ${bond.currentValue.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {bond.returns > 0 ? (
                              <TrendingUp sx={{ color: '#4CAF50', fontSize: '1rem' }} />
                            ) : (
                              <TrendingDown sx={{ color: '#F44336', fontSize: '1rem' }} />
                            )}
                            <Typography sx={{ color: bond.returns > 0 ? '#4CAF50' : '#F44336' }}>
                              {bond.returns > 0 ? '+' : ''}{bond.returns}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={bond.status}
                            size="small"
                            sx={{
                              bgcolor: `${getStatusColor(bond.status)}20`,
                              color: getStatusColor(bond.status),
                              border: `1px solid ${getStatusColor(bond.status)}`
                            }}
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            sx={{ color: '#FFA500' }}
                          >
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Portfolio Summary */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textAlign: 'center'
                }}
              >
                <CardContent>
                  <MonetizationOn sx={{ color: '#FFA500', fontSize: '3rem', mb: 2 }} />
                  <Typography variant="h4" sx={{ color: '#FFA500', fontWeight: 'bold', mb: 1 }}>
                    ${totalCurrentValue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#e0e0e0', mb: 2 }}>
                    Total Portfolio Value
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                    <TrendingUp sx={{ color: '#4CAF50', fontSize: '1.2rem' }} />
                    <Typography sx={{ color: '#4CAF50', fontWeight: 600 }}>
                      +{avgReturns}% Total Returns
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#FFA500', mb: 2, fontWeight: 600 }}>
                    Portfolio Distribution
                  </Typography>
                  {bondPortfolio.map((bond, index) => (
                    <Box key={bond.id} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                          {bond.region}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#FFA500' }}>
                          {((bond.investment / totalInvestment) * 100).toFixed(1)}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(bond.investment / totalInvestment) * 100}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: ['#FF4D4C', '#FFA500', '#4CAF50', '#2196F3'][index % 4],
                            borderRadius: 3
                          }
                        }}
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#FFA500', mb: 2, fontWeight: 600 }}>
                    Risk Assessment
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                      Portfolio Risk Level
                    </Typography>
                    <Chip
                      label="Moderate"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255, 152, 0, 0.2)',
                        color: '#FF9800',
                        border: '1px solid #FF9800'
                      }}
                      variant="outlined"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Security sx={{ color: '#4CAF50', fontSize: '1.2rem' }} />
                    <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                      Diversified across 4 regions
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Assessment sx={{ color: '#2196F3', fontSize: '1.2rem' }} />
                    <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                      Average maturity: 18 months
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinancialDashboard;