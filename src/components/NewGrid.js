// React and Hooks
import React, { useState, useEffect, useMemo } from "react";
// Constants and styles
import "../assets/styles/Grid.css";
import "../assets/styles/styles.css";
import "pikaday/css/pikaday.css";
import { userIdKey } from "../constants.js";
//Material Table Import
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

// External Libraries
import Swal from "sweetalert2";

// Data and Config
import styles from "../assets/styles/Response.css";
import { supabase } from "../config/index_supabase.js";
import { useCustomHooks } from "../hooks/customHooks.js";
import * as LedgerTableStyle from "../assets/styles/styles.js";

export default function NewGrid() {
  let buttonClickCallback;
  //Materialtable Declarations
  const [materialdata, setMaterialData] = useState([]);

  // Fetch and process data from Supabase
  const getData = async () => {
    try {
      const userUUID = localStorage.getItem(userIdKey);
      const { data, error } = await supabase
        .from(process.env.REACT_APP_SUPABASE_TABLE_NAME)
        .select()
        .eq("user_id", userUUID)
        .order("buy_date", { ascending: true });

      if (error) throw error;
      // Process and transform data here...
      let totalPercentageRate =
        0.001 +
        0.0000325 +
        0.00000001 +
        0.18 * (0.0000325 + 0.00000001) +
        0.00015;
      const transformedDataForMaterialTable = data.map((item) => ({
        stockSymbol: item.stock_name,
        buyPrice: item.buy_price,
        buyDate: item.buy_date
          ? new Date(item.buy_date).toLocaleDateString()
          : "",
        quantity: item.quantity,
        sellPrice: item.sell_price,
        sellDate: item.sell_date
          ? new Date(item.sell_date).toLocaleDateString()
          : "",
        brokerage: item.brokerage,
        daysHold: item.days_hold,
        reasonToBuy: item.reason_to_buy,
        gttEnabled: item.gtt_enabled ? "Yes" : "No",
        profitLoss: item.profit_loss,
        returnPercent: item.return_percent,
        annualROI: item.annual_roi,
        id: item.id,
        amountInvested: item.amount_invested,
      }));
      setMaterialData(transformedDataForMaterialTable);
    } catch (error) {
      console.error(error);
    }
  };

  // Initialize component and event listeners
  useEffect(() => {
    // Fetch data when the component mounts
    getData();
    return () => {};
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "stockSymbol", header: "Stock Symbol" },
      { accessorKey: "buyPrice", header: "Buy Price" },
      { accessorKey: "buyDate", header: "Buy Date" },
      { accessorKey: "quantity", header: "Quantity" },
      { accessorKey: "sellPrice", header: "Sell Price" },
      { accessorKey: "sellDate", header: "Sell Date" },
      { accessorKey: "brokerage", header: "Brokerage" },
      { accessorKey: "daysHold", header: "Days Hold" },
      { accessorKey: "reasonToBuy", header: "Reason to Buy" },
      {
        accessorKey: "gttEnabled",
        header: "GTT Enabled",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      }, // Assuming boolean value
      { accessorKey: "profitLoss", header: "Profit / Loss" },
      { accessorKey: "returnPercent", header: "Return %" },
      { accessorKey: "annualROI", header: "Annual ROI" },
      { accessorKey: "id", header: "ID" },
      { accessorKey: "amountInvested", header: "Amount Invested" },
    ],
    []
  );

  const { handleSaveChanges, handleGetInsights, response, loading } =
    useCustomHooks(materialdata);
  const table = useMaterialReactTable({
    columns,
    data: materialdata,
    enableColumnFilterModes: true,
    initialState: { density: "compact" },
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: false,
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiTableBodyProps: {
      sx: {
        //stripe the rows, make odd rows a darker color
        "& tr:nth-of-type(odd) > td": {
          backgroundColor: "#7a8385",
        },
      },
    },
  });

  return (
    <>
      <div className="toolbar" style={styles.toolbarStyles}>
        <div>
          <button
            className="btn btn-outline-primary btn-sm m-1"
            style={LedgerTableStyle.buttonStyles}
            onClick={buttonClickCallback}
          >
            Download CSV
          </button>
          <button
            className="btn btn-outline-success btn-sm m-1"
            style={LedgerTableStyle.buttonStyles}
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
        </div>
        <button
          className="btn btn-outline-success btn-sm m-1"
          style={LedgerTableStyle.insightButtonStyles}
          onClick={handleGetInsights}
        >
          Get Insights with AI
        </button>
      </div>

      <div className="grid-container">
        <MaterialReactTable table={table} />
      </div>

      <div className="response-container">
        <div className="ag-theme-alpine"></div>
        <div></div>
        <div></div>
        {loading ? (
          <p style={LedgerTableStyle.loadingTextStyles}>Loading...</p>
        ) : (
          <ul style={LedgerTableStyle.listStyles}>
            {response &&
              response.map((item, index) => (
                <li key={index} style={LedgerTableStyle.listItemStyles}>
                  {item}
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
}
