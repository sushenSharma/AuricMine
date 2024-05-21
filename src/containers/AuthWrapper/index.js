import React from "react";
import { getStorageItem } from "../../utils/common-utils";
import Main from "../Main";
import { Outlet } from "react-router-dom";
import LandingPage from "../../components/landing_Page";

const AuthWrapper = () => {
  const activeUser = getStorageItem("userId");
  if (activeUser) {
    <Main>
      <Outlet />
    </Main>;
  }

  return <LandingPage />;
};
export default AuthWrapper;
