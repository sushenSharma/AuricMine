// React and Hooks
import React, { useState,useEffect, useMemo} from "react";
// Constants and styles
import "../assets/styles/Grid.css";
import "../assets/styles/styles.css";
import "pikaday/css/pikaday.css";
import {userIdKey } from "../constants.js";
//Material Table Import
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

// External Libraries
import Swal from 'sweetalert2';

// Data and Config
import styles from '../assets/styles/Response.css';
import { supabase,openAIConfig} from "../config/index_supabase.js";
import { useCustomHook } from "../hooks/customHooks.js";
import * as HomepageStyle from "../styles/styles.js";



export default function NewGrid() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
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
      let totalPercentageRate = 0.001 + 0.0000325 + 0.00000001 + 0.18 * (0.0000325 + 0.00000001) + 0.00015;
      const transformedDataForMaterialTable = data.map((item) => ({
        stockSymbol: item.stock_name,
        buyPrice: item.buy_price,
        buyDate: item.buy_date ? new Date(item.buy_date).toLocaleDateString() : '',
        quantity: item.quantity,
        sellPrice: item.sell_price,
        sellDate: item.sell_date ? new Date(item.sell_date).toLocaleDateString() : '',
        brokerage: item.brokerage,
        daysHold: item.days_hold,
        reasonToBuy: item.reason_to_buy,
        gttEnabled: item.gtt_enabled ? 'Yes' : 'No',
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
    return () => {
    };
  }, []);
  
  const handleGetInsights = async () => {
    setLoading(true);
    const dataString = JSON.stringify(materialdata);

    const requestBody = {
      prompt: `With json data ${JSON.stringify(dataString)}, ${openAIConfig.promptText}`,
      max_tokens: Math.min(dataString.length, 1000),
    };

    try {
      Swal.fire({
        title: 'Success!',
        text: 'Insights getting Generated!  Please Scroll Down',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      const response = await fetch(openAIConfig.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": openAIConfig.apiKey,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      

      const text = data.choices[0].text
        .replace("\n", "")
        .replace(".", ".")
        .trim()
        .split("\n");
      setResponse(text);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const columns = useMemo(() => [
    { accessorKey: 'stockSymbol', header: 'Stock Symbol' },
    { accessorKey: 'buyPrice', header: 'Buy Price' },
    { accessorKey: 'buyDate', header: 'Buy Date' },
    { accessorKey: 'quantity', header: 'Quantity' },
    { accessorKey: 'sellPrice', header: 'Sell Price' },
    { accessorKey: 'sellDate', header: 'Sell Date' },
    { accessorKey: 'brokerage', header: 'Brokerage' },
    { accessorKey: 'daysHold', header: 'Days Hold' },
    { accessorKey: 'reasonToBuy', header: 'Reason to Buy' },
    { accessorKey: 'gttEnabled', header: 'GTT Enabled', Cell: ({ value }) => value ? 'Yes' : 'No' }, // Assuming boolean value
    { accessorKey: 'profitLoss', header: 'Profit / Loss' },
    { accessorKey: 'returnPercent', header: 'Return %' },
    { accessorKey: 'annualROI', header: 'Annual ROI' },
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'amountInvested', header: 'Amount Invested' },
  ], []);
  const { handleSaveChanges } = useCustomHook();
  const table = useMaterialReactTable({
    columns,
    data:materialdata, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
     enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: false,
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
  });
  
  return (
    <>
      <div className="toolbar" style={styles.toolbarStyles}>
        <div>
          <button className="btn btn-outline-primary btn-sm m-1" style={HomepageStyle.buttonStyles} onClick={buttonClickCallback}>Download CSV</button>
          <button className="btn btn-outline-success btn-sm m-1" style={HomepageStyle.buttonStyles} onClick={handleSaveChanges}>Save Changes</button>
        </div>
        <button
          className="btn btn-outline-success btn-sm m-1"
          style={HomepageStyle.insightButtonStyles}
          onClick={handleGetInsights}>
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
          <p style={HomepageStyle.loadingTextStyles}>Loading...</p>
        ) : (
          <ul style={HomepageStyle.listStyles}>
            {response && response.map((item, index) => (
              <li key={index} style={HomepageStyle.listItemStyles}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
