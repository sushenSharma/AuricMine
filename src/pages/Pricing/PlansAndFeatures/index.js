import React from "react";
import { columns, prepareTableData } from "./plan-and-features-utils";

import TableWrapper from "../../../components/TableWrapper";

import "./styles.css";

const PlansAndFeatures = () => {
  const rowData = prepareTableData();
  return (
    <div className="plan-and-features-container">
      {rowData.length && <TableWrapper columns={columns} rowsData={rowData} />}
    </div>
  );
};

export default PlansAndFeatures;
