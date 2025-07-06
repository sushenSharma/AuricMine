import React from "react";

const ThemeLayout = ({ children }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        backgroundColor: "black", // Ensure the whole background is black
        display: "flex",
        flexDirection: "column",
      }}
    >
      <main className="main auricmine">{children}</main>
    </div>
  );
};

export default ThemeLayout;
