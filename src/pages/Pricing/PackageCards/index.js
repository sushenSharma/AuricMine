import React from "react";
import { preparePackageCardsData } from "./package-card-utils";
import { Grid } from "@mui/material";
import CardView from "./CardView";

const PackageCards = () => {
  const cardsList = preparePackageCardsData().map((item, index) => {
    console.log("item", item);
    return (
      <Grid item xs={4} key={index}>
        <CardView {...item} />
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      {cardsList}
    </Grid>
  );
};

export default PackageCards;
