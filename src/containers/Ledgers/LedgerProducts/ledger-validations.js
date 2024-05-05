import { errorMessage } from "../../../utils/validation";

const validateRequired = (value) => !!value.length;

export const ledgerProdcutValidation = (product) => {
  return {
    stockSymbol:
      !validateRequired(product.stockSymbol) && errorMessage.stockSymbol,
    buyPrice: !validateRequired(product.buyPrice) && errorMessage.buyPrice,
    buyDate: !validateRequired(product.buyDate) && errorMessage.buyDate,
    quantity: !validateRequired(product.quantity) && errorMessage.quantity,
    sellPrice: !validateRequired(product.sellPrice) && errorMessage.sellPrice,
    sellDate: !validateRequired(product.sellDate) && errorMessage.sellDate,
    brokerage: !validateRequired(product.brokerage) && errorMessage.brokerage,
    daysHold: !validateRequired(product.daysHold) && errorMessage.daysHold,
    reasonToBuy:
      !validateRequired(product.reasonToBuy) && errorMessage.reasonToBuy,
    gttEnabled:
      !validateRequired(product.gttEnabled) && errorMessage.gttEnabled,
    profitLoss:
      !validateRequired(product.profitLoss) && errorMessage.profitLoss,
    amount: !validateRequired(product.amount) && errorMessage.amount,
    annualReturnGenerated:
      !validateRequired(product.annualReturnGenerated) &&
      errorMessage.annualReturnGenerated,
    roce: !validateRequired(product.roce) && errorMessage.roce,
  };
};
