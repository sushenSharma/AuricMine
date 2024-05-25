import React, { useState } from "react";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const RiskManagement = () => {
  const [finalPercentage, setFinalPercentage] = useState(null);
  const [seedCapital, setSeedCapital] = useState("500000"); // Seed capital set to 500,000
  const [initialRisk, setInitialRisk] = useState("5");
  const [regularIncome, setRegularIncome] = useState(""); // State to store the regular income
  const [provisioningPercentage, setProvisioningPercentage] = useState(""); // State to store the provisioning percentage
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveToDatabase = async () => {
    console.log("Saving changes...");
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const ledgerDataRaw = localStorage.getItem("ledgerData");
      const ledgerData = JSON.parse(JSON.parse(ledgerDataRaw));
      const profitLossArray = ledgerData.map((item) =>
        parseFloat(item.profit_loss)
      );
      const initialCapital = 1000;
      const initialRiskPercentage = 0.05;
      const profitMultiplier = 1.5;
      const requestBody = {
        initialCapital,
        initialRiskPercentage,
        tradeOutcomes: profitLossArray,
        profitMultiplier,
      };
      const userID = localStorage.getItem("userId");
      const response = await fetch(
        "https://zcvtgtaimnsrlemslypr.supabase.co/functions/v1/hello-world",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setFinalPercentage(result.finalRiskPercentage); // Adjust according to your actual API response
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box
        sx={{
          maxWidth: "auto",
          margin: "left",
          padding: 2,
          background: "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h4"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              Risk Management Settings
            </Typography>
            <TextField
              label="Seed Capital"
              variant="outlined"
              fullWidth
              value={seedCapital}
              onChange={(e) => setSeedCapital(e.target.value)}
              margin="normal"
            />
            <TextField
              label="Initial Risk (%)"
              variant="outlined"
              fullWidth
              value={initialRisk}
              onChange={(e) => setInitialRisk(e.target.value)}
              margin="normal"
              type="number"
            />
            <TextField
              label="Regular Income"
              variant="outlined"
              fullWidth
              value={regularIncome}
              onChange={(e) => setRegularIncome(e.target.value)}
              margin="normal"
              helperText="Enter your regular income from cashflow"
            />
            <TextField
              label="Provisioning Percentage"
              variant="outlined"
              fullWidth
              value={provisioningPercentage}
              onChange={(e) => setProvisioningPercentage(e.target.value)}
              margin="normal"
              type="number"
              helperText="Percentage of income okay for provisioning loss in trades"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={saveToDatabase}
              fullWidth
              sx={{ marginY: 2 }}
            >
              Save Changes
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingY: 10, // Added vertical padding for spacing
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={fetchData}
              disabled={loading || !seedCapital || !initialRisk}
              startIcon={<AccountBalanceWalletOutlinedIcon />}
              sx={{ marginY: 5, borderRadius: 0 }}
              size="large"
            >
              {loading
                ? "Calculating..."
                : "Calculate Stop Loss for My Next Trade"}
            </Button>
            {error && <Typography color="error">Error: {error}</Typography>}
            {finalPercentage !== null && (
              <Typography variant="h5" sx={{ mt: 2, textAlign: "center" }}>
                Based on your past performance, It is recommended to put a stop
                loss of{" "}
                <span
                  style={{
                    color: "#d32f2f",
                    fontStyle: "normal",
                    fontWeight: "bolder",
                    fontSize: "30px",
                  }}
                >
                  {finalPercentage}%
                </span>{" "}
                for your next trade.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default RiskManagement;
