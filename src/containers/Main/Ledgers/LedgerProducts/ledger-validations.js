import { errorMessage } from "../../../../utils/validation";

const validateRequired = (value) => !!value.length;

export const ledgerProdcutValidation = (product) => {
  if (!validateRequired(product.sellPrice)) {
    product.sellPrice = null;
  }
  if (!validateRequired(product.sellDate)) {
    product.sellDate = null;
  }

  return {
    stockSymbol:
      !validateRequired(product.stockSymbol) && errorMessage.stockSymbol,
    buyPrice: !validateRequired(product.buyPrice) && errorMessage.buyPrice,
    buyDate: !validateRequired(product.buyDate) && errorMessage.buyDate,
    quantity: !validateRequired(product.quantity) && errorMessage.quantity,
    reasonToBuy:
      !validateRequired(product.reasonToBuy) && errorMessage.reasonToBuy,
    gttEnabled:
      !validateRequired(product.gttEnabled) && errorMessage.gttEnabled,
  };
};

export const dateValidations = ({ buy_date, sell_date }) => {
  const buyDate = new Date(buy_date);
  if (!sell_date) {
    return true;
  }
  const sellDate = new Date(sell_date);

  if (buyDate > sellDate) {
    return false;
  }

  return true;
};
