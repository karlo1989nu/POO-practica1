import React from "react";
import ReactDOM from "react-dom/client";
// En src/index.js o src/App.js
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
