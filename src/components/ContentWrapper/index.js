import React from "react";

const ContentWrapper = ({ children, className }) => {
  return (
    <div className={`content-wrapper${className ? " " + className : ""}`}>
      {children}
    </div>
  );
};

export default ContentWrapper;
