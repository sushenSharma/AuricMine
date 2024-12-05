import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "../../../assets/styles/TradingGameComparison.css";

const Watchlist = () => {
  const [seedCapital] = useState(100000); // Fixed seed capital to 1 lakh
  const [seedLossBuffer, setSeedLossBuffer] = useState(250);
  const [results, setResults] = useState({ withAlgo: [], withoutAlgo: [] });
  const [metrics, setMetrics] = useState({}); // State for metrics
  const [showMetricsDefinitions, setShowMetricsDefinitions] = useState(false); // Toggle for side panel

  const minStopLossPercent = 0.02;
  const maxStopLossPercent = 0.2;
  const winFactorIncrement = 1.2;
  const lossFactorDecrement = 1.35;
  const staticStopLossPercent = 0.04; // For non-algo scenario, fixed at 5%

  // Generate randomized profit or loss states
  const generateRandomTradeStates = (numTrades) => {
    return Array.from({ length: numTrades }, () => ({
      isProfit: Math.random() >= 0.5, // Randomly decide profit or loss
    }));
  };

  const calculateMetrics = (capitalSeries) => {
    const totalTrades = capitalSeries.length;
    const finalCapital = capitalSeries[capitalSeries.length - 1].updatedCapital;
    const maxCapital = Math.max(...capitalSeries.map((c) => c.updatedCapital));
    const minCapital = Math.min(...capitalSeries.map((c) => c.updatedCapital));

    let maxDrawdown = 0;
    let peakCapital = capitalSeries[0].updatedCapital;
    capitalSeries.forEach((c) => {
      if (c.updatedCapital > peakCapital) {
        peakCapital = c.updatedCapital;
      }
      const drawdown = ((peakCapital - c.updatedCapital) / peakCapital) * 100;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    });

    const capitalReturns = capitalSeries.map((c, i, arr) =>
      i === 0 ? 0 : c.updatedCapital - arr[i - 1].updatedCapital
    );
    const meanReturns =
      capitalReturns.reduce((sum, val) => sum + val, 0) / capitalReturns.length;
    const variance =
      capitalReturns.reduce((sum, val) => sum + (val - meanReturns) ** 2, 0) /
      (capitalReturns.length - 1);
    const volatility = Math.sqrt(variance);

    const winningTrades = capitalSeries.filter(
      (c) => c.tradeOutcome > 0
    ).length;
    const losingTrades = capitalSeries.filter((c) => c.tradeOutcome < 0).length;
    const profitLossRatio =
      losingTrades === 0 ? winningTrades : winningTrades / losingTrades;

    const positiveReturns = capitalSeries.filter(
      (c) => c.updatedCapital >= seedCapital
    ).length;

    return {
      finalCapital: finalCapital.toFixed(2),
      maxDrawdown: maxDrawdown.toFixed(2),
      volatility: volatility.toFixed(2),
      profitLossRatio: profitLossRatio.toFixed(2),
      positiveReturns: positiveReturns,
      totalTrades: totalTrades,
    };
  };

  // Simulate profit/loss outcome based on state
  const simulateTradeOutcome = (isProfit, capital, stopLoss) => {
    if (isProfit) {
      return Math.random() * 10000;
    } else {
      return -(capital * stopLoss);
    }
  };

  // Simulate with algorithm - dynamic stop-loss logic
  const simulateTradeOutcomeWithAlgo = (isProfit, capital, stopLoss) => {
    if (isProfit) {
      const profitMultiplier = Math.random() > 0.5 ? 1 : 1.5;
      const profitPercent = stopLoss * profitMultiplier;
      return capital * profitPercent;
    } else {
      return -(capital * stopLoss);
    }
  };

  const simulateWithAlgo = (tradeStates) => {
    let capital = seedCapital;
    let lossBuffer = seedLossBuffer;
    let stopLoss = minStopLossPercent;
    let consecutiveWins = 0;
    let consecutiveLosses = 0;

    const resultsWithAlgo = tradeStates.map((state, index) => {
      const outcome = simulateTradeOutcomeWithAlgo(
        state.isProfit,
        capital,
        stopLoss
      );

      if (state.isProfit) {
        const profit66 = outcome * 0.66;
        const profit33 = outcome * 0.33;
        capital += profit66;
        lossBuffer += profit33;
        consecutiveWins += 1;
        consecutiveLosses = 0;
        stopLoss = Math.min(stopLoss * winFactorIncrement, maxStopLossPercent);
      } else {
        capital += outcome;
        if (capital < 0) capital = 0;
        if (lossBuffer > 0) {
          const lossRefill = Math.min(-outcome, lossBuffer);
          lossBuffer -= lossRefill;
          capital += lossRefill;
        }
        consecutiveLosses += 1;
        consecutiveWins = 0;
        stopLoss = Math.max(stopLoss / lossFactorDecrement, minStopLossPercent);
      }

      return {
        tradeNumber: index + 1,
        tradeOutcome: outcome,
        updatedCapital: capital,
        stopLossPercent: stopLoss * 100,
      };
    });

    return resultsWithAlgo;
  };

  const simulateWithoutAlgo = (tradeStates) => {
    let capital = seedCapital;
    return tradeStates.map((state, index) => {
      const outcome = simulateTradeOutcome(
        state.isProfit,
        capital,
        staticStopLossPercent
      );
      capital += outcome;
      return {
        tradeNumber: index + 1,
        tradeOutcome: outcome,
        updatedCapital: capital,
        stopLossPercent: staticStopLossPercent * 100,
      };
    });
  };

  const compareScenarios = () => {
    const tradeStates = generateRandomTradeStates(50);
    const withoutAlgo = simulateWithoutAlgo(tradeStates);
    const withAlgo = simulateWithAlgo(tradeStates);

    const metricsWithoutAlgo = calculateMetrics(withoutAlgo);
    const metricsWithAlgo = calculateMetrics(withAlgo);

    setResults({ withAlgo, withoutAlgo });
    setMetrics({ withoutAlgo: metricsWithoutAlgo, withAlgo: metricsWithAlgo });
  };

  const dataWithAlgo = {
    labels: results.withAlgo.map((_, index) => `Trade ${index + 1}`),
    datasets: [
      {
        label: "With Algorithm - Capital",
        data: results.withAlgo.map((result) => result.updatedCapital),
        borderColor: "green",
        fill: false,
      },
      {
        label: "With Algorithm - Stop Loss (%)",
        data: results.withAlgo.map((result) => result.stopLossPercent),
        borderColor: "red",
        fill: false,
      },
    ],
  };

  const dataWithoutAlgo = {
    labels: results.withoutAlgo.map((_, index) => `Trade ${index + 1}`),
    datasets: [
      {
        label: "Without Algorithm - Capital",
        data: results.withoutAlgo.map((result) => result.updatedCapital),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Without Algorithm - Stop Loss (%)",
        data: results.withoutAlgo.map((result) => result.stopLossPercent),
        borderColor: "orange",
        fill: false,
      },
    ],
  };

  return (
    <div className="container">
      <h1 className="title">Trading Game: Algorithm vs No Algorithm</h1>
      <div className="input-section">
        <div className="button-container">
          <button className="action-button" onClick={compareScenarios}>
            Compare Scenarios
          </button>
          <button
            className="toggle-button"
            onClick={() => setShowMetricsDefinitions(!showMetricsDefinitions)}
          >
            {showMetricsDefinitions ? "Hide Definitions" : "Show Definitions"}
          </button>
        </div>
      </div>

      {showMetricsDefinitions && (
        <div className="side-panel">
          <h3>Metrics Definitions</h3>
          <ul>
            <li>
              <strong>Max Drawdown</strong>: Largest drop in portfolio value
              from peak to trough.
            </li>
            <li>
              <strong>Volatility</strong>: Degree of fluctuation in portfolio
              value.
            </li>
            <li>
              <strong>Profit/Loss Ratio</strong>: Ratio of winning to losing
              trades.
            </li>
            <li>
              <strong>Positive Returns</strong>: Number of trades where capital
              exceeded seed capital.
            </li>
          </ul>
        </div>
      )}

      {results.withAlgo.length > 0 && (
        <div className="chart-section">
          <div className="chart-card">
            <h2 className="chart-title">With Algorithm</h2>
            <Line data={dataWithAlgo} />
          </div>
          <div className="chart-card">
            <h2 className="chart-title">Without Algorithm</h2>
            <Line data={dataWithoutAlgo} />
          </div>
        </div>
      )}

      {results.withAlgo.length > 0 && (
        <div className="metrics-section">
          <h3 className="section-title">Metrics Summary</h3>
          <div className="metrics-card">
            <h4 className="card-title">With Algorithm</h4>
            <p>Final Capital: {metrics.withAlgo?.finalCapital}</p>
            <p>Max Drawdown: {metrics.withAlgo?.maxDrawdown}%</p>
            <p>Volatility: {metrics.withAlgo?.volatility}</p>
            <p>Profit/Loss Ratio: {metrics.withAlgo?.profitLossRatio}</p>
            <p>
              Positive Returns: {metrics.withAlgo?.positiveReturns} out of{" "}
              {metrics.withAlgo?.totalTrades} trades
            </p>
          </div>

          <div className="metrics-card">
            <h4 className="card-title">Without Algorithm</h4>
            <p>Final Capital: {metrics.withoutAlgo?.finalCapital}</p>
            <p>Max Drawdown: {metrics.withoutAlgo?.maxDrawdown}%</p>
            <p>Volatility: {metrics.withoutAlgo?.volatility}</p>
            <p>Profit/Loss Ratio: {metrics.withoutAlgo?.profitLossRatio}</p>
            <p>
              Positive Returns: {metrics.withoutAlgo?.positiveReturns} out of{" "}
              {metrics.withoutAlgo?.totalTrades} trades
            </p>
          </div>
        </div>
      )}

      {results.withAlgo.length > 0 && (
        <div className="trade-details-section">
          <h3 className="section-title">Detailed Trade Information</h3>
          <div className="trade-card">
            <h4 className="card-title">With Algorithm:</h4>
            {results.withAlgo.map((trade) => (
              <p key={trade.tradeNumber}>
                Trade {trade.tradeNumber}: Outcome:{" "}
                {trade.tradeOutcome.toFixed(2)}, Capital:{" "}
                {trade.updatedCapital.toFixed(2)}, Stop-Loss Percent:{" "}
                {trade.stopLossPercent.toFixed(2)}%
              </p>
            ))}
          </div>

          <div className="trade-card">
            <h4 className="card-title">Without Algorithm:</h4>
            {results.withoutAlgo.map((trade) => (
              <p key={trade.tradeNumber}>
                Trade {trade.tradeNumber}: Outcome:{" "}
                {trade.tradeOutcome.toFixed(2)}, Capital:{" "}
                {trade.updatedCapital.toFixed(2)}, Stop-Loss Percent:{" "}
                {trade.stopLossPercent.toFixed(2)}%
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
