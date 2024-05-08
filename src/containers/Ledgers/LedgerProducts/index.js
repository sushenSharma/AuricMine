import _ from "lodash";
import { useEffect, useState } from "react";
import { userIdKey } from "../../../constants.js";
import { getSubmissionData } from "./hooks.js";
import { useSelector } from "react-redux";
import { prepareUserLedgerData } from "./ledger-products-utils.js";
import { getStorageStringItem } from "../../../utils/common-utils.js";
import {
  deleteUserLedgerData,
  fetchUserLedgerData,
  postUserLedgerData,
  updateUserLedgerData,
} from "./lib/api.js";

import Swal from "sweetalert2";
import LPListing from "./LPListing";

import { dateValidations } from "./ledger-validations.js";

const LedgerProducts = () => {
  const user_uuid = getStorageStringItem(userIdKey);
  const [productList, setProductList] = useState([]);
  const { userUUID } = useSelector((state) => state.public);
  const [validSellDate, setValidSellDate] = useState(false);

  const [userID, setUserID] = useState("");

  useEffect(() => {
    if (userUUID || user_uuid) setUserID(userUUID || user_uuid);
  }, [userUUID, user_uuid]);

  useEffect(() => {
    if (userID) getLedgerProductList(userID);
  }, [userID]);

  const getLedgerProductList = async (userID) => {
    fetchUserLedgerData(userID).then(({ data, error }) => {
      if (error) {
        console.log(error);
        return;
      }

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
      Swal.fire({
        title: "Success!",
        text: "Data deleted successfully!",
        icon: "success",
        confirmButtonText: "OK",
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
          Swal.fire({
            title: "Success!",
            text: "Data saved successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error) => console.error);
    } else {
      setValidSellDate(true);
    }
  };

  const onUpdate = (dataID, updatedData, table) => {
    updateUserLedgerData(dataID, updatedData)
      .then((response) => {
        table.setEditingRow(null);
        Swal.fire({
          title: "Success!",
          text: "Data saved successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
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
        invalidSellDate={validSellDate}
        sellDateFocused={() => setValidSellDate(false)}
      />
    </div>
  );
};

export default LedgerProducts;
