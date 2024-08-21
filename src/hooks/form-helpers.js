export const updatedFormData = (formFields, value, key) => {
  const errors = {};
  const updateFormFields = { ...formFields };
  updateFormFields[key].value = value;
  errors[key] = "";

  return {
    updateFormFields,
    errors,
  };
};

export const getSubmissionData = (formFields) => {
  const fieldData = {};
  const required = {};

  for (let key in formFields) {
    const { elementConfigs } = formFields[key];
    const { validField = true } = elementConfigs;

    if (validField) {
      const value = formFields[key].value ? formFields[key].value : "";
      const fieldValue = value;

      if (fieldValue) {
        fieldData[key] = fieldValue;
      } else {
        required[key] = requiredText(formFields[key]);
      }
    }
  }
  return {
    fieldData,
    required,
  };
};

const requiredText = (field) => {
  const { elementConfigs } = field;
  const { requiredTxt } = elementConfigs;

  return requiredTxt || "Required";
};
