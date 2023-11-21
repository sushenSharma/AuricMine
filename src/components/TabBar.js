import React, { useState } from "react";
import Grid from "./Grid";
import "../assets/styles/TabBar.css";

function TabBar({ userId }) {
  const [select, setSelect] = useState("Ledger");
  
  return (
    <div>
      <button
        onClick={() => setSelect("Ledger")}
        className={`tab-button ${select === "Ledger" ? "active" : ""}`}
      >
        Ledger
      </button>
      <button
        onClick={() => setSelect("Cashflow Statement")}
        className={`tab-button ${
          select === "Cashflow Statement" ? "active" : ""
        }`}
      >
        Cashflow Statement
      </button>
      <button
        onClick={() => setSelect("Risk Management")}
        className={`tab-button ${select === "Risk Management" ? "active" : ""}`}
      >
        Risk Management
      </button>
      <button
        onClick={() => setSelect("Watchlist")}
        className={`tab-button ${select === "Watchlist" ? "active" : ""}`}
      >
        Watchlist
      </button>
      <div>
        {select === "Ledger" && <Grid userId={userId} />}
        {select === "Cashflow Statement" && <h2>CashFlow Statment</h2>}
        {select === "Risk Management" && <h2>Risk Management</h2>}
        {select === "Watchlist" && <h2>Watchlist</h2>}
      </div>
    </div>
  );
}

export default TabBar;
