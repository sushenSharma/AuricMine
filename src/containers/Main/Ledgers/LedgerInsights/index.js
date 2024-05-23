import React from "react";

const LedgerInsights = ({ textList }) => {
  return (
    <div className="insights-list-container">
      <div className="title">AI Generated Insights</div>
      <ul>
        {textList.map((text, index) =>
          text.length ? <li key={index}>{text}</li> : null
        )}
      </ul>
    </div>
  );
};

export default LedgerInsights;
