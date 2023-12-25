import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { createClient } from "@supabase/supabase-js";
import "../assets/styles/Grid.css";
import { columns, userIdKey } from "../constants.js";
import "pikaday/css/pikaday.css";
import "../assets/styles/styles.css";
import { HotTable } from "@handsontable/react";
import { AutocompleteCellType, CheckboxCellType, DateCellType, NumericCellType } from "handsontable/cellTypes";
import { CheckboxEditor,  NumericEditor } from "handsontable/editors";
import { NUMERIC_VALIDATOR } from "handsontable/validators";
import Handsontable from "handsontable";
import 'handsontable/dist/handsontable.full.min.css';
import { EDITOR_TYPE } from "handsontable/editors/dateEditor";
import { VALIDATOR_TYPE } from "handsontable/validators/dateValidator";
import { stock_name } from "../StockList";
import { HyperFormula } from 'hyperformula';

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
  const [columnWidths, setColumnWidths] = useState([]);

  const customHeaderRenderer = (instance, column, colIndex) => {
    const columnTitle = column.getColHeader(colIndex);
    const headerElement = document.createElement('div');
    
    // Create title element
    const titleElement = document.createElement('span');
    titleElement.textContent = columnTitle;
    headerElement.appendChild(titleElement);

    // Add a spacer
    const spacerElement = document.createElement('span');
    spacerElement.style.marginLeft = '5px'; // Adjust the space here
    headerElement.appendChild(spacerElement);

    return headerElement;
  };

  const calculateColumnWidths = () => {
    // Example: Adjust column widths based on screen width
    const screenWidth = window.innerWidth;
    const numberOfColumns = 13; // Adjust this based on your number of columns
    const baseWidth = screenWidth / numberOfColumns;

    const newWidths = new Array(numberOfColumns).fill(baseWidth);
    setColumnWidths(newWidths);
  };

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
    calculateColumnWidths();

    // Re-calculate on window resize
    window.addEventListener('resize', calculateColumnWidths);

    
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
  const handsontable = Handsontable.helper.createEmptySpreadsheetData(15,13)
  const hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });

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
      data={handsontable}
      height={450}
      colWidths={columnWidths}
      colHeaders={[
        "Stock Symbol",
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
      contextMenu={true}
      multiColumnSorting={true}
      filters={true}
      rowHeaders={true}
      collapsibleColumns={true}
      manualRowMove={true}
      manualColumnMove={false}
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
      ]}
      formulas={{
        engine: hyperformulaInstance,
        sheetName: 'Sheet1',
      }}
    >
      
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
