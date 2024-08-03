import React from "react";
import { preparePackageCardsData } from "./package-card-utils";
import { Grid } from "@mui/material";
import CardView from "./CardView";

import "./styles.css"

const PackageCards = () => {
  const cardsList = preparePackageCardsData().map((item, index) => {
    return (
      <Grid item xs={4} key={index}>
        <CardView {...item} />
      </Grid>
    );
  });

  return (
    <div className="package-cards-container">
      <Grid container spacing={4}>
        {cardsList}
      </Grid>
    </div>
  );
};

export default PackageCards;
