import React from 'react';
import { BarChart, LineChart, Gauge, PieChart } from '@mui/x-charts';
import { Box, Typography, useTheme, Grid, Divider, Stack } from '@mui/material';

const Analytics = ({ data }) => {
  const theme = useTheme();

  // Example gauge data
  const gaugesData = [
    { value: 46, label: 'ROCE', description: '46%' },
    { value: 73, label: 'Trade Accuracy', description: '73%', startAngle: -90, endAngle: 90 }
  ];
    // Background color
    const bgColor = "#cfcecc"; 
    const uData = [4000, 3000, 2000, 2780, -1890, 2390, 3490];
    const pData = [24, 13, 98, 39, 48, 38, 43];

const xLabels = [
  'TaTa',
  'Krsnaa',
  'Reliance',
  'Mahindra',
  'Bajaj',
  'E2E',
  'MMForg',
];


  return (
    <div style={{ backgroundColor: bgColor, padding: '20px' }}>
      <Grid container spacing={2}>
        {/* Top Row Charts */}
        <Grid item xs={12} sm={6} sx={{paddingRight:35}}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <BarChart
            width={500}
            height={300}
            series={[
                {
                data: pData,
                label: 'Number of Days Hold',
                id: 'pvId',

                yAxisKey: 'leftAxisId',
                },
                {
                data: uData,
                label: 'Profit/Loss',
                id: 'uvId',

                yAxisKey: 'rightAxisId',
                },
            ]}
            xAxis={[
                { data: xLabels, scaleType: 'band',   tickLabelStyle: {
                    angle: 45,
                    textAnchor: 'start',
                    fontSize: 12,
                  }, }
              ]}
            yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
            rightAxis="rightAxisId"
    />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <LineChart
              width={500}
              height={300}
              series={[
                { data: [2400, 1398, 9800, 3908, 4800, 3800, 4300], label: 'Total Fund Value' },
                { data: [4000, 3000, 2000, 2780, 1890, 2390, 3490], label: 'Profit/Loss' },
              ]}
              xAxis={[{ scaleType: 'point', data: ['10th Jan', '15th Jan', '20th Feb', '3rd Mar', '15th Mar', '28th Mar', '6th Apr'] }]}
            />
          </Box>
        </Grid>

        {/* Horizontal Divider */}
        <Grid item xs={12}>
          <Divider />
        </Grid>

        {/* Bottom Row Charts */}
        <Grid item xs={12} sm={6} sx={{paddingRight:20}}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              {gaugesData.map((gauge, index) => (
                <Box key={index} sx={{ width: 300, textAlign: 'center' }}>
                  <Gauge
                    width={300}
                    height={300}
                    value={gauge.value}
                    startAngle={gauge.startAngle || 0}
                    endAngle={gauge.endAngle || 360}
                  />
                  <Typography variant="h6">{gauge.label}</Typography>
                  <Typography variant="caption">{gauge.description}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: 'Mid Cap' },
                    { id: 1, value: 15, label: 'Large Cap' },
                    { id: 2, value: 20, label: 'Small Cap' },
                  ],
                },
              ]}
              width={500}
              height={300}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Analytics;
