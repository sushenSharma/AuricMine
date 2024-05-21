import React, { Fragment, useState } from "react";
import AuthAPIs from "./bootstrap/AuthAPIs";
import AppContainer from "./bootstrap/AppContainer";

import "./assets/styles/App.css";

const App = () => {
  const activeUser = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);

  return (
    <Fragment>
      <AuthAPIs activeUser={activeUser} setLoading={setLoading} />
      {!loading ? <AppContainer /> : <Fragment></Fragment>}
    </Fragment>
  );
};

export default App;
