import React, { useState } from "react";

const RiskManagement = () => {
  const [finalPercentage, setFinalPercentage] = useState(null);
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

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>
      {error && <div>Error: {error}</div>}
      {finalPercentage !== null && (
        <h2>Final Risk Percentage: {finalPercentage}%</h2>
      )}
    </div>
  );
};

export default RiskManagement;
