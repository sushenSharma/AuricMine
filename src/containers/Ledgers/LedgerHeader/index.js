import React from "react";

import LedgerButton from "../../../ui-kit/Buttons/LedgerButton";
import { getLabel } from "../../../hooks/ use-labels";

const LedgerHeader = () => {
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
        label={getLabel("saveChangesLabel")}
        type="outlined"
        variant="outlined"
        className="ledger-buttons save-changes"
        onClick={() => console.log("save-changes")}
        hoverType="success-color"
        size="md"
      />
      <LedgerButton
        label={getLabel("getInsightsLabel")}
        type="outlined"
        variant="outlined"
        className="ledger-buttons get-insights"
        onClick={() => console.log("get-insights")}
        hoverType="success-color"
        size="md"

      />
    </div>
  );
};

export default LedgerHeader;
