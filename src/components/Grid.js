import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { createClient } from "@supabase/supabase-js";
import "../assets/styles/Grid.css";
import { columns, userIdKey } from "../constants.js";
import "pikaday/css/pikaday.css";
import "../assets/styles/styles.css";
import { HotTable, HotColumn } from "@handsontable/react";
import { data } from "../components/constants.ts";
// import { ProgressBarRenderer } from "../renderers/ProgressBar.tsx";
// import { StarsRenderer } from "../renderers/Stars.tsx";
// import {
//   drawCheckboxInRowHeaders,
//   addClassesToRows,
//   changeCheckboxCell,
//   alignHeaders
// } from "./hooksCallbacks.ts";
import "handsontable/dist/handsontable.min.css";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const apiUrl = process.env.REACT_APP_OPENAI_URL;
const promptText = process.env.REACT_APP_OPENAI_API_PROMPT;
const tableName = process.env.REACT_APP_SUPABASE_TABLE_NAME;

export default function Grid() {
  const gridRef = useRef(null);
  const [rowData, setRowData] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [columnDefs, setColumnDefs] = useState([]);

  //Umashankar
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 115,
      sortable: true,      
      resizable: true,
      wrapText: true,
      autoHeight: true,
      wrapHeaderText: true,
      autoHeaderHeight: true
    };
  }, []);

  const userUUID = localStorage.getItem(userIdKey);
  
  useEffect(() => {
    setColumnDefs(columns);
    async function getData() {
      try {
        const { data, error } = await supabase.from(tableName).select()
        .eq("user_id", userUUID) //Umashankar
        .order("buy_date", { ascending: true }); //Umashankar

        if (error) {
          throw error;
        }

        setRowData(data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
 
  const handleAddRow = async () => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .insert({user_id : userUUID})
        .select();

      if (error) {
        throw error;
      }
   
      const { id, user_id } = data[0]; //Umashankar
      gridRef.current.api.applyTransaction({ add: [{ id, user_id }] }); //Umashankar
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveRow = useCallback(async () => {
    const confirmation = window.confirm("Are you sure?");
    if (!confirmation) return;

    const selectedData = gridRef.current.api.getSelectedRows();
    const { id } = selectedData[0];

    try {
      const { error } = await supabase.from(tableName).delete().eq("id", id);

      if (error) {
        throw error;
      }

      gridRef.current.api.applyTransaction({ remove: selectedData });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSaveChanges = async () => {
    const displayedRows = [];

    gridRef.current.api.forEachNodeAfterFilterAndSort(function (rowNode) {
      const rowData = rowNode.data;
      displayedRows.push(rowData);
    });

    try {
      const { data, error } = await supabase
        .from(tableName)
        .upsert(displayedRows)
        .select();

      if (error) {
        throw error;
      }

      setRowData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetInsights = async () => {
    setLoading(true);
    const dataString = JSON.stringify(rowData);

    const requestBody = {
      prompt: `With json data ${JSON.stringify(dataString)}, ${promptText}`,
      max_tokens: Math.min(dataString.length, 1000),
    };

    try {
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

  return (
    <>
    <div style={{padding: '10px 10px',
  backgroundColor: 'ghostwhite'}}>
        <button className="btn btn-outline-primary btn-sm m-1" onClick={handleAddRow}>Add Row</button>
        <button className="btn btn-outline-danger btn-sm m-1" onClick={handleRemoveRow}>Delete Row</button>
        <button className="btn btn-outline-success btn-sm m-1" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    <div className="App ">
      
      <div className="ag-theme-alpine grid-theme-alpine" style={{height: '525px'}}>

<HotTable
      data={rowData}
      height={450}
      colWidths={[140,140, 126, 192, 100, 100, 90, 90, 110, 97,110,110,110]}
      colHeaders={[
        "Stock Name",
        "Buy Price",
        "Buy Date",
        "Amount Invested",
        "Sell Price",
        "Sell Date",
        "Brokerage",
        "Days Hold",
        "Reason to Buy",
        "GTT Enabled",
        "Profit / Loss",
        "ROCE",
        "Annual Return Generated"
      ]}
      dropdownMenu={true}
      hiddenColumns={{
        indicators: true
      }}
      contextMenu={true}
      multiColumnSorting={true}
      filters={true}
      rowHeaders={true}
      // afterGetColHeader={alignHeaders}
      // beforeRenderer={addClassesToRows}
      // afterGetRowHeader={drawCheckboxInRowHeaders}
      // afterOnCellMouseDown={changeCheckboxCell}
      manualRowMove={true}
      licenseKey="non-commercial-and-evaluation"
    >
      <HotColumn data={1} />
      <HotColumn data={2} />
      <HotColumn data={3} />
      <HotColumn data={4} type="date"/>
      <HotColumn data={5} />
      <HotColumn data={6}/>
      <HotColumn data={7} />
      <HotColumn data={8}/>
      {/* <HotColumn data={7} type="numeric" /> */}
      {/* <HotColumn data={8} readOnly={true} className="htMiddle"> */}
        {/* @ts-ignore Element inherits some props. It's hard to type it. */}
        {/* <ProgressBarRenderer hot-renderer /> */}
      
      <HotColumn data={10} readOnly={true} className="htCenter">
        {/* @ts-ignore Element inherits some props. It's hard to type it. */}
        {/* <StarsRenderer hot-renderer /> */}
      </HotColumn>
    </HotTable>
      </div>
      <div className="buttons">
        <button className="btn btn-outline-primary m-1" onClick={handleGetInsights}>Get Insights with AI</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {response && response.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )}
    </div>
    </>
  );
}
