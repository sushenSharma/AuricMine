import React from "react";
import { preparePackageCardsData } from "./package-card-utils";
import { Grid } from "@mui/material";
import CardView from "./CardView";

import "./styles.css";
import { setColSize } from "../../../utils/common-utils";

const PackageCards = ({ onClickPackageHandler }) => {
  const cardsList = preparePackageCardsData(onClickPackageHandler).map(
    (item, index) => {
      return (
        <Grid item {...setColSize(4, 4, 12, 12, 12)} key={index}>
          <CardView {...item} />
        </Grid>
      );
    }
  );

  return (
    <div className="package-cards-container">
      <Grid container spacing={4}>
        {cardsList}
      </Grid>
    </div>
  );
};

export default PackageCards;
