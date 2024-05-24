import React from "react";
import { useSelector } from "react-redux";

const RiskManagement = () => {
  // const ledgerData = useSelector((state) => state.public.ledgerData); Redux appraoch
  const led = localStorage.getItem("ledgerData");

  return <h1>{JSON.stringify(led, null, 2)}</h1>;
};

export default RiskManagement;
