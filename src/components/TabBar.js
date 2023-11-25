import React, { useState } from "react";
import Grid from "./Grid";
import "../assets/styles/TabBar.css";

function TabBar({ userId }) {
  const [selectedTab, setSelectedTab] = useState("Ledger");
  
  const renderContent = () => {
    switch (selectedTab) {
      case "Ledger":
        return <Grid userId={userId} />;
      case "Cashflow Statement":
        return <h2>CashFlow Statement</h2>;
      case "Risk Management":
        return <h2>Risk Management</h2>;
      case "Watchlist":
        return <h2>Watchlist</h2>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="tab-buttons-container">
        <button
          onClick={() => setSelectedTab("Ledger")}
          className={`tab-button ${selectedTab === "Ledger" ? "active" : ""}`}
        >
          Ledger
        </button>
        <button
          onClick={() => setSelectedTab("Cashflow Statement")}
          className={`tab-button ${selectedTab === "Cashflow Statement" ? "active" : ""}`}
        >
          Cashflow Statement
        </button>
        <button
          onClick={() => setSelectedTab("Risk Management")}
          className={`tab-button ${selectedTab === "Risk Management" ? "active" : ""}`}
        >
          Risk Management
        </button>
        <button 
          onClick={() => setSelectedTab("Watchlist")}
          className={`tab-button ${selectedTab === "Watchlist" ? "active" : ""}`}
        >
          Watchlist
        </button>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default TabBar;
