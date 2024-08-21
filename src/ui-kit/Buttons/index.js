import React from "react";
import LedgerButton from "./LedgerButton";
import "./styles.css";

const Buttons = ({ type, ...props }) => {
  const elementButton = {
    primary: () => <LedgerButton {...props} />,
    outlined: () => <LedgerButton {...props} />,
  };

  return elementButton[type]
    ? elementButton[type]()
    : console.log("button type does not exist");
};

export default Buttons;
