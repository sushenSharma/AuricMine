import React, { useState } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { TextField, Button, Box, Typography } from "@mui/material";

const RiskManagement = () => {
  const [finalPercentage, setFinalPercentage] = useState(null);
  const [seedCapital, setSeedCapital] = useState("500000"); // Seed capital set to 500,000
  const [initialRisk, setInitialRisk] = useState("5");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetching the ledgerData from localStorage and parsing it
      const ledgerDataRaw = localStorage.getItem("ledgerData");
      const ledgerData = JSON.parse(JSON.parse(ledgerDataRaw));

      // Extracting profit_loss values into an array
      const profitLossArray = ledgerData.map((item) =>
        parseFloat(item.profit_loss)
      );

      // Define other parameters
      const initialCapital = 1000;
      const initialRiskPercentage = 0.05;
      const profitMultiplier = 1.5;

      // Creating the body of the POST request
      const requestBody = {
        initialCapital,
        initialRiskPercentage,
        tradeOutcomes: profitLossArray,
        profitMultiplier,
      };
      console.log(requestBody);

      // API call
      const response = await fetch(
        "https://zcvtgtaimnsrlemslypr.supabase.co/functions/v1/hello-world",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add other headers as needed
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setFinalPercentage(result.finalRiskPercentage); // Adjust according to your actual API response
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const settings = {
    width: 200,
    height: 200,
  };
  const handleInput = (e, setter) => setter(e.target.value);

  return (
    <div>
      <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
          Risk Management
        </Typography>
        <TextField
          label="Seed Capital"
          variant="outlined"
          fullWidth
          value={seedCapital}
          onChange={(e) => handleInput(e, setSeedCapital)}
          margin="normal"
        />
        <TextField
          label="Initial Risk (%)"
          variant="outlined"
          fullWidth
          value={initialRisk}
          onChange={(e) => handleInput(e, setInitialRisk)}
          margin="normal"
          type="number"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchData}
          disabled={loading || !seedCapital || !initialRisk}
          fullWidth
          sx={{ marginY: 2 }}
        >
          {loading ? "Calculating..." : "Calculate Stop loss for my Next Trade"}
        </Button>
        {error && <Typography color="error">Error: {error}</Typography>}
        {finalPercentage !== null && (
          <Gauge
            {...settings}
            value={finalPercentage}
            cornerRadius="50%"
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 24,
                fill: theme.palette.text.primary,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#52b202",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.grey[300],
              },
            })}
          />
        )}
      </Box>
    </div>
  );
};

export default RiskManagement;
