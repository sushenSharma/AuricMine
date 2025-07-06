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
import { useRazorpay } from "react-razorpay";
import { supabase } from "../../../config/index_supabase.js";
import { paymentStatusKey } from "../../../constants.js";

const PaymentForm = ({ onSubmit: onSuccess }) => {
  const { fields } = fieldData();

  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState(fields);
  const [errors, setErrors] = useState({});

  const { error, isLoading, Razorpay } = useRazorpay();

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
    payNow(fieldData);
    setLoading(false);
  };

  const payNow = async (fieldData) => {
    // console.log("->fieldData"+JSON.stringify(fieldData))
    const data = {
      amount: fieldData.amount,
      loc: 'IND' // Required parameter for the API
    };
    try {
      const response = await fetch(
        process.env.REACT_APP_BE_BASE_URL + "/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
        //Order created, storing in DB
        const insertData = {
          amount: result.amount,
          attempts: result.attempts,
          currency: result.currency,
          entity: result.entity,
          order_id: result.id,
          receipt: result.receipt,
          status: result.status,
          user_id: fieldData.MUID,
          user_email: fieldData.MUID,
          user_phone: fieldData.mobile,
        };
        const { error: insertError } = await supabase
          .from("payments")
          .insert(insertData);

        if (insertError) {
          throw insertError;
        }

        PaymentComponent(fieldData, result);
      } else {
        console.error("Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const PaymentComponent = (fieldData, orderData) => {
    const options = {
      key: process.env.REACT_APP_RP_KEY_ID,
      amount: orderData.amount, // Amount in paise
      currency: orderData.currency,
      name: "AuricMine",
      description: "AI feature payment",
      order_id: orderData.id, // Generate order_id on server
      handler: async (response) => {
        alert("Payment Successful!");
        // console.log(response);

        const updateData = {
          payment_id: response.razorpay_payment_id,
          status: paymentStatusKey,
        };

        const { error: updateError } = await supabase
          .from("payments")
          .update(updateData)
          .eq("order_id", orderData.id);

        if (updateError) {
          throw updateError;
        }

        const { MUID } = fieldData;
        onSuccess(MUID);
      },

      prefill: {
        name: fieldData.name,
        email: fieldData.MUID,
        contact: fieldData.mobile,
      },
      theme: {
        color: "#4340f5",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
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
