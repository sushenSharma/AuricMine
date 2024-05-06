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
      annual_return_generated:
        parseFloat(fieldData.annualReturnGenerated) || 1132.56721533624,
      Amount: setAmountInvested(fieldData),
      user_id: userUUID,
    },
  ];
};

const setProfitLoss = (fieldData) => {
  const { quantity, sellPrice, buy_price } = fieldData;

  const sellQty = sellPrice * quantity;
  const buyQty = buy_price * quantity;

  return parseFloat(sellQty - buyQty).toFixed(2);
};

const setAmountInvested = (fieldData) => {
  const { buy_price, quantity } = fieldData;
  const buyQty = buy_price * quantity;

  return parseFloat(buyQty).toFixed(2);
};

const setRoce = (fieldData) => {
  return (setProfitLoss(fieldData) / setAmountInvested(fieldData)) * 100;
};

const setBrokerage = (fieldData) => {
  const { buy_price, quantity, sell_price } = fieldData;
  const buyQty = buy_price * quantity;
  const sellQty = sell_price * quantity;

  return buyQty + sellQty + totalPercentageRate + 15.93;
};

const setHoldDays = (fieldData) => {
  const { buy_date, sell_date } = fieldData;

  const diffTime = Math.abs(sell_date - buy_date);

  return diffTime;
};
