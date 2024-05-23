import React from "react";
import { getLabel } from "../../../../hooks/use-labels";

import AI from "@mui/icons-material/AutoFixHighOutlined";
import Download from "@mui/icons-material/DownloadOutlined";
import AddNewRow from "@mui/icons-material/AddToPhotosOutlined";
import LedgerButton from "../../../../ui-kit/Buttons/LedgerButton";

const LedgerHeader = ({ table, getInsights, disabled }) => {
  return (
    <div className="ledger-header-container">
      <LedgerButton
        label={getLabel("getInsightsLabel")}
        type="outlined"
        variant="contained"
        className="ledger-buttons get-insights"
        onClick={() => !disabled && getInsights()}
        hoverType="success-color"
        size="md"
        disable={disabled}
        icon={<AI></AI>}
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
        icon={<AddNewRow></AddNewRow>}
      />

      <LedgerButton
        label={getLabel("downloadCSVLabel")}
        type="outlined"
        variant="contained"
        className="ledger-buttons download-csv"
        onClick={() => console.log("download-csv")}
        hoverType="primary-color"
        size="md"
        icon={<Download></Download>}
        style={{ marginLeft: "auto" }}
      />
    </div>
  );
};

export default LedgerHeader;
