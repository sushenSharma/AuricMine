export const prepareUserLedgerData = (data) => {
  return data.map((item) => {
    return {
      amount: item.Amount,
      annualReturnGeneratd: item.annual_return_generated,
      brokerage: item.brokerage,
      buyDate: item.buy_date,
      buyPrice: item.buy_price,
      daysHold: item.days_hold,
      gtt_enabled: item.gtt_enabled,
      id: item.id,
      profitLoss: item.profit_loss,
      quantity: item.quantity,
      reasonToBuy: item.reason_to_buy,
      roce: item.roce,
      sellDate: item.sell_date,
      sellPrice: item.sell_price,
      stockId: item.stock_id,
      stockName: item.stock_name,
    };
  });
};
