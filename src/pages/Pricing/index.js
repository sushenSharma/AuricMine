import React from "react";
import { getLabel } from "../../hooks/use-labels";

import TitleDescription from "../../components/TitleDescription";
import PackageCards from "./PackageCards";

const Pricing = () => {
  return (
    <div className="pricing-page-container">
      <TitleDescription
        title={getLabel("pricingAndPlanTitle")}
        description={getLabel("pricingAndPlanDescription")}
        className="pricing-title"
      />
      <PackageCards />
      <TitleDescription
        title={getLabel("compareAndPlanFeatures")}
        description={getLabel("chosePlanFeatureDescription")}
        className="pricing-title"
      />
    </div>
  );
};

export default Pricing;
