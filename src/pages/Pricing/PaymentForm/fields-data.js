import { indAmount, nonIndAmount } from "../../../constants";
import { isIndianUser } from "../../../utils/common-utils";

export const fieldData = (isIndianUser) => {
  return {
    fields: {
      // name: {
      //   elementConfigs: {
      //     fieldLabel: "",
      //     label: "User Name",
      //     type: "string",
      //     placeholder: "User Name",
      //     className: "form-element-item",
      //     required: false,
      //     variant: "filled",
      //     requiredTxt: "Required!",
      //   },
      //   value: "",
      // },
      // MUID: {
      //   elementConfigs: {
      //     fieldLabel: "",
      //     label: "User ID",
      //     type: "string",
      //     placeholder: "User ID",
      //     className: "form-element-item",
      //     required: false,
      //     variant: "filled",
      //     requiredTxt: "Required!",
      //   },
      //   value: "",
      // },
      // mobile: {
      //   elementConfigs: {
      //     fieldLabel: "",
      //     label: "Mobile",
      //     type: "number",
      //     placeholder: "Mobile number",
      //     className: "form-element-item",
      //     required: false,
      //     variant: "filled",
      //     requiredTxt: "Required!",
      //   },
      //   value: "",
      // },
      amount: {
        elementConfigs: {
          fieldLabel: "",
          label: "Amount ($)",
          type: "number",
          placeholder: "Amount (minimum $50, maximum $500)",
          className: "single-form-item",
          required: true,
          variant: "filled",
          requiredTxt: "Required!",
          min: 50,
          max: 500,
        },
        value: 100,
      },
      
    },
  };
};
