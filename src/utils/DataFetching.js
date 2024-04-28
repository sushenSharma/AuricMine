import { useState } from "react";
import { supabaseConfig } from "../config/index_supabase.js";
import { userIdKey } from "../constants.js";

export const useGetData = () => {
  const [materialdata, setMaterialData] = useState([]);

  const getData = async () => {
    try {
      const userUUID = localStorage.getItem(userIdKey);
      const { data, error } = await supabaseConfig
        .from(process.env.REACT_APP_SUPABASE_TABLE_NAME)
        .select()
        .eq("user_id", userUUID)
        .order("buy_date", { ascending: true });

      if (error) throw error;

      // Process and transform data here...
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

  return { materialdata, getData };
};
