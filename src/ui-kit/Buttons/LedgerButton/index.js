import { Button } from "@mui/material";
import React from "react";

const LedgerButton = ({
  type,
  label,
  size = "lg",
  disable = false,
  onClick,
  htmlType = null,
  className,
  icon,
  width,
  style,
  variant,
  hoverType,
}) => {
  const { pixels, unit } = width || { pixels: null, unit: null };

  const styles = {
    width:
      width && typeof width === "object" ? `${pixels}${unit}` : `${width}px`,
    ...style,
  };

  return (
    <Button
      type={htmlType}
      id={label}
      className={`${className} button-box-shadow ledger-button button-${
        size ? size : "default"
      } ${!disable ? `${type}-enabled` : `${type}-disabled`}${
        hoverType ? " " + hoverType : ""
      }`}
      onClick={(e) => {
        e.preventDefault();
        !disable && onClick && onClick(e);
      }}
      style={{ ...styles }}
      variant={variant}
    >
      {icon && <span>{icon}</span>}
      {label && label}
    </Button>
  );
};

export default LedgerButton;
