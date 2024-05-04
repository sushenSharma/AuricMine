export const getSubmissionData = (fieldData, userUUID) => {
  return [
    {
      stock_name: fieldData.stockSymbol,
      buy_price: parseFloat(fieldData.buyPrice),
      buy_date: fieldData.buyDate || null,
      quantity: parseFloat(fieldData.quantity),
      sell_price: parseFloat(fieldData.sellPrice),
      sell_date: fieldData.sellDate || null,
      brokerage: parseFloat(fieldData.brokerage),
      days_hold: Number(fieldData.daysHold),
      reason_to_buy: fieldData.reasonToBuy,
      gtt_enabled: fieldData.gtt_enabled || "NO",
      profit_loss: parseFloat(fieldData.profitLoss),
      return_percent: parseFloat(fieldData.returnPercent),
      roce: parseFloat(fieldData.roce),
      annual_return_generated: parseFloat(fieldData.annualReturnGenerated),
      annual_roi: parseFloat(fieldData.annualROI),
      Amount: parseFloat(fieldData.Amount),
      user_id: userUUID,
    },
  ];
};
