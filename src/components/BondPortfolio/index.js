import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useUserBondHoldings } from '../../hooks/useBondData';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  Divider,
  IconButton
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  ShowChart,
  Add,
  Remove
} from '@mui/icons-material';

// Mock bond data with price history
const mockBondData = {
  'india-starter': {
    id: 'india-starter',
    name: 'India Goa Starter Iron Bond',
    symbol: 'IGIB',
    currentPrice: 102.5,
    change: +2.5,
    changePercent: 2.44,
    userHoldings: 5,
    totalValue: 512.5,
    priceHistory: [
      { date: '2024-01-01', price: 100 },
      { date: '2024-02-01', price: 98.5 },
      { date: '2024-03-01', price: 99.2 },
      { date: '2024-04-01', price: 101.1 },
      { date: '2024-05-01', price: 100.8 },
      { date: '2024-06-01', price: 102.5 }
    ]
  },
  'brazil-growth': {
    id: 'brazil-growth',
    name: 'Brazil Minas Gerais Growth Bond',
    symbol: 'BMGB',
    currentPrice: 205.8,
    change: -3.2,
    changePercent: -1.53,
    userHoldings: 2,
    totalValue: 411.6,
    priceHistory: [
      { date: '2024-01-01', price: 200 },
      { date: '2024-02-01', price: 203.1 },
      { date: '2024-03-01', price: 207.5 },
      { date: '2024-04-01', price: 209.0 },
      { date: '2024-05-01', price: 208.2 },
      { date: '2024-06-01', price: 205.8 }
    ]
  },
  'pilbara-premium': {
    id: 'pilbara-premium',
    name: 'Australia Pilbara Premium Iron Bond',
    symbol: 'APIB',
    currentPrice: 315.6,
    change: +5.6,
    changePercent: 1.81,
    userHoldings: 1,
    totalValue: 315.6,
    priceHistory: [
      { date: '2024-01-01', price: 300 },
      { date: '2024-02-01', price: 305.2 },
      { date: '2024-03-01', price: 308.8 },
      { date: '2024-04-01', price: 310.0 },
      { date: '2024-05-01', price: 312.4 },
      { date: '2024-06-01', price: 315.6 }
    ]
  }
};

const BondPortfolio = ({ onBuyMore, onSell }) => {
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const { userSession } = useSelector(state => state.public);
  const { holdings: bonds, loading, error } = useUserBondHoldings();

  useEffect(() => {
    const total = bonds.reduce((sum, bond) => sum + bond.totalValue, 0);
    setTotalPortfolioValue(total);
  }, [bonds]);

  const formatCurrency = (amount) => `$${amount.toLocaleString()}`;

  const getBondColor = (bondId) => {
    const colors = {
      'india-starter': '#2196F3',
      'brazil-growth': '#FF9800',
      'pilbara-premium': '#4CAF50'
    };
    return colors[bondId] || '#757575';
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ color: '#FFA500', mb: 3, fontWeight: 600 }}>
        My Bond Portfolio
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
            Loading your portfolio...
          </Typography>
        </Box>
      )}

      {error && (
        <Box sx={{ p: 2, bgcolor: 'rgba(244, 67, 54, 0.1)', borderRadius: 2, mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#f44336' }}>
            Unable to load portfolio data. Showing sample portfolio for demonstration.
          </Typography>
        </Box>
      )}

      {/* Portfolio Summary */}
      <Card sx={{ 
        bgcolor: 'rgba(255, 165, 0, 0.1)', 
        border: '1px solid rgba(255, 165, 0, 0.3)',
        mb: 3 
      }}>
        <CardContent>
          <Typography variant="h4" sx={{ color: '#FFA500', fontWeight: 'bold' }}>
            {formatCurrency(totalPortfolioValue)}
          </Typography>
          <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
            Total Portfolio Value
          </Typography>
        </CardContent>
      </Card>

      {/* Bond Holdings */}
      <Grid container spacing={3}>
        {bonds.map((bond) => (
          <Grid item xs={12} md={6} lg={4} key={bond.id}>
            <Card sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${getBondColor(bond.id)}30`,
              height: '100%'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: getBondColor(bond.id),
                      width: 40,
                      height: 40,
                      fontSize: '0.9rem'
                    }}
                  >
                    {bond.symbol}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ color: '#fff', fontSize: '1rem' }}>
                      {bond.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#bbb' }}>
                      {bond.symbol}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: '#bbb' }}>Current Price</Typography>
                    <Typography variant="h6" sx={{ color: '#fff' }}>
                      {formatCurrency(bond.currentPrice)}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: '#bbb' }}>Change</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {bond.change >= 0 ? (
                        <TrendingUp sx={{ color: '#4CAF50', fontSize: '1rem' }} />
                      ) : (
                        <TrendingDown sx={{ color: '#f44336', fontSize: '1rem' }} />
                      )}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: bond.change >= 0 ? '#4CAF50' : '#f44336',
                          fontWeight: 600 
                        }}
                      >
                        {bond.change >= 0 ? '+' : ''}{bond.changePercent.toFixed(2)}%
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: '#bbb' }}>Holdings</Typography>
                    <Typography variant="h6" sx={{ color: '#FFA500' }}>
                      {bond.userHoldings} bonds
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{ color: '#bbb' }}>Total Value</Typography>
                    <Typography variant="h6" sx={{ color: '#4CAF50' }}>
                      {formatCurrency(bond.totalValue)}
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Add />}
                    onClick={() => onBuyMore(bond)}
                    sx={{
                      borderColor: '#4CAF50',
                      color: '#4CAF50',
                      '&:hover': {
                        borderColor: '#4CAF50',
                        bgcolor: 'rgba(76, 175, 80, 0.1)'
                      }
                    }}
                  >
                    Buy
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Remove />}
                    onClick={() => onSell(bond)}
                    sx={{
                      borderColor: '#f44336',
                      color: '#f44336',
                      '&:hover': {
                        borderColor: '#f44336',
                        bgcolor: 'rgba(244, 67, 54, 0.1)'
                      }
                    }}
                  >
                    Sell
                  </Button>
                  <IconButton
                    size="small"
                    sx={{ color: '#FFA500' }}
                    onClick={() => window.open(`#/bond/${bond.id}`, '_blank')}
                  >
                    <ShowChart />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BondPortfolio;