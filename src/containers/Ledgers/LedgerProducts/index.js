import _ from "lodash";
import { useEffect, useState } from "react";
import { userIdKey } from "../../../constants.js";
import { getStorageStringItem } from "../../../utils/common-utils.js";

import LPListing from "./LPListing";
import { fetchUserLedgerData, postUserLedgerData } from "./lib/api.js";
import { prepareUserLedgerData } from "./ledger-products-utils.js";
import { getSubmissionData } from "./hooks.js";

const LedgerProducts = () => {
  const user_uuid = getStorageStringItem(userIdKey);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const getLedgerProductList = () => {
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
  }, [user_uuid]);

  const onFinishHandler = ({ values, table }) => {
    const rowData = getSubmissionData(values, user_uuid);
    if (!_.isEmpty(rowData)) {
      onSubmit(rowData, table);
    }
  };

  const onSubmit = (rowData, table) => {
    postUserLedgerData(rowData).then(({ data, error }) => {
      console.log("error", error);
      console.log("data", data);
    });
    // table.setEditingRow(null);
  };

  return (
    <div className="ledger-products-container">
      <LPListing items={productList} onSubmit={onFinishHandler} />
    </div>
  );
};

export default LedgerProducts;
