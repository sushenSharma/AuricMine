import {
  Box,
  CssBaseline,
  Divider,
  Grid,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import {
  BarChart,
  Gauge,
  LineChart,
  gaugeClasses
} from "@mui/x-charts";
import React from "react";
import WordGraph from "./WordGraph";

const Analytics = () => {
  const theme = createTheme({
    palette: {
      background: {
        default: "#000", // Black background
      },
      text: {
        primary: "#fff", // White text
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#000", // Black background for Paper components
          },
        },
      },
    },
  });

  const gaugesData = [
    { value: 46, label: "ROCE", description: "46%" },
    {
      value: 73,
      label: "Trade Accuracy",
      description: "73%",
      startAngle: -90,
      endAngle: 90,
    },
  ];

  const barData = [24, 13, 98, 39, 48, 38, 43];
  const profitLossData = [4000, 3000, 2000, 2780, -1890, 2390, 3490];
  const xLabels = [
    "TaTa",
    "Krsnaa",
    "Reliance",
    "Mahindra",
    "Bajaj",
    "E2E",
    "MMForg",
  ];

  const ledgerDataRaw = localStorage.getItem("ledgerData");
  const ledgerData = JSON.parse(JSON.parse(ledgerDataRaw));

  // Calculate the profit or loss as a float for each item in the ledger data
  const profitLossArray = ledgerData.map((item) =>
    parseFloat(item.profit_loss)
  );
  const stockNamesArray = ledgerData.map((stock) => stock.stock_name);

  // Assume initial seed capital
  let fundValue = 100000000; // 1 crore
  const fundValuesArray = [];

  // Traverse through each profit or loss value to update the fund value
  profitLossArray.forEach((profitLoss) => {
    fundValue += profitLoss; // Update fund value based on profit or loss
    fundValuesArray.push(fundValue); // Append updated fund value to array
  });

  // Map and log sell dates to confirm their format directly
  const sellDates = ledgerData.map((entry) => entry.sell_date);
  const daysHeldArray = ledgerData.map((stock) => {
    const buyDate = new Date(stock.buy_date);
    const sellDate = new Date(stock.sell_date);

    // Calculate difference in time in milliseconds
    const timeDiff = sellDate - buyDate;

    // Convert time difference from milliseconds to days
    return timeDiff / (1000 * 3600 * 24); // Converts milliseconds to days
  });

  const lineSeriesData = {
    totalFundValue: fundValuesArray,
    profitLoss: profitLossArray,
  };

  const pieChartData = [
    { id: 0, value: 10, label: "Mid Cap" },
    { id: 1, value: 15, label: "Large Cap" },
    { id: 2, value: 20, label: "Small Cap" },
  ];

  const WordGraphData = [
    { text: "Breakout", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Pullback", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Retest", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Gap Up", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Momentum", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Reversal", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Support", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Resistance", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Overbought", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Oversold", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Trend Line", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Volume Spike", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Candlestick", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Scalping", weight: Math.floor(Math.random() * 50) + 1 },
    { text: "Range Trading", weight: Math.floor(Math.random() * 50) + 1 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ backgroundColor: "#000" }}>
        <Grid container spacing={2}>
          {/* Top Row Charts */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundColor: "#56585c",
              }}
            >
              <BarChart
                width={600}
                height={300}
                series={[
                  {
                    data: daysHeldArray,
                    label: "Number of Days Hold",
                    yAxisKey: "leftAxisId",
                    color: "#db5432",
                  },
                  {
                    data: profitLossArray,
                    label: "Profit/Loss",
                    yAxisKey: "rightAxisId",
                    color: "#77cc2d",
                  },
                ]}
                xAxis={[{ data: stockNamesArray, scaleType: "band" }]}
                yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
              />
            </Box>
            <Typography
              variant="h6"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                MozBackgroundClip: "text",
                MozTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Investment Duration vs. Profit/Loss
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundColor: "#56585c",
              }}
            >
              <LineChart
                width={700}
                height={300}
                series={[
                  {
                    data: lineSeriesData.totalFundValue,
                    label: "Total Fund Value",
                    color: "#db5432",
                  },
                  {
                    data: lineSeriesData.profitLoss,
                    label: "Profit/Loss",
                    color: "#77cc2d",
                  },
                ]}
                xAxis={[
                  {
                    data: sellDates,
                    scaleType: "point",
                  },
                ]}
              />
            </Box>
            <Typography
              variant="h6"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                MozBackgroundClip: "text",
                MozTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Fund Value and Profit/Loss Over Time
            </Typography>
          </Grid>
          .
          <Grid item xs={12}>
            <Divider style={{ backgroundColor: "#000" }} />
          </Grid>
          {/* Bottom Row Charts */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundColor: "#56585c",
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                {gaugesData.map((gauge, index) => (
                  <Box key={index} sx={{ width: 300, textAlign: "center" }}>
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
                          fill: "#52b202",
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                          fill: theme.palette.text.disabled,
                        },
                      })}
                    />
                    <Typography variant="h6">{gauge.label}</Typography>
                    <Typography variant="caption">
                      {gauge.description}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Typography
              variant="h6"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                MozBackgroundClip: "text",
                MozTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Key Performance Indicators
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                backgroundColor: "#56585c",
              }}
            >
              {/* <PieChart
                series={[{ data: pieChartData }]}
                width={500}
                height={300}
              /> */}
              <WordGraph words={WordGraphData} />
            </Box>
            <Typography
              variant="h6"
              style={{
                background:
                  "linear-gradient(90deg, rgba(0,255,0,1) 0%, rgba(255,0,0,1) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                MozBackgroundClip: "text",
                MozTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Best Working Strategy
            </Typography>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};

export default Analytics;
