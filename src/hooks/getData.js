  // Fetch and process data from Supabase
import { supabase,openAIConfig,tableName } from "../config/index_supabase.js";
import { columns, userIdKey } from "../constants.js";
export const getData = async () => {
    try {
      const userUUID = localStorage.getItem(userIdKey);
      const { data, error } = await supabase
        .from(tableName)
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
  return transformedDataForMaterialTable;
    } catch (error) {
      console.error(error);
    }
  };