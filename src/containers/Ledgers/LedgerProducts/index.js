import _ from "lodash";
import { useEffect, useState } from "react";
import { userIdKey } from "../../../constants.js";
import { getSubmissionData } from "./hooks.js";
import { useSelector } from "react-redux";
import { getLabel } from "../../../hooks/ use-labels.js";
import { dateValidations } from "./ledger-validations.js";
import { prepareUserLedgerData } from "./ledger-products-utils.js";
import { getStorageStringItem } from "../../../utils/common-utils.js";
import {
  deleteUserLedgerData,
  fetchUserLedgerData,
  postUserLedgerData,
  updateUserLedgerData,
} from "./lib/api.js";

import LPListing from "./LPListing";

import SwalNotification from "../../../components/SwalNotification/index.js";

const LedgerProducts = ({ tableAction, getUserData }) => {
  const user_uuid = getStorageStringItem(userIdKey);
  const [productList, setProductList] = useState([]);
  const { userUUID } = useSelector((state) => state.public);
  const [validSellDate, setValidSellDate] = useState(false);

  const [userID, setUserID] = useState("");

  useEffect(() => {
    if (userUUID || user_uuid) setUserID(userUUID || user_uuid);
  }, [userUUID, user_uuid]);

  useEffect(() => {
    if (userID) getLedgerProductList(userID, getUserData);
  }, [userID, getUserData]);

  const getLedgerProductList = async (userID, getUserData) => {
    fetchUserLedgerData(userID).then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }

      getUserData(JSON.stringify(data));
      const preparedData = prepareUserLedgerData(data);
      setProductList(preparedData);
    });
  };
  const onDeleteHandler = async (dataID) => {
    try {
      await deleteUserLedgerData(dataID);
      setProductList((currentList) =>
        currentList.filter((item) => item.id !== dataID)
      );

      SwalNotification({
        title: getLabel("successLabel"),
        text: getLabel("deleteDateContent"),
        iconType: "success",
        btnLabel: getLabel("okLabel"),
      });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const onFinishHandler = (values, action, table) => {
    const { id } = values;
    const rowData = getSubmissionData(values, user_uuid);

    if (!_.isEmpty(rowData)) {
      action === "insert" && onSubmit(rowData, table);
      action === "update" && onUpdate(id, rowData, table);
    }
  };

  const onSubmit = async (rowData, table) => {
    const valid = dateValidations(rowData[0]);

    if (valid) {
      postUserLedgerData(rowData)
        .then((response) => {
          table.setCreatingRow(null);
          getLedgerProductList(userID);

          SwalNotification({
            title: getLabel("successLabel"),
            text: getLabel("saveDataContent"),
            iconType: "success",
            btnLabel: getLabel("okLabel"),
          });
        })
        .catch((error) => console.error);
    } else {
      setValidSellDate(true);
    }
  };

  const onUpdate = (dataID, updatedData, table) => {
    const valid = dateValidations(updatedData[0]);

    if (valid) {
      updateUserLedgerData(dataID, updatedData)
        .then((response) => {
          getLedgerProductList(userID);
          table.setEditingRow(null);

          SwalNotification({
            title: getLabel("successLabel"),
            text: getLabel("saveDataContent"),
            iconType: "success",
            btnLabel: getLabel("okLabel"),
          });
        })
        .catch((error) => {
          console.error("Error updating data:", error);
        });
    } else {
      setValidSellDate(true);
    }
  };

  return (
    <div className="ledger-products-container">
      <LPListing
        items={productList}
        onSubmit={onFinishHandler}
        onDelete={onDeleteHandler}
        onEdit={onFinishHandler}
        invalidSellDate={validSellDate}
        sellDateFocused={() => setValidSellDate(false)}
        tableAction={tableAction}
      />
    </div>
  );
};

export default LedgerProducts;
