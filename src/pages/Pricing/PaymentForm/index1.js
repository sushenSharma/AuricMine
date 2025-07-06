import { useEffect, useState } from "react";
import { getLabel } from "../../../hooks/use-labels";
import TitleDescription from "../../../components/TitleDescription";
import LedgerButton from "../../../ui-kit/Buttons/LedgerButton";
import "./styles.css";
import Loader from "../../../components/Loader";
import { useRazorpay } from "react-razorpay";
import { supabase } from "../../../config/index_supabase.js";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { fieldData } from "./fields-data.js";
import {
  getSubmissionData,
  updatedFormData,
} from "../../../hooks/form-helpers.js";
import FormFactory from "../../../components/FormFactory/index.js";
import {
  getActiveUser,
  getStorageItem,
  isIndianUser,
  setStorageItem,
} from "../../../utils/common-utils.js";
import { featuresKey, indAmount, indLabel, nonIndLabel, paymentStatusKey } from "../../../constants.js";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#0e0e0f",
  width: 600,
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  borderRadius: "25px",
};

const PaymentForm1 = ({ open, handleClose }) => {
  // console.log("isIndianUser",isIndianUser())
  const { fields } = fieldData(isIndianUser());
  const [formFields, setFormFields] = useState(fields);
  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

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
      // console.log("aa");
      setTimeout(() => {
        onSubmit(fieldData);
      }, 2000);
    }
  };

  const onSubmit = (fieldData) => {
    const userInfo = getActiveUser();
    if (!userInfo) {
      Swal.fire({
        title: "Error!",
        text: "Please login to continue with payment",
        icon: "error",
        confirmButtonText: "OK",
      });
      setLoading(false);
      return;
    }
    Object.assign(fieldData, {
      MUID: userInfo.id,
      email: userInfo.email,
      phone: userInfo.phone,
      loc: fieldData.amount == indAmount ? indLabel : nonIndLabel
    });
    // console.log("fieldData",fieldData);
    payNow(fieldData);

    setLoading(false);
  };

  const payNow = async (fieldData) => {
    // console.log("->fieldData"+JSON.stringify(fieldData))
    const data = {
      amount: fieldData.amount,
      loc: fieldData.loc
    };
    try {
      // Call the payments API
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      //Order created, storing in DB
      const insertData = {
        amount: result.amount,
        attempts: result.attempts || 0,
        currency: result.currency || "INR",
        entity: result.entity || "order",
        order_id: result.id,
        receipt: result.receipt,
        status: result.status || "created",
        user_id: fieldData.MUID,
        user_email: fieldData.email,
        user_phone: parseInt(fieldData.phone),
      };
      const { error: insertError } = await supabase
        .from("payments")
        .insert(insertData);

      if (insertError) {
        throw insertError;
      }

      PaymentComponent(fieldData, result);
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: "Payment initialization failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
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
        Swal.fire({
          title: "Success!",
          text: "Payment Success!",
          icon: "success",
          confirmButtonText: "OK",
        });
        // console.log(response);
        // console.log('Success:', response);
        const updateData = {
          payment_id: response.razorpay_payment_id,
          status: paymentStatusKey,
        };

        const { error: updateErrorPayment } = await supabase
          .from("payments")
          .update(updateData)
          .eq("order_id", orderData.id);

        let features = getStorageItem(featuresKey) || {};
        features.p_status = paymentStatusKey;
        setStorageItem(featuresKey, features);

        // Try to update features table, but don't fail if it doesn't exist
        try {
          const { error: updateErrorFeatures } = await supabase
            .from("features")
            .update({ p_status: paymentStatusKey })
            .eq("user_id", features.user_id);
          
          if (updateErrorFeatures) {
            console.warn("Features table update failed (table may not exist):", updateErrorFeatures);
          }
        } catch (featuresError) {
          console.warn("Features table not available:", featuresError);
        }

        if (updateErrorPayment) {
          throw updateErrorPayment;
        }
        if (updateErrorFeatures) {
          throw updateErrorFeatures;
        }
        handleClose();
      },

      // prefill: {
      //   name: "name",
      //   email: "MUID",
      //   contact: "mobile",
      // },
      theme: {
        color: "#4340f5",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="payment-form-container">
                <TitleDescription
                  title={getLabel("paymentGatewayLabel")}
                  className="payment-gateway-title"
                />
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
                  &nbsp;&nbsp;&nbsp;
                  <LedgerButton
                    type="secoundary"
                    label={getLabel("closeBtnLabel")}
                    size="md"
                    className="phonepe-button"
                    onClick={handleClose}
                  />
                </div>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PaymentForm1;
