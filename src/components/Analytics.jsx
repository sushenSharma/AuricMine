import React from 'react';
import { BarChart, LineChart, Gauge, PieChart,gaugeClasses } from '@mui/x-charts';
import { Box, Typography, Grid, Divider, Stack, CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const Analytics = () => {
  const theme = createTheme({
    palette: {
      background: {
        default: '#000' // Black background
      },
      text: {
        primary: '#fff', // White text
      }
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: '#000', // Black background for Paper components
          }
        }
      }
    }
  });

  const gaugesData = [
    { value: 46, label: 'ROCE', description: '46%' },
    { value: 73, label: 'Trade Accuracy', description: '73%', startAngle: -90, endAngle: 90 }
  ];

  const barData = [24, 13, 98, 39, 48, 38, 43];
  const profitLossData = [4000, 3000, 2000, 2780, -1890, 2390, 3490];
  const xLabels = ['TaTa', 'Krsnaa', 'Reliance', 'Mahindra', 'Bajaj', 'E2E', 'MMForg'];

  const lineSeriesData = {
    totalFundValue: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
    profitLoss: [4000, 3000, 2000, 2780, 1890, 2390, 3490]
  };

  const pieChartData = [
    { id: 0, value: 10, label: 'Mid Cap' },
    { id: 1, value: 15, label: 'Large Cap' },
    { id: 2, value: 20, label: 'Small Cap' }
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ backgroundColor: "#000" }}>
        <Grid container spacing={2}>
          {/* Top Row Charts */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor:"#56585c" }}>
              <BarChart
                width={500}
                height={300}
                series={[
                  {
                    data: barData,
                    label: 'Number of Days Hold',
                    yAxisKey: 'leftAxisId',
                    color:"#db5432"
                  },
                  {
                    data: profitLossData,
                    label: 'Profit/Loss',
                    yAxisKey: 'rightAxisId',
                    color:"#77cc2d"
                  }
                ]}
                xAxis={[{ data: xLabels, scaleType: 'band' }]}
                yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
              />
            </Box>
            <Typography variant="h6" style={{
  background: 'linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozBackgroundClip: 'text',
  MozTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
  textAlign: 'center',
  fontWeight: 'bold' 
}}>Investment Duration vs. Profit/Loss</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor:"#56585c" }}>
              <LineChart
                width={500}
                height={300}
                series={[
                  { data: lineSeriesData.totalFundValue, label: 'Total Fund Value',  color:"#db5432" },
                  { data: lineSeriesData.profitLoss, label: 'Profit/Loss',  color:"#77cc2d" },
                ]}
                xAxis={[{ data: ['10th Jan', '15th Jan', '20th Feb', '3rd Mar', '15th Mar', '28th Mar', '6th Apr'], scaleType: 'point' }]}
              />
            </Box>
            <Typography variant="h6" style={{
  background: 'linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozBackgroundClip: 'text',
  MozTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
  textAlign: 'center',
  fontWeight: 'bold' 
}}>
  Fund Value and Profit/Loss Over Time
</Typography>
          </Grid>

          .
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: "#000" }} />
          </Grid>

          {/* Bottom Row Charts */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor:"#56585c" }}>
              <Stack direction="row" spacing={2} alignItems="center">
                {gaugesData.map((gauge, index) => (
                  <Box key={index} sx={{ width: 300, textAlign: 'center' }}>
                    <Gauge
                      width={300}
                      height={300}
                      value={gauge.value}
                      startAngle={gauge.startAngle || 0}
                      endAngle={gauge.endAngle || 360}
                      sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 40,
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: '#52b202',
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                          fill: theme.palette.text.disabled,
                        },
                      })}
                    />
                    <Typography variant="h6">{gauge.label}</Typography>
                    <Typography variant="caption">{gauge.description}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Typography variant="h6" style={{
  background: 'linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozBackgroundClip: 'text',
  MozTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
  textAlign: 'center',
  fontWeight: 'bold' 
}}>Key Performance Indicators</Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor:"#56585c" }}>
              <PieChart
                series={[{ data: pieChartData }]}
                width={500}
                height={300}
              />
            </Box>
            <Typography variant="h6" style={{
  background: 'linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  MozBackgroundClip: 'text',
  MozTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
  textAlign: 'center',
  fontWeight: 'bold' 
}}>Asset Allocation</Typography>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Analytics;
