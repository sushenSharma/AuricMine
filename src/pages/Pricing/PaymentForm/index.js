import { useState } from "react";
import { fieldData } from "./fields-data";
import { getLabel } from "../../../hooks/use-labels";
import {
  getSubmissionData,
  updatedFormData,
} from "../../../hooks/form-helpers";

import FormFactory from "../../../components/FormFactory";
import TitleDescription from "../../../components/TitleDescription";
import LedgerButton from "../../../ui-kit/Buttons/LedgerButton";
import "./styles.css";
import Loader from "../../../components/Loader";

const PaymentForm = ({ onSubmit: onSuccess }) => {
  const { fields } = fieldData();

  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState(fields);
  const [errors, setErrors] = useState({});

  const onChangeHandler = (value, key) => {
    const { updateFormFields } = updatedFormData(formFields, value, key);
    const updateErrors = { ...errors };

    updateErrors[key] = "";

    setFormFields(updateFormFields);
    setErrors(updateErrors);
  };

  const onFinishHandler = () => {
    const { fieldData, required } = getSubmissionData(formFields);

    if (Object.keys(required).length) {
      setErrors(required);
    } else {
      setLoading(true);
      console.log("aa");
      setTimeout(() => {
        onSubmit(fieldData);
      }, 2000);
    }
  };

  const onSubmit = (fieldData) => {
    const { MUID } = fieldData;
    onSuccess(MUID);
    setLoading(false);
  };

  return (
    <div className="payment-form-container">
      <TitleDescription
        title={getLabel("paymentGatewayLabel")}
        className="payment-gateway-title"
      />
      <div className="trading-journal-content">
        <form
          onSubmit={onFinishHandler}
          className="trading-journal-form-details"
        >
          <FormFactory
            formElementsTypes={formFields}
            onChangeHandler={onChangeHandler}
            errors={errors}
            className="trading-journal-form-factory"
          />
        </form>

        {loading && <Loader className="payment-gateway-loader" />}

        <div className="payment-form-btn-contianer">
          <LedgerButton
            type="primary"
            label={getLabel("payWithLabel")}
            size="md"
            className="phonepe-button"
            onClick={onFinishHandler}
            disable={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
