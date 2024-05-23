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

let timer = null;

const Ledgers = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [tableAction, setTableAction] = useState(null);
  const [userData, setUserData] = useState("");
  const [insightsData, setInsightsData] = useState([]);
  const [disabled, setDisabled] = useState(true);

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
      .then((response) => {
        setInsightsData(response);
      })
      .catch(console.error);
  };

  const handleTableAction = (table) => {
    timer = setTimeout(() => {
      setTableAction(table);
    }, 100);
  };

  const toggle = () => {
    setOpen((prev) => !prev);
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

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        border: "1px solid grey",
        maxWidth: "auto",
        margin: "auto",
        overflowX: "auto", // Horizontal scrolling
        overflowY: "false", // No vertical scrolling
      }}
    >
      <ContentWrapper className="ledgers-container">
        <LedgerHeader
          table={tableAction}
          getInsights={() => getInsightsWithAI(userData)}
          disabled={disabled}
        />
        <LedgerProducts
          tableAction={handleTableAction}
          getUserData={setUserData}
        />
        {renderModal()}
      </ContentWrapper>
    </Box>
  );
};

export default Ledgers;
