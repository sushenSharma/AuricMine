export const fieldData = () => {
  return {
    fields: {
      amount: {
        elementConfigs: {
          fieldLabel: "",
          label: "Amount",
          type: "number",
          placeholder: "Amount",
          className: "single-form-item",
          required: false,
          variant: "filled",
          requiredTxt: "Required!",
        },
        value: "",
      },
      MUID: {
        elementConfigs: {
          fieldLabel: "",
          label: "User ID",
          type: "string",
          placeholder: "User ID",
          className: "form-element-item",
          required: false,
          variant: "filled",
          requiredTxt: "Required!",
        },
        value: "",
      },
      number: {
        elementConfigs: {
          fieldLabel: "",
          label: "Phone No",
          type: "phone",
          placeholder: "Merchant ID",
          className: "form-element-item",
          required: false,
          variant: "filled",
          requiredTxt: "Required!",
          withCountryCode: true,
          countryCallingCodeEditable: false,
          international: true,
          defaultCountry: "IN",
          countryOptions: ["GB", "AE", "CA", "IN", "PK", "QA", "SA", "MY"],
        },
        value: "",
      },
    },
  };
};
