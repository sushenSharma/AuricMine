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
import Swal from 'sweetalert2';

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
  const hotRef = useRef(null); // Reference to the Handsontable instance
  const [data, setData] = useState(Handsontable.helper.createEmptySpreadsheetData(6, 10));
  const [handsontableData, setHandsontableData] = useState([]);
  let buttonClickCallback;

  

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
    const numberOfColumns = 15; // Adjust this based on your number of columns
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
    // Load data from local storage on component mount
    const savedData = JSON.parse(localStorage.getItem('handsontableData'));
    if (savedData) {
      setData(savedData);
    }
  }, []);

  async function getData() {
    try {
      const { data, error } = await supabase.from(tableName).select()
        .eq("user_id", userUUID)
        .order("buy_date", { ascending: true });
  
      if (error) {
        throw error;
      }
  
    
      let totalPercentageRate = 0.001 + 0.0000325 + 0.00000001 + 0.18 * (0.0000325 + 0.00000001) + 0.00015;
      // Transform data from array of objects to array of arrays
      const transformedData = data.map((item,index) => [
        item.stock_name,
        item.buy_price,
        item.buy_date ? new Date(item.buy_date).toLocaleDateString() : '',
        item.quantity,
        item.sell_price,
        item.sell_date ? new Date(item.sell_date).toLocaleDateString() : '',
        `=((B${index + 1} * D${index + 1} + E${index + 1} * D${index + 1}) * ${totalPercentageRate}) + 15.93`,
        `=(F${index + 1}-C${index + 1})`,
        item.reason_to_buy,
        item.gtt_enabled, // Ensure this is formatted correctly for a checkbox
        `=((E${index + 1} * D${index + 1})-(B${index + 1} * D${index + 1}))`,
        `=((((E${index + 1} * D${index + 1})-(B${index + 1} * D${index + 1})) / (B${index + 1} * D${index + 1})) * 100) & "%"`,
        `=(1+(((E${index + 1} * D${index + 1})-(B${index + 1} * D${index + 1}))/(B${index + 1}* D${index + 1})))^(365/(F${index + 1}-C${index + 1}))-1`,
        item.id,
        `=(B${index + 1}* D${index + 1})`,
      ]);
  
      setHandsontableData(transformedData); 
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    calculateColumnWidths();

    // Re-calculate on window resize
    window.addEventListener('resize', calculateColumnWidths);
    setColumnDefs(columns);
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


  function parseDate(dateString) {
    var parts = dateString.split("/");
    if (parts.length === 3) {
        return new Date(parts[2], parts[1] - 1, parts[0]);
    } else {
        return null;
    }
}

  const handleSaveChanges = async () => {
    if (hotRef.current) {
      const hotData = hotRef.current.hotInstance.getData();
      console.log(hotData);
      console.log(userUUID);
      
      const inserts = [];
      const updates = [];
      
      hotData.filter(row => row.some(cell => cell !== "" && cell !== null))
        .forEach(rowArray => {
          const buyDate = parseDate(rowArray[2]);
          const sellDate = parseDate(rowArray[5]);
          let record = {
            stock_name: rowArray[0],
            buy_price: parseFloat(rowArray[1]),
            buy_date: isNaN(buyDate) ? null : buyDate.toISOString().split('T')[0],
            quantity : parseFloat(rowArray[3]),
            sell_price: parseFloat(rowArray[4]),
            sell_date: isNaN(sellDate) ? null : sellDate.toISOString().split('T')[0],
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
          console.log(record)
          if (rowArray[13] !== null && rowArray[13] !== undefined && rowArray[13] !== "") {
            record.id = parseInt(rowArray[13], 10);
            updates.push(record);
          } else {
            inserts.push(record);
          }
        });
  
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
  // const handsontable = Handsontable.helper.createEmptySpreadsheetData(15,13)
  const hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });
  

  useEffect(() => {
    // Load data from local storage on component mount
    const savedData = JSON.parse(localStorage.getItem('handsontableData'));
    if (savedData) {
      setData(savedData);
    }
  }, []);

  const handleAfterChange = (changes, source) => {
    if (source !== 'loadData') {
      // Save data to local storage after each change
      localStorage.setItem('handsontableData', JSON.stringify(data));
    }
  };
  useEffect(() => {
    const hot = hotRef.current.hotInstance;

    const exportPlugin = hot.getPlugin('exportFile');
    buttonClickCallback = () => {
      exportPlugin.downloadFile('csv', {
        bom: false,
        columnDelimiter: ',',
        columnHeaders: true,
        exportHiddenColumns: true,
        exportHiddenRows: true,
        fileExtension: 'csv',
        filename: 'TradingLedger-CSV-file_[YYYY]-[MM]-[DD]',
        mimeType: 'text/csv',
        rowDelimiter: '\r\n',
        rowHeaders: true
      });
    };
  });
  return (
    <>
<div style={{ display: 'flex', alignItems: 'center', padding: '10px 10px', backgroundColor: 'ghostwhite', justifyContent: 'space-between' }}>
    <div>
        <button className="btn btn-outline-primary btn-sm m-1" style={{ boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #007bff' }} onClick={(...args) => buttonClickCallback(...args)}>Download CSV</button>
        {/* <button className="btn btn-outline-primary btn-sm m-1" style={{ boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #007bff' }} onClick={handleAddRow}>Add Row</button>
        <button className="btn btn-outline-danger btn-sm m-1" style={{ boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #dc3545' }} onClick={handleRemoveRow}>Delete Row</button> */}
        <button className="btn btn-outline-success btn-sm m-1" style={{ boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #28a745' }} onClick={handleSaveChanges}>Save Changes</button>
    </div>
    <button 
        className="btn btn-outline-success btn-sm m-1" 
        style={{ margin: '10px', padding: '10px 20px', fontSize: '16px', backgroundColor: 'lightred', color: 'black', boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2)', border: '1px solid #28a745' }} 
        onClick={handleGetInsights}>
        Get Insights with AI
    </button>
</div>



    <div className="App ">
      
      <div className="ag-theme-alpine grid-theme-alpine" style={{height: '525px'}}>

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
      
      <div className="buttons" style={{ textAlign: 'center', margin: '20px' }}>

  </div>
  <div style={{ textAlign: 'center' }}>
  </div>
  {loading ? (
    <p style={{ textAlign: 'center', fontSize: '20px', color: '#333', margin: '20px 0' }}>Loading...</p>
) : (
    <ul style={{ listStyleType: 'none', paddingLeft: '0', margin: '0', padding: '0' }}>
      {response && response.map((item, index) => (
        <li key={index} style={{ background: '#f9f9f9', margin: '10px 0', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontSize: '16px', lineHeight: '1.6' }}>
          {item}
        </li>
      ))}
    </ul>
)}

    </div>
    </>
  );
}

