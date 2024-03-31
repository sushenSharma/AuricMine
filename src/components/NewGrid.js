// React and Hooks
import React, { useState, useRef, useEffect, useMemo} from "react";

// Supabase for data handling
import { createClient } from "@supabase/supabase-js";


// Constants and styles
import "../assets/styles/Grid.css";
import "../assets/styles/styles.css";
import "pikaday/css/pikaday.css";
import { columns, userIdKey } from "../constants.js";
//Material Table Import
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';

// External Libraries
import Swal from 'sweetalert2';

// Data and Config
import styles from '../assets/styles/Response.css';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const apiUrl = process.env.REACT_APP_OPENAI_URL;
const promptText = process.env.REACT_APP_OPENAI_API_PROMPT;
const tableName = process.env.REACT_APP_SUPABASE_TABLE_NAME;
const userUUID = localStorage.getItem(userIdKey);

export default function NewGrid() {
  const hotRef = useRef(null); // Reference to Handsontable instance
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  let buttonClickCallback;

  //Materialtable Declarations
    const [materialdata, setMaterialData] = useState([]);

  //ParseDate Function
  function parseDate(dateString) {
    var parts = dateString.split("/");
    if (parts.length === 3) {
        return new Date(parts[2], parts[1] - 1, parts[0]);
    } else {
        return null;
    }
}

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
  

  // Handlers for UI actions (simplified for brevity)
  const handleSaveChanges = async () => {
    if (hotRef.current) {
      const hotData = hotRef.current.hotInstance.getData();
      
      const inserts = [];
      const updates = [];
      let emptyBuyDateFound = false;
      let sellDateBeforeBuyDateFound = false;
      hotData.filter(row => row.some(cell => cell !== "" && cell !== null))
        .forEach(rowArray => {
          if (!rowArray[2] || rowArray[2] === "") {
            emptyBuyDateFound = true;
            return; // Skip processing this row
          }
          const buyDate = parseDate(rowArray[2]);
          const sellDateRaw = rowArray[5];
          const sellDate = sellDateRaw !== "" && sellDateRaw !== null ? parseDate(sellDateRaw) : null;
          if (sellDate && buyDate && sellDate < buyDate) {
            sellDateBeforeBuyDateFound = true;
            return; // Skip further processing of this row
        }
          let record = {
            stock_name: rowArray[0],
            buy_price: parseFloat(rowArray[1]),
            buy_date: isNaN(buyDate) ? null : buyDate.toISOString().split('T')[0],
            quantity : parseFloat(rowArray[3]),
            sell_price: parseFloat(rowArray[4]),
            sell_date: sellDate ? sellDate.toISOString().split('T')[0] : null,
            brokerage: parseFloat(rowArray[6]),
            days_hold: parseInt(rowArray[7], 10),
            reason_to_buy: rowArray[8],
            gtt_enabled: rowArray[9],
            profit_loss: parseFloat(rowArray[10]),
            roce: parseFloat(rowArray[11]),
            annual_return_generated: parseFloat(rowArray[12]),
            user_id: userUUID,
            Amount: parseFloat(rowArray[14])
          };
          if (rowArray[13] !== null && rowArray[13] !== undefined && rowArray[13] !== "") {
            record.id = parseInt(rowArray[13], 10);
            updates.push(record);
          } else {
            inserts.push(record);
          }
        });
        if (emptyBuyDateFound) {
          Swal.fire({
            title: 'Error!',
            text: 'Buy date cannot be empty.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          return; // Stop execution if any buy date is empty
        }
        if (sellDateBeforeBuyDateFound) {
          Swal.fire({
              title: 'Error!',
              text: 'Sell date cannot be before the buy date.',
              icon: 'error',
              confirmButtonText: 'OK'
          });
          return; // Stop execution if sell date is before buy date
      }
  
      try {
        // Handle updates
        if (updates.length > 0) {
          const { error: updateError } = await supabase
            .from(tableName)
            .upsert(updates, { onConflict: 'id' });
          
          if (updateError) {
            throw updateError;
          }
        }
  
        // Handle inserts
        if (inserts.length > 0) {
          const { error: insertError } = await supabase
            .from(tableName)
            .insert(inserts);
          
          if (insertError) {
            throw insertError;
          }
        }
  
        Swal.fire({
          title: 'Success!',
          text: 'Data saved successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        await getData();
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to save data: ' + error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else {
      console.log('Instance is not yet available.');
    }
  };
  const handleGetInsights = async () => {
    setLoading(true);
    const dataString = JSON.stringify(materialdata);

    const requestBody = {
      prompt: `With json data ${JSON.stringify(dataString)}, ${promptText}`,
      max_tokens: Math.min(dataString.length, 1000),
    };

    try {
      Swal.fire({
        title: 'Success!',
        text: 'Insights getting Generated!  Please Scroll Down',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
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
  // Render the component
  return (
    <>
      <div className="toolbar">
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 10px', backgroundColor: 'ghostwhite', justifyContent: 'space-between' }}>
    <div>
        <button className="btn btn-outline-primary btn-sm m-1" style={{ boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #007bff' }} onClick={(...args) => buttonClickCallback(...args)}>Download CSV</button>
        <button className="btn btn-outline-success btn-sm m-1" style={{ boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #28a745' }} onClick={handleSaveChanges}>Save Changes</button>
    </div>
    <button 
        className="btn btn-outline-success btn-sm m-1" 
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: 'lightred', color: 'black', boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #28a745' }} 
        onClick={handleGetInsights}>
        Get Insights with AI
    </button>
</div>
      </div>

      <div className="grid-container">
    <MaterialReactTable table={table} />;
     </div>

<div className="response-container">
<div className="ag-theme-alpine" style={styles.gridThemeAlpine}></div>
    <div style={styles.buttons}></div>
    <div style={styles.centerText}></div>
    {loading ? (
      <p style={styles.loadingText}>Loading...</p>
    ) : (
      <ul style={styles.list}>
        {response && response.map((item, index) => (
          <li key={index} style={styles.listItem}>
            {item}
          </li>
        ))}
      </ul>
    )}
   
</div>

    </>
  );
}
