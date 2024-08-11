import React, { useState } from "react";
import { getLabel } from "../../hooks/use-labels";

import TitleDescription from "../../components/TitleDescription";
import PackageCards from "./PackageCards";
import PlansAndFeatures from "./PlansAndFeatures";
import FAQs from "./FAQs";

import "./styles.css";
import PaymentForm from "./PaymentForm";
import SuccessScreen from "./PaymentForm/SuccessScreen";

const Pricing = () => {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [userData, setUserData] = useState("");

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const onSubmit = (user) => {
    setSubmitted(true);
    setUserData(user);
    setShowForm(false);
  };

  if (showForm) return <PaymentForm onSubmit={onSubmit} />;

  if (isSubmitted) return <SuccessScreen user={userData} />;

  return (
    <div className="pricing-page-container">
      <div className="pricing-page-content">
        <TitleDescription
          title={getLabel("pricingAndPlanTitle")}
          description={getLabel("pricingAndPlanDescription")}
          className="pricing-title"
        />
        <PackageCards onClickPackageHandler={toggleForm} />
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
