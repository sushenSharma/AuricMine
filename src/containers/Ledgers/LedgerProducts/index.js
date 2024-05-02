import { useEffect, useState } from "react";
import { userIdKey } from "../../../constants.js";
import { getStorageStringItem } from "../../../utils/common-utils.js";

import LPListing from "./LPListing";
import { fetchUserLedgerData } from "./lib/api.js";
import { prepareUserLedgerData } from "./ledger-products-utils.js";

const LedgerProducts = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getLedgerProductList = () => {
      const user_uuid = getStorageStringItem(userIdKey);
      fetchUserLedgerData(user_uuid).then(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }

        const preparedData = prepareUserLedgerData(data);
        setProductList(preparedData);
      });
    };

    getLedgerProductList();
  }, []);

  const onSubmitNewProduct = ({ values, table }) => {
    console.log("values", values);
    console.log("table", table);
  };

  return (
    <div className="ledger-products-container">
      <LPListing items={productList} onSubmit={onSubmitNewProduct} />
    </div>
  );
};

export default LedgerProducts;
