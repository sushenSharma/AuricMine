import React, { useEffect, useState } from "react";
import { getLabel } from "../../../../hooks/use-labels";

import AI from "@mui/icons-material/AutoFixHighOutlined";
import Download from "@mui/icons-material/DownloadOutlined";
import AddNewRow from "@mui/icons-material/AddToPhotosOutlined";
import LedgerButton from "../../../../ui-kit/Buttons/LedgerButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getStorageItem } from "../../../../utils/common-utils";
import { featuresKey, paymentStatusKey } from "../../../../constants";

const LedgerHeader = ({ table, getInsights, disabled, showPayment }) => {
  const features = getStorageItem(featuresKey);
  return (
    <div className="ledger-header-container">
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
        label={getLabel("getInsightsLabel")}
        type="outlined"
        variant="contained"
        className="ledger-buttons get-insights"
        onClick={() => !disabled && getInsights()}
        hoverType="success-color"
        size="md"
        disable={
          disabled ||
          (features &&
            features.p_status != paymentStatusKey &&
            features.insight_c >= 5)
        }
        icon={<AI></AI>}
      />

      <LedgerButton
        type="outlined"
        variant="contained"
        className="ledger-buttons create-row"
        onClick={() => showPayment()}
        label={getLabel("upgradeToPremiumLabel")}
        size="md"
        disable={features && features.p_status == paymentStatusKey}
        icon={<ShoppingCartIcon></ShoppingCartIcon>}
        style={{ marginLeft: "auto" }}
      />
    </div>
  );
};

export default LedgerHeader;
