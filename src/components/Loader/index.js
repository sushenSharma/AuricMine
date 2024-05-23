import React from "react";

import "./styles.css";

const Loader = ({ className }) => {
  return (
    <div className="loader-container">
      <div className={`loader-sinpper-container ${className || ""}`}></div>
    </div>
  );
};

export default Loader;
