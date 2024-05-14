import React, { useState } from "react";
import Posts from "./Posts";
import "../assets/styles/TabBar.css";
import { supabase, userIdKey } from "../constants";
import ComingSoon from "./Coming-soon";
import Ledgers from "../containers/Ledgers";

export default function TabBar(session) {
  console.log(session.sessionObj);

  const [select, setSelect] = useState("Ledger");
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        style={{
          backgroundColor: "#395947",
          height: "58px",
          width: "auto",
          padding: "0px 0px 0px 15px",
        }}
      >
        <span className="navbar-brand">TradingJournal.ai</span>
        <ul className="navbar-nav" style={{ width: "100%" }}>
          <li className="nav-item active">
            <button className="nav-link" onClick={() => setSelect("Ledger")}>
              Home
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Risk Management</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Watchlist</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Blogs</button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => setSelect("Coming soon")}
            >
              Coming soon
            </button>
          </li>
          <li
            className="navbar-text"
            style={{ display: "block", marginLeft: "auto" }}
          >
            <strong>Welcome: </strong>
            {session.sessionObj.user.email}
          </li>
          <li className="nav-item" style={{ display: "block" }}>
            <button
              className="nav-link"
              onClick={() => {
                supabase.auth.signOut();
                localStorage.removeItem(userIdKey);
              }}
            >
              Sign out
            </button>{" "}
          </li>
        </ul>
      </nav>

      <div>
        {select === "Ledger" && <Ledgers></Ledgers>}
        {select === "Risk Management" && <h2>Risk Management</h2>}
        {select === "Watchlist" && <h2>Watchlist</h2>}
        {select === "Blogposts" && <Posts />}
        {select === "Coming soon" && <ComingSoon />}
      </div>
    </>
  );
}
