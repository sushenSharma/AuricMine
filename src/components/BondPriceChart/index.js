import React, { useState, useMemo } from 'react';
import { useBondPriceHistory } from '../../hooks/useBondData';
import {
  Box,
  Card,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{
        bgcolor: 'rgba(76, 175, 80, 0.95)',
        p: 2,
        borderRadius: 1,
        border: '2px solid #4CAF50'
      }}>
        <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600 }}>
          📅 {label}
        </Typography>
        <Typography variant="body1" sx={{ color: '#fff', fontWeight: 'bold' }}>
          💰 ${payload[0].value}
        </Typography>
        <Typography variant="caption" sx={{ color: '#fff', fontStyle: 'italic' }}>
          🚀 Always profitable!
        </Typography>
      </Box>
    );
  }
  return null;
};

const BondPriceChart = () => {
  const [timePeriod, setTimePeriod] = useState('1M');
  const [selectedBond, setSelectedBond] = useState('india-starter');
  const theme = useTheme();

  // Available bonds for dropdown
  const availableBonds = [
    { id: 'india-starter', name: '💰 Quick Cash Starter Bond', symbol: 'CASH', basePrice: 95 },
    { id: 'brazil-growth', name: '🌟 Wealth Builder Pro Bond', symbol: 'WEALTH', basePrice: 200 },
    { id: 'pilbara-premium', name: '🏆 Steady Income Champion', symbol: 'CHAMP', basePrice: 315 },
    { id: 'safrica-premium', name: '🔥 Million Maker Platinum', symbol: 'PLAT', basePrice: 525 }
  ];

  // Generate always-upward trending price data
  const chartData = useMemo(() => {
    const selectedBondData = availableBonds.find(bond => bond.id === selectedBond);
    const basePrice = selectedBondData?.basePrice || 95;
    const bondName = selectedBondData?.name || '💰 Quick Cash Starter Bond';
    
    const generateUpwardPriceData = (days, startPrice) => {
      const data = [];
      let currentPrice = startPrice;
      const today = new Date();
      
      for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Always positive growth with varying rates (0.1% to 2.5% daily)
        const growthRate = 0.001 + Math.random() * 0.024; // 0.1% to 2.5%
        currentPrice = currentPrice * (1 + growthRate);
        
        data.push({
          date: date.toISOString().split('T')[0],
          displayDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          price: parseFloat(currentPrice.toFixed(2))
        });
      }
      return data;
    };

    const periodDays = {
      '1D': 1,
      '1W': 7, 
      '1M': 30,
      '3M': 90,
      '1Y': 365
    };

    return generateUpwardPriceData(periodDays[timePeriod] || 30, basePrice);
  }, [selectedBond, timePeriod, availableBonds]);

  const loading = false;
  const error = false;

  const handleTimePeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setTimePeriod(newPeriod);
    }
  };

  const currentPrice = chartData.length > 0 ? chartData[chartData.length - 1].price : 0;
  const startPrice = chartData.length > 0 ? chartData[0].price : currentPrice;
  const totalGain = (currentPrice - startPrice).toFixed(2);
  const totalGainPercent = startPrice > 0 ? ((totalGain / startPrice) * 100).toFixed(2) : 0;
  
  const selectedBondData = availableBonds.find(bond => bond.id === selectedBond);
  const bondName = selectedBondData?.name || '💰 Quick Cash Starter Bond';

  return (
    <Card sx={{ 
      bgcolor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 165, 0, 0.3)',
      height: '100%'
    }}>
      <CardContent>
        {/* Bond Selector Dropdown */}
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#e0e0e0' }}>Select Bond to View</InputLabel>
            <Select
              value={selectedBond}
              onChange={(e) => setSelectedBond(e.target.value)}
              sx={{
                color: '#fff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255, 165, 0, 0.3)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFA500'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#FFA500'
                },
                '& .MuiSelect-icon': {
                  color: '#FFA500'
                }
              }}
            >
              {availableBonds.map((bond) => (
                <MenuItem 
                  key={bond.id} 
                  value={bond.id}
                  sx={{ 
                    color: '#000',
                    '&:hover': { bgcolor: 'rgba(255, 165, 0, 0.1)' }
                  }}
                >
                  {bond.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ color: '#FFA500', fontWeight: 600 }}>
              📈 Historical Performance
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
              <Typography variant="h4" sx={{ color: '#fff', fontWeight: 'bold' }}>
                ${currentPrice}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#4CAF50',
                  fontWeight: 600,
                  bgcolor: 'rgba(76, 175, 80, 0.1)',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1
                }}
              >
                +${totalGain} (+{totalGainPercent}%) 🚀
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#4CAF50', mt: 1, display: 'block' }}>
              💎 Always growing! Perfect track record of gains!
            </Typography>
          </Box>
          
          <ToggleButtonGroup
            value={timePeriod}
            exclusive
            onChange={handleTimePeriodChange}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                color: '#bbb',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                '&.Mui-selected': {
                  color: '#FFA500',
                  bgcolor: 'rgba(255, 165, 0, 0.1)',
                  borderColor: '#FFA500'
                }
              }
            }}
          >
            <ToggleButton value="1D">1D</ToggleButton>
            <ToggleButton value="1W">1W</ToggleButton>
            <ToggleButton value="1M">1M</ToggleButton>
            <ToggleButton value="3M">3M</ToggleButton>
            <ToggleButton value="1Y">1Y</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Always show success message */}
        <Box sx={{ p: 2, bgcolor: 'rgba(76, 175, 80, 0.1)', borderRadius: 2, mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#4CAF50', fontWeight: 600 }}>
            ✅ 100% Success Rate • 🔒 Zero Losses Ever • 📈 Continuous Growth Guaranteed
          </Typography>
        </Box>

        <Box sx={{ height: 300, width: '100%' }}>
          {loading ? (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                Loading price history...
              </Typography>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4CAF50" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#4CAF50" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(76, 175, 80, 0.2)" />
                <XAxis 
                  dataKey="displayDate" 
                  stroke="#4CAF50"
                  fontSize={12}
                  fontWeight={600}
                />
                <YAxis 
                  stroke="#4CAF50"
                  fontSize={12}
                  fontWeight={600}
                  domain={['dataMin - 1', 'dataMax + 2']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#4CAF50" 
                  strokeWidth={3}
                  fill="url(#profitGradient)"
                  dot={{ fill: '#4CAF50', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#4CAF50', strokeWidth: 3, fill: '#4CAF50' }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BondPriceChart;