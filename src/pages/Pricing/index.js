import React from "react";
import { getLabel } from "../../hooks/use-labels";

import TitleDescription from "../../components/TitleDescription";
import PackageCards from "./PackageCards";
import PlansAndFeatures from "./PlansAndFeatures";
import FAQs from "./FAQs";

import "./styles.css";

const Pricing = () => {
  return (
    <div className="pricing-page-container">
      <div className="pricing-page-content">
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
        <PlansAndFeatures />
      </div>
      <div className="pricing-page-faqs">
        <TitleDescription
          title={getLabel("faqLabel")}
          className="pricing-title"
        />
        <FAQs />
      </div>
    </div>
  );
};

export default Pricing;
