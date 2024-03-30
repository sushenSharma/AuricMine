// React and Hooks
import React, { useState, useRef, useEffect, useMemo,useCallback } from "react";

// Supabase for data handling
import { createClient } from "@supabase/supabase-js";


// Constants and styles
import "../assets/styles/Grid.css";
import "../assets/styles/styles.css";
import "pikaday/css/pikaday.css";
import { columns, userIdKey } from "../constants.js";
import 'handsontable/dist/handsontable.full.min.css';

// Handsontable components and utilities
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import { AutocompleteCellType, CheckboxCellType, DateCellType, NumericCellType } from "handsontable/cellTypes";
import { CheckboxEditor, NumericEditor } from "handsontable/editors";
import { NUMERIC_VALIDATOR } from "handsontable/validators";
import { EDITOR_TYPE, VALIDATOR_TYPE } from "handsontable/editors/dateEditor";

//Material Table Import
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';


// External Libraries
import Swal from 'sweetalert2';
import { HyperFormula } from 'hyperformula';

// Data and Config
import { stock_name } from "../StockList";
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
  const gridRef = useRef(null);
  const hotRef = useRef(null); // Reference to Handsontable instance
  const [handsontableData, setHandsontableData] = useState([]);
  const [columnWidths, setColumnWidths] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(Handsontable.helper.createEmptySpreadsheetData(6, 10));
  let buttonClickCallback;
  const hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });

  // Utilize useMemo for static data like defaultColDef to avoid recalculations
  const defaultColDef = useMemo(() => ({
    flex: 1,
    minWidth: 115,
    sortable: true,
    resizable: true,
    wrapText: true,
    autoHeight: true,
    wrapHeaderText: true,
    autoHeaderHeight: true
  }), []);

  // Adjust column widths based on screen width
  const calculateColumnWidths = useCallback(() => {
    const screenWidth = window.innerWidth;
    const numberOfColumns = 15;
    const baseWidth = screenWidth / numberOfColumns;
    setColumnWidths(new Array(numberOfColumns).fill(baseWidth));
  }, []);

  //ParseDate Function
  function parseDate(dateString) {
    var parts = dateString.split("/");
    if (parts.length === 3) {
        return new Date(parts[2], parts[1] - 1, parts[0]);
    } else {
        return null;
    }
}
const handleAfterChange = (changes, source) => {
    if (source !== 'loadData') {
      // Save data to local storage after each change
      localStorage.setItem('handsontableData', JSON.stringify(data));
    }
  };

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
      const transformedData = data.map((item, index) => {
        // Check if sell_date is present and not empty
        const sellDatePresent = item.sell_date !== null && item.sell_date.trim() !== '';
        return [
          item.stock_name,
          item.buy_price,
          item.buy_date ? new Date(item.buy_date).toLocaleDateString() : '',
          item.quantity,
          item.sell_price,
          item.sell_date ? new Date(item.sell_date).toLocaleDateString() : '',
          // Only include formula if sell date is present, otherwise set to empty string or appropriate default
          sellDatePresent ? `=((B${index + 1} * D${index + 1} + E${index + 1} * D${index + 1}) * ${totalPercentageRate}) + 15.93` : '',
          sellDatePresent ? `=(F${index + 1}-C${index + 1})` : '',
          item.reason_to_buy,
          item.gtt_enabled, // Ensure this is formatted correctly for a checkbox or boolean value
          sellDatePresent ? `=((E${index + 1} * D${index + 1})-(B${index + 1} * D${index + 1}))` : '',
          sellDatePresent ? `=((((E${index + 1} * D${index + 1})-(B${index + 1} * D${index + 1})) / (B${index + 1} * D${index + 1})) * 100) & "%" ` : '',
          sellDatePresent ? `=(1+(((E${index + 1} * D${index + 1})-(B${index + 1} * D${index + 1}))/(B${index + 1}* D${index + 1})))^(365/(F${index + 1}-C${index + 1}))-1` : '',
          item.id,
          `=(B${index + 1}* D${index + 1})`,
        ];
      });
      setHandsontableData(transformedData);
    } catch (error) {
      console.error(error);
    }
  };

  // Initialize component and event listeners
  useEffect(() => {
    calculateColumnWidths();
    window.addEventListener('resize', calculateColumnWidths);
    getData();

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', calculateColumnWidths);
  }, [calculateColumnWidths]);

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
    const dataString = JSON.stringify(handsontableData);

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
      <HotTable
      ref={hotRef}
      id="hot"
      data={handsontableData}
      height={450}
      colWidths={columnWidths}
      colHeaders={[
        "Stock Symbol",
        "Buy Price",
        "Buy Date",
        "Quantity",
        "Sell Price",
        "Sell Date",
        "Brokerage",
        "Days Hold",
        "Reason to Buy",
        "GTT Enabled",
        "Profit / Loss",
        "Return %",
        "Annual ROI",
        "id",
        "Amount Invested"
      ]}
      className="customFilterButtonExample1"
      dropdownMenu={false}
      contextMenu={true}
      multiColumnSorting={true}
      filters={true}
      rowHeaders={true}
      collapsibleColumns={true}
      manualRowMove={true}
      manualColumnMove={false}
      afterChange={handleAfterChange}
      licenseKey="non-commercial-and-evaluation"
      columns={[
        {type:AutocompleteCellType,source:stock_name,strict:false},
        {type:NumericCellType,editor:NumericEditor,validator:NUMERIC_VALIDATOR},
        {type:DateCellType, editor: EDITOR_TYPE,validator:VALIDATOR_TYPE},
        {type:NumericCellType,editor:NumericEditor,validator:NUMERIC_VALIDATOR},
        {type:NumericCellType,editor:NumericEditor,validator:NUMERIC_VALIDATOR},
        {type:DateCellType, editor: EDITOR_TYPE,validator:VALIDATOR_TYPE},
        {readOnly:true},
        {readOnly:true},
        {},
        {type:CheckboxCellType,editor:CheckboxEditor},
        {readOnly:true},
        {readOnly:true},
        {readOnly:true},
        {readOnly:true},
        {readOnly:true}
      ]}
      formulas={{
        engine: hyperformulaInstance,
        sheetName: 'Sheet1',
      }}
     
    >
    </HotTable>
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
