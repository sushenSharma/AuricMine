import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { openAIConfig, supabaseConfig } from "../config/index_supabase.js";
import { parseDate } from "./parseDate.js";
import { userIdKey } from "../constants.js";
import { GetData, useGetData } from "./DataFetching.js";

export const HandleSaveChanges = async () => {
  const userUUID = localStorage.getItem(userIdKey);
  const { getData } = useGetData();
  const hotRef = useRef(null);
  if (hotRef.current) {
    const hotData = hotRef.current.hotInstance.getData();

    const inserts = [];
    const updates = [];
    let emptyBuyDateFound = false;
    let sellDateBeforeBuyDateFound = false;
    hotData
      .filter((row) => row.some((cell) => cell !== "" && cell !== null))
      .forEach((rowArray) => {
        if (!rowArray[2] || rowArray[2] === "") {
          emptyBuyDateFound = true;
          return; // Skip processing this row
        }
        const buyDate = parseDate(rowArray[2]);
        const sellDateRaw = rowArray[5];
        const sellDate =
          sellDateRaw !== "" && sellDateRaw !== null
            ? parseDate(sellDateRaw)
            : null;
        if (sellDate && buyDate && sellDate < buyDate) {
          sellDateBeforeBuyDateFound = true;
          return; // Skip further processing of this row
        }
        let record = {
          stock_name: rowArray[0],
          buy_price: parseFloat(rowArray[1]),
          buy_date: isNaN(buyDate) ? null : buyDate.toISOString().split("T")[0],
          quantity: parseFloat(rowArray[3]),
          sell_price: parseFloat(rowArray[4]),
          sell_date: sellDate ? sellDate.toISOString().split("T")[0] : null,
          brokerage: parseFloat(rowArray[6]),
          days_hold: parseInt(rowArray[7], 10),
          reason_to_buy: rowArray[8],
          gtt_enabled: rowArray[9],
          profit_loss: parseFloat(rowArray[10]),
          roce: parseFloat(rowArray[11]),
          annual_return_generated: parseFloat(rowArray[12]),
          user_id: userUUID,
          Amount: parseFloat(rowArray[14]),
        };
        if (
          rowArray[13] !== null &&
          rowArray[13] !== undefined &&
          rowArray[13] !== ""
        ) {
          record.id = parseInt(rowArray[13], 10);
          updates.push(record);
        } else {
          inserts.push(record);
        }
      });
    if (emptyBuyDateFound) {
      Swal.fire({
        title: "Error!",
        text: "Buy date cannot be empty.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Stop execution if any buy date is empty
    }
    if (sellDateBeforeBuyDateFound) {
      Swal.fire({
        title: "Error!",
        text: "Sell date cannot be before the buy date.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Stop execution if sell date is before buy date
    }

    try {
      // Handle updates
      if (updates.length > 0) {
        const { error: updateError } = await supabaseConfig
          .from(openAIConfig.tableName)
          .upsert(updates, { onConflict: "id" });

        if (updateError) {
          throw updateError;
        }
      }

      // Handle inserts
      if (inserts.length > 0) {
        const { error: insertError } = await supabaseConfig
          .from(openAIConfig.tableName)
          .insert(inserts);

        if (insertError) {
          throw insertError;
        }
      }

      Swal.fire({
        title: "Success!",
        text: "Data saved successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
      await getData();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to save data: " + error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  } else {
    console.log("Instance is not yet available.");
  }
};

export const HandleGetInsights = async () => {
  const [loading, setLoading] = useState(false);
  const [materialdata, setMaterialData] = useState([]);
  const [response, setResponse] = useState("");
  setLoading(true);
  const dataString = JSON.stringify(materialdata);

  const requestBody = {
    prompt: `With json data ${JSON.stringify(dataString)}, ${
      openAIConfig.promptText
    }`,
    max_tokens: Math.min(dataString.length, 1000),
  };

  try {
    Swal.fire({
      title: "Success!",
      text: "Insights getting Generated!  Please Scroll Down",
      icon: "success",
      confirmButtonText: "OK",
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
