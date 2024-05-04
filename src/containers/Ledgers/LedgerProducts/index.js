import _ from "lodash";
import { useEffect, useState } from "react";
import { userIdKey } from "../../../constants.js";
import { getStorageStringItem } from "../../../utils/common-utils.js";

import LPListing from "./LPListing";
import {
  deleteUserLedgerData,
  fetchUserLedgerData,
  postUserLedgerData,
  updateUserLedgerData,
} from "./lib/api.js";
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

  const onDeleteHandler = async (dataID) => {
    deleteUserLedgerData(dataID)
      .then((response) => {
        console.log("Deleted successfully:", response);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
      });
  };

  const onFinishHandler = (values, action) => {
    const { id } = values;
    const rowData = getSubmissionData(values, user_uuid);
    if (!_.isEmpty(rowData)) {
      action === "insert" && onSubmit(rowData);
      action === "update" && onUpdate(id, rowData);
    }
  };

  const onSubmit = async (rowData) => {
    const { data, error } = await postUserLedgerData(rowData);
    console.log("data", data);
    console.log("error", error);
  };

  const onUpdate = (dataID, updatedData) => {
    updateUserLedgerData(dataID, updatedData)
      .then((response) => {
        console.log("Update successful:", response);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <div className="ledger-products-container">
      <LPListing
        items={productList}
        onSubmit={onFinishHandler}
        onDelete={onDeleteHandler}
        onEdit={onFinishHandler}
      />
    </div>
  );
};

export default LedgerProducts;
