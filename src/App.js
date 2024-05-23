import _ from "lodash";
import { useSelector } from "react-redux";
import React, { Fragment, useEffect, useState } from "react";

import AuthAPIs from "./bootstrap/AuthAPIs";
import AppContainer from "./bootstrap/AppContainer";

import "./assets/styles/App.css";

const App = () => {
  const { userSession } = useSelector((state) => state.public);
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    if (!_.isEmpty(userSession)) {
      setIsActive(userSession);
    }
  }, [userSession]);

  const [loading, setLoading] = useState(true);

  return (
    <Fragment>
      <AuthAPIs activeUser={isActive} setLoading={setLoading} />
      {!loading ? <AppContainer /> : <Fragment></Fragment>}
    </Fragment>
  );
};

export default App;
