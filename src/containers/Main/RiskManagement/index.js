import _ from "lodash";
import React, { useEffect, useState } from "react";
import { getLabel } from "../../../hooks/use-labels";
import { getStorageStringItem } from "../../../utils/common-utils";
import { TextField, Button, Box, Typography, Grid } from "@mui/material";
import { getSubmissionData, isError } from "./hooks/validation-risk-management";
import {
  fetchRiskManagementData,
  saveRiskManagementData,
  updateRiskManagementData,
} from "./lib/apis";

import SwalNotification from "../../../components/SwalNotification";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

const RiskManagement = () => {
  const userID = getStorageStringItem("userId");

  const [finalPercentage, setFinalPercentage] = useState(null);
  const [seedCapital, setSeedCapital] = useState("500000");
  const [initialRisk, setInitialRisk] = useState("5");
  const [regularIncome, setRegularIncome] = useState("");
  const [provisioningPercentage, setProvisioningPercentage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formError, serFormError] = useState({});
  const [queryAction, setQueryAction] = useState("insert");

  useEffect(() => {
    getRiskManagementData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRiskManagementData = () => {
    fetchRiskManagementData(userID).then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }

      if (!_.isEmpty(data)) {
        const {
          IncomeCashflow,
          PercentageCashflowRisk,
          SeedCapital,
          SeedRisk,
        } = data[0];

        localStorage.setItem("riskManagementData", JSON.stringify(data[0]));

        setSeedCapital(SeedCapital);
        setInitialRisk(SeedRisk);
        setRegularIncome(IncomeCashflow);
        setProvisioningPercentage(PercentageCashflowRisk);

        setQueryAction("update");
      }
    });
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const ledgerDataRaw = localStorage.getItem("ledgerData");
      const ledgerData = JSON.parse(JSON.parse(ledgerDataRaw));

      // Sort the ledger data by Sell Date using Lodash
      const sortedLedgerData = _.sortBy(
        ledgerData,
        (item) => new Date(item.sell_date)
      );
      console.log(sortedLedgerData);

      // Extract the profit and loss values from sorted ledger data
      const profitLossArray = sortedLedgerData.map((item) =>
        parseFloat(item.profit_loss)
      );
      const initialCapital = parseFloat(seedCapital);
      const initialRiskPercentage = parseFloat(initialRisk) / 100;
      const profitMultiplier = 1.5;
      const requestBody = {
        initialCapital,
        initialRiskPercentage,
        tradeOutcomes: profitLossArray,
        profitMultiplier,
      };

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
      setFinalPercentage(result.finalRiskPercentage);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = (value, key) => {
    switch (key) {
      case "seedCapital":
        setSeedCapital(value);
        deleteError(formError, key);
        break;
      case "initialRisk":
        setInitialRisk(value);
        deleteError(formError, key);
        break;
      case "regularIncome":
        setRegularIncome(value);
        deleteError(formError, key);
        break;
      case "provisioningPercentage":
        setProvisioningPercentage(value);
        deleteError(formError, key);
        break;
      default:
        return null;
    }
  };

  const deleteError = (formError, key) => {
    delete formError[key];
  };

  const onFinishHandler = async () => {
    const { valid, errors, fieldData } = getSubmissionData({
      seedCapital,
      initialRisk,
      regularIncome,
      provisioningPercentage,
    });

    if (valid) {
      onSubmit(fieldData);
    } else {
      serFormError(errors);
    }
  };

  const onSubmit = (fieldData) => {
    const requestBody = {
      Userid: userID,
      ...fieldData,
    };

    if (queryAction === "insert") {
      insertData(requestBody);
    } else if (queryAction === "update") {
      updateData(requestBody, userID);
    }
  };

  const insertData = (requestBody) => {
    saveRiskManagementData(requestBody).then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }

      getRiskManagementData();
      successPopup();
    });
  };

  const updateData = (requestBody, userId) => {
    updateRiskManagementData(userId, requestBody).then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }
      getRiskManagementData();
      successPopup();
    });
  };

  const successPopup = () => {
    SwalNotification({
      title: getLabel("successLabel"),
      text: getLabel("saveDataContent"),
      iconType: "success",
      btnLabel: getLabel("okLabel"),
    });
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
              error={isError(formError, "seedCapital")}
              label="Seed Capital"
              variant="outlined"
              fullWidth
              value={seedCapital}
              onChange={(e) => onChangeHandler(e.target.value, "seedCapital")}
              margin="normal"
              helperText={
                !_.isEmpty(formError) && formError.seedCapital
                  ? formError.seedCapital
                  : ""
              }
            />
            <TextField
              error={isError(formError, "initialRisk")}
              label="Initial Risk (%)"
              variant="outlined"
              fullWidth
              value={initialRisk}
              onChange={(e) => onChangeHandler(e.target.value, "initialRisk")}
              margin="normal"
              type="number"
              helperText={
                !_.isEmpty(formError) && formError.initialRisk
                  ? formError.initialRisk
                  : ""
              }
            />
            <TextField
              error={isError(formError, "regularIncome")}
              label="Regular Income"
              variant="outlined"
              fullWidth
              value={regularIncome}
              onChange={(e) => onChangeHandler(e.target.value, "regularIncome")}
              margin="normal"
              helperText={
                !_.isEmpty(formError) && formError.regularIncome
                  ? formError.regularIncome
                  : "Enter your regular income from cashflow"
              }
            />
            <TextField
              error={isError(formError, "provisioningPercentage")}
              label="Provisioning Percentage"
              variant="outlined"
              fullWidth
              value={provisioningPercentage}
              onChange={(e) =>
                onChangeHandler(e.target.value, "provisioningPercentage")
              }
              margin="normal"
              type="number"
              helperText={
                !_.isEmpty(formError) && formError.provisioningPercentage
                  ? formError.provisioningPercentage
                  : "Percentage of income okay for provisioning loss in trades"
              }
            />
            <Button
              variant="contained"
              color="primary"
              onClick={onFinishHandler}
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
              paddingY: 10,
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
