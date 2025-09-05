import React, { useState } from "react";
import { fieldData } from "./fields-data";
import { getLabel } from "../../../hooks/use-labels";
import {
  getSubmissionData,
  updatedFormData,
} from "../../../hooks/form-helpers";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../../utils/stripe";
import { supabase } from "../../../config/index_supabase.js";

import FormFactory from "../../../components/FormFactory";
import TitleDescription from "../../../components/TitleDescription";
import LedgerButton from "../../../ui-kit/Buttons/LedgerButton";
import Loader from "../../../components/Loader";
import "./styles.css";

const PaymentForm = ({ onSubmit: onSuccess }) => {
  const { fields } = fieldData();
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [formFields, setFormFields] = useState(fields);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);

  const onChangeHandler = (value, key) => {
    const { updateFormFields } = updatedFormData(formFields, value, key);
    const updateErrors = { ...errors };

    updateErrors[key] = "";

    setFormFields(updateFormFields);
    setErrors(updateErrors);
  };

  const onFinishHandler = () => {
    const { fieldData, required } = getSubmissionData(formFields);

    // Add amount validation
    if (fieldData.amount && (fieldData.amount < 50 || fieldData.amount > 500)) {
      setErrors({ amount: "Amount must be between $50 and $500" });
      return;
    }

    if (Object.keys(required).length) {
      setErrors(required);
    } else {
      setLoading(true);
      setTimeout(() => {
        onSubmit(fieldData);
      }, 1000);
    }
  };

  const onSubmit = async (fieldData) => {
    if (!stripe || !elements) {
      setError("Payment system is not loaded yet. Please try again.");
      setLoading(false);
      return;
    }

    setError(null);

    try {
      const { clientSecret, paymentIntentId } = await createPaymentIntent(
        fieldData.amount,
        'usd',
        {
          user_email: fieldData.MUID,
          user_name: fieldData.name,
          user_phone: fieldData.mobile,
        }
      );

      const insertData = {
        amount: fieldData.amount * 100,
        currency: 'usd',
        payment_intent_id: paymentIntentId,
        status: 'pending',
        user_id: fieldData.MUID,
        user_email: fieldData.MUID,
        user_phone: fieldData.mobile,
      };

      const { error: insertError } = await supabase
        .from("stripe_payments")
        .insert(insertData);

      if (insertError) {
        console.warn("Failed to save payment record:", insertError);
      }

      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: fieldData.name,
            email: fieldData.MUID,
            phone: fieldData.mobile,
          },
        },
      });

      if (paymentError) {
        setError(paymentError.message);
        
        await supabase
          .from("stripe_payments")
          .update({ status: 'failed', error_message: paymentError.message })
          .eq("payment_intent_id", paymentIntentId);
      } else if (paymentIntent.status === 'succeeded') {
        await supabase
          .from("stripe_payments")
          .update({ 
            status: 'succeeded', 
            payment_method_id: paymentIntent.payment_method,
          })
          .eq("payment_intent_id", paymentIntentId);

        alert(`Payment Successful! You paid $${fieldData.amount}`);
        const { MUID } = fieldData;
        onSuccess(MUID);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
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

        <div className="card-element-container">
          <CardElement options={cardElementOptions} />
        </div>
        
        {error && (
          <div className="stripe-error-message">
            {error}
          </div>
        )}

        {loading && <Loader className="payment-gateway-loader" />}

        <div className="payment-form-btn-contianer">
          <LedgerButton
            type="primary"
            label={loading ? "Processing..." : getLabel("payWithLabel")}
            size="md"
            className="stripe-pay-button"
            onClick={onFinishHandler}
            disable={!stripe || loading}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;