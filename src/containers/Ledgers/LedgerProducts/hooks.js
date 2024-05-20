const totalPercentageRate =
  0.001 + 0.0000325 + 0.00000001 + 0.18 * (0.0000325 + 0.00000001) + 0.00015;

export const getSubmissionData = (fieldData, userUUID) => {
  return [
    {
      stock_name: fieldData.stockSymbol,
      buy_price: parseFloat(fieldData.buyPrice),
      buy_date: fieldData.buyDate,
      quantity: parseFloat(fieldData.quantity),
      sell_price: parseFloat(fieldData.sellPrice),
      sell_date: fieldData.sellDate,
      brokerage: parseFloat(setBrokerage(fieldData)).toFixed(2),
      days_hold: setHoldDays(fieldData),
      reason_to_buy: fieldData.reasonToBuy,
      gtt_enabled: fieldData.gttEnabled,
      profit_loss: setProfitLoss(fieldData),
      roce: parseFloat(setRoce(fieldData)).toFixed(2),
      annual_return_generated: parseFloat(fieldData.annualReturnGenerated),
      Amount: setAmountInvested(fieldData),
      user_id: userUUID,
    },
  ];
};

const setProfitLoss = (fieldData) => {
  const { quantity, sellPrice, buyPrice } = fieldData;

  const sellQty = sellPrice * quantity;
  const buyQty = buyPrice * quantity;

  const profitLoss = (sellQty - buyQty).toFixed(2);

  return profitLoss;
};

const setAmountInvested = (fieldData) => {
  const { buyPrice, quantity } = fieldData;
  const buyQty = buyPrice * quantity;

  return buyQty.toFixed(2);
};

const setRoce = (fieldData) => {
  return (setProfitLoss(fieldData) / setAmountInvested(fieldData)) * 100;
};

const setBrokerage = (fieldData) => {
  const { buyPrice, quantity, sellPrice } = fieldData;
  const buyQty = buyPrice * quantity;
  const sellQty = sellPrice * quantity;

  return buyQty * totalPercentageRate + sellQty * totalPercentageRate + 15.93;
};

const setHoldDays = (fieldData) => {
  const { buyDate, sellDate } = fieldData;

  const buy = new Date(buyDate);
  const sell = new Date(sellDate);

  const diffTime = Math.abs(sell - buy);

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};
