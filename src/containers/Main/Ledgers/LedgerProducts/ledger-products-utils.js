export const prepareUserLedgerData = (data) => {
  return data.map((item) => {
    return {
      id: item.id,
      stockSymbol: item.stock_name,
      buyPrice: item.buy_price,
      buyDate: item.buy_date,
      quantity: item.quantity,
      sellPrice: item.sell_price,
      sellDate: item.sell_date,
      brokerage: item.brokerage,
      daysHold: item.days_hold,
      reasonToBuy: item.reason_to_buy,
      gttEnabled: item.gtt_enabled,
      profitLoss: item.profit_loss,
      amount: item.Amount,
      annualReturnGenerated: item.annual_return_generated,
      roce: item.roce,
    };
  });
};
