import { errorMessage } from "../../../../utils/validation";

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
    reasonToBuy:
      !validateRequired(product.reasonToBuy) && errorMessage.reasonToBuy,
    gttEnabled:
      !validateRequired(product.gttEnabled) && errorMessage.gttEnabled,
  };
};

export const dateValidations = ({ buy_date, sell_date }) => {
  const buyDate = new Date(buy_date);
  const sellDate = new Date(sell_date);

  if (buyDate > sellDate) {
    return false;
  }

  return true;
};
