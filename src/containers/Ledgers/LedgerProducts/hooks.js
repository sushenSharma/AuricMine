export const getSubmissionData = (fieldData, userUUID) => {
  return [
    {
      stock_name: fieldData.stockSymbol,
      buy_price: parseFloat(fieldData.buyPrice),
      buy_date: fieldData.buyDate || null,
      quantity: parseFloat(fieldData.quantity),
      sell_price: parseFloat(fieldData.sellPrice),
      sell_date: fieldData.sellDate || null,
      brokerage: parseFloat(fieldData.brokerage) || 564,
      days_hold: Number(fieldData.daysHold) || 18,
      reason_to_buy: fieldData.reasonToBuy,
      gtt_enabled: fieldData.gttEnabled,
      profit_loss: parseFloat(fieldData.profitLoss) || 90000,
      roce: parseFloat(fieldData.roce) || 16.6666666666667,
      annual_return_generated:
        parseFloat(fieldData.annualReturnGenerated) || 1132.56721533624,
      Amount: parseFloat(fieldData.amount) || 540000,
      user_id: userUUID,
    },
  ];
};
