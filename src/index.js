import React from "react";
import App from "./App";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import posthog from 'posthog-js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./index.css";
import { store } from "./redux";

posthog.init('phc_qEYCDugMjj0dLqvkOcZVz6PpVmWWediikdPtNrFHIbN', {
  api_host: 'https://us.i.posthog.com',
  person_profiles: 'identified_only', // Only track identified users
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
