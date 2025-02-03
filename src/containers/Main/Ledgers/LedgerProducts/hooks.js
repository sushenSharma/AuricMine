const totalPercentageRate =
  0.001 + 0.0000307 + 0.0000057 + 0.18 * (0.0000325 + 0.00000001) + 0.00015;

export const getSubmissionData = (fieldData, userUUID) => {
  const sellPriceValid =
    fieldData.sellPrice !== null && fieldData.sellPrice !== undefined;
  const sellDateValid =
    fieldData.sellDate !== null && fieldData.sellDate !== undefined;

  return [
    {
      stock_name: fieldData.stockSymbol,
      buy_price: parseFloat(fieldData.buyPrice),
      buy_date: fieldData.buyDate,
      quantity: parseFloat(fieldData.quantity),
      sell_price: sellPriceValid ? parseFloat(fieldData.sellPrice) : null,
      sell_date: sellDateValid ? fieldData.sellDate : null,
      brokerage: parseFloat(setBrokerage(fieldData)).toFixed(2),
      days_hold: sellDateValid ? setHoldDays(fieldData) : null,
      reason_to_buy: fieldData.reasonToBuy,
      gtt_enabled: fieldData.gttEnabled,
      profit_loss: sellPriceValid ? setProfitLoss(fieldData) : null,
      roce: sellPriceValid ? parseFloat(setRoce(fieldData)).toFixed(2) : null,
      annual_return_generated: sellPriceValid
        ? parseFloat(setAnnualizedROI(fieldData)).toFixed(2)
        : null,
      Amount: setAmountInvested(fieldData),
      user_id: userUUID,
    },
  ];
};

const setProfitLoss = (fieldData) => {
  const { quantity, sellPrice, buyPrice } = fieldData;

  if (!sellPrice || !quantity || !buyPrice) return null;

  const sellQty = sellPrice * quantity;
  const buyQty = buyPrice * quantity;

  const profitLoss = Number((sellQty - buyQty).toFixed(2));

  return profitLoss;
};

const setAmountInvested = (fieldData) => {
  const { buyPrice, quantity } = fieldData;

  if (!buyPrice || !quantity) return 0;

  return Number((buyPrice * quantity).toFixed(2));
};

const setRoce = (fieldData) => {
  if (!fieldData.sellPrice) return null;

  const profitLoss = parseFloat(setProfitLoss(fieldData));
  const amountInvested = parseFloat(setAmountInvested(fieldData));
  const daysHold = setHoldDays(fieldData);

  if (!amountInvested || amountInvested <= 0 || !daysHold || daysHold <= 0) {
    return 0;
  }

  const annualizedReturn = (profitLoss / amountInvested) * 100;

  return Number(annualizedReturn.toFixed(2));
};

const setBrokerage = (fieldData) => {
  const { buyPrice, quantity, sellPrice } = fieldData;

  if (!buyPrice || !quantity) return 0;

  const buyQty = buyPrice * quantity;
  const sellQty = sellPrice ? sellPrice * quantity : 0; // Avoid NaN if sellPrice is null

  return Number(
    (
      buyQty * totalPercentageRate +
      sellQty * totalPercentageRate +
      15.93
    ).toFixed(2)
  );
};

const setHoldDays = (fieldData) => {
  const { buyDate, sellDate } = fieldData;

  if (!sellDate) return null;

  const buy = new Date(buyDate);
  const sell = new Date(sellDate);

  if (isNaN(buy) || isNaN(sell)) return null;

  const diffTime = Math.abs(sell - buy);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : null;
};

const setAnnualizedROI = (fieldData) => {
  const profitLoss = parseFloat(setProfitLoss(fieldData));
  const amountInvested =
    parseFloat(setAmountInvested(fieldData)) +
    parseFloat(setBrokerage(fieldData));
  const daysHold = setHoldDays(fieldData);

  if (!amountInvested || amountInvested <= 0 || !daysHold || daysHold <= 0)
    return 0;

  const annualizedReturn =
    ((1 + profitLoss / amountInvested) ** (365 / daysHold) - 1) * 100;

  return Number(annualizedReturn.toFixed(2));
};
