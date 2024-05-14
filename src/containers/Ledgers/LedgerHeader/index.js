import React from "react";

import LedgerButton from "../../../ui-kit/Buttons/LedgerButton";
import { getLabel } from "../../../hooks/ use-labels";

const LedgerHeader = ({ table, getInsights, disabled }) => {
  return (
    <div className="ledger-header-container">
      <LedgerButton
        label={getLabel("downloadCSVLabel")}
        type="outlined"
        variant="outlined"
        className="ledger-buttons download-csv"
        onClick={() => console.log("download-csv")}
        hoverType="primary-color"
        size="md"
      />

      <LedgerButton
        label={getLabel("getInsightsLabel")}
        type="outlined"
        variant="contained"
        className="ledger-buttons get-insights"
        onClick={() => !disabled && getInsights()}
        hoverType="success-color"
        size="md"
        disable={disabled}
      />

      <LedgerButton
        type="outlined"
        variant="contained"
        className="ledger-buttons create-row"
        onClick={() => {
          table.setCreatingRow(true);
        }}
        label={getLabel("insertNewRowLabel")}
        size="md"
      />
    </div>
  );
};

export default LedgerHeader;
