import _ from "lodash";
import { getLabel } from "../../../hooks/use-labels";
import { useEffect, useState } from "react";
import { fetchInsightsWithAI } from "./LedgerProducts/lib/api";

import LedgerHeader from "./LedgerHeader";
import LedgerProducts from "./LedgerProducts";
import LedgerInsights from "./LedgerInsights";
import ContentWrapper from "../../../components/ContentWrapper";
import ModalContainer from "../../../components/ModalContainer";
import Box from "@mui/material/Box";

import "./styles.css";
import { useDispatch } from "react-redux";
import { getLedgerData } from "../../../redux/reducers/public/public-action";
import PaymentForm1 from "../../../pages/Pricing/PaymentForm/index1";
import { useNavigate } from "react-router-dom";
import { getStorageItem, setStorageItem } from "../../../utils/common-utils";
import { featuresKey } from "../../../constants";
import { supabase } from "../../../config/index_supabase";
import { userUUID } from "../../../constants/constant";

let timer = null;

const Ledgers = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [tableAction, setTableAction] = useState(null);
  const [userData, setUserData] = useState("");
  const [insightsData, setInsightsData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [openPayment, setOpenPayment] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(userData)) {
      setDisabled(false);
      dispatch(getLedgerData(userData));
      localStorage.setItem("ledgerData", JSON.stringify(userData));
    }
  }, [userData, dispatch]);

  const getInsightsWithAI = (userData) => {
    toggle();
    fetchInsightsWithAI(userData)
      .then(async (response) => {
        setInsightsData(response);

        let features = getStorageItem(featuresKey);
        const insight_c_updated = features.insight_c + 1;
        features.insight_c = insight_c_updated;
        setStorageItem(featuresKey, features);

        const { error: updateErrorFeatures } = await supabase
          .from("features")
          .update({ insight_c: insight_c_updated })
          .eq('user_id', features.user_id);

        if (updateErrorFeatures) {
          throw updateErrorFeatures;
        }
      })
      .catch(console.error);
  };

  const showPaymentForm = () => {
    togglePayment();
  };

  const handleTableAction = (table) => {
    timer = setTimeout(() => {
      setTableAction(table);
    }, 100);
  };

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const togglePayment = () => {
    setOpenPayment((prev) => !prev);
  };

  const renderModal = () => {
    if (!open) return null;

    const modalProps = {
      open,
      handleClose: toggle,
      title: getLabel("insightAILabel"),
    };

    return (
      <ModalContainer {...modalProps}>
        {insightsData.length ? (
          <LedgerInsights textList={insightsData} />
        ) : (
          <div className="center-align">Loading...</div>
        )}
      </ModalContainer>
    );
  };

  const renderModalPayment = () => {
    if (!openPayment) return null;
    const modalProps = {
      open: openPayment,
      handleClose: togglePayment,
    };
    return (
      <PaymentForm1 {...modalProps} />
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 1,
        border: "0px solid black",
        maxWidth: "auto",
        margin: "auto",
        overflowX: "auto", // Horizontal scrolling
        overflowY: "hidden", // Disable vertical scrolling
        backgroundColor: "#black", // Set background color to black
        color: "white", // Set text color to white for readability
      }}
    >
      <LedgerHeader
        table={tableAction}
        getInsights={() => getInsightsWithAI(userData)}
        disabled={disabled}
        showPayment={() => showPaymentForm()}
      />
      <LedgerProducts
        tableAction={handleTableAction}
        getUserData={setUserData}
      />
      {renderModal()}
      {renderModalPayment()}
    </Box>
  );
};

export default Ledgers;
