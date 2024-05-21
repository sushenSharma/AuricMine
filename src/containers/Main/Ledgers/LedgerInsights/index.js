import React from "react";

const LedgerInsights = ({ textList }) => {
  const list = textList.map((text, index) => {
    if (text.length) {
      return <li key={index}>{text}</li>;
    }
    return null;
  });

  return <ul className="insights-list-container">{list}</ul>;
};

export default LedgerInsights;
