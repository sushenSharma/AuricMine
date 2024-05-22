import React from "react";
import { getStorageItem } from "../../utils/common-utils";
import Main from "../Main";
import { Navigate, Outlet } from "react-router-dom";

const AuthWrapper = () => {
  const activeUser = getStorageItem("userSession");

  if (activeUser) {
    return (
      <Main>
        <Outlet />
      </Main>
    );
  }

  return <Navigate to="/home" />;
};

export default AuthWrapper;
