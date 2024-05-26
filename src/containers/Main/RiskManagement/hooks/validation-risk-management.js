import _ from "lodash";

export const getSubmissionData = (formFields) => {
  let valid = true;
  const errors = {};
  const fieldData = {};

  for (let key in formFields) {
    const value = formFields[key];

    if (value) {
      fieldData[setFormKeys[key]] = value;
    } else {
      valid = false;
      errors[key] = "Required!";
    }
  }

  return { valid, errors, fieldData };
};

export const isError = (formError, key) => {
  switch (key) {
    case "seedCapital":
      return !_.isEmpty(formError) && formError.seedCapital;
    case "initialRisk":
      return !_.isEmpty(formError) && formError.initialRisk;
    case "regularIncome":
      return !_.isEmpty(formError) && formError.regularIncome;
    case "provisioningPercentage":
      return !_.isEmpty(formError) && formError.provisioningPercentage;
    default:
      return false;
  }
};

const setFormKeys = {
  seedCapital: "SeedCapital",
  initialRisk: "SeedRisk",
  regularIncome: "IncomeCashflow",
  provisioningPercentage: "PercentageCashflowRisk",
};
