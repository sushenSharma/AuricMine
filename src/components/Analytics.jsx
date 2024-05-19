import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Box, Typography, useTheme, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import { BarChart, LineChart,Gauge, gaugeClasses  } from '@mui/x-charts';

const Analytics = ({ data }) => {
  const theme = useTheme();

  // Line Chart settings
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const pieData = [
    { label: 'Group A', value: 400 },
    { label: 'Group B', value: 300 },
    { label: 'Group C', value: 300 },
    { label: 'Group D', value: 200 },
    { label: 'Group E', value: 278 },
    { label: 'Group F', value: 189 },
  ];
  
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = ['Page A', 'Page B', 'Page C', 'Page D', 'Page E', 'Page F', 'Page G'];

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BarChart
            series={[
              { data: [3, 4, 1, 6, 5], stack: 'A', label: 'Series A1' },
              { data: [4, 3, 1, 5, 8], stack: 'A', label: 'Series A2' },
              { data: [4, 2, 5, 4, 1], stack: 'B', label: 'Series B1' },
              { data: [2, 8, 1, 3, 1], stack: 'B', label: 'Series B2' },
              { data: [10, 6, 5, 8, 9], label: 'Series C1' },
            ]}
            width={500}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <LineChart
            width={500}
            height={300}
            series={[
              { data: pData, label: 'pv' },
              { data: uData, label: 'uv' },
            ]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">  <Gauge
  value={75}
  startAngle={-110}
  endAngle={110}
  sx={{
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 40,
      transform: 'translate(0px, 0px)',
    },
  }}
  text={
     ({ value, valueMax }) => `${value} / ${valueMax}`
  }
/></Typography>
         
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Additional Chart 2 Placeholder</Typography>
          {/* Placeholder for another chart */}
        </Grid>
        
      </Grid>
    </div>
  );
};

export default Analytics;
