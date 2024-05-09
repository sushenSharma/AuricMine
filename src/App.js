import React, { useEffect, useState } from "react";

import { Navigate, Route, Routes } from 'react-router-dom';

import TabBar from "./components/TabBar";
import LandingPage from "./components/landing_Page";

import "./assets/styles/App.css";
import { PATHS } from "./constants/routerConstant";
import AuthPage from "./components/login_page";
import PrivateRoute from "./config/private_routing";
const App = () => {

  return (  <Routes>
    <Route exact path={PATHS.DEFAULT_LOGIN} element={<AuthPage />} />
    <Route exact path={PATHS.DEFAULT_HOME} element={<LandingPage/>}/>
    {/* <Route exact path={PATHS.TABLE} element={<TabBar/>}/> */}
    <Route
          exact
          path={PATHS.TABLE}
          element={
            <PrivateRoute>
              <TabBar />
            </PrivateRoute>
          }
        />
  </Routes>
  );
};

export default App;
