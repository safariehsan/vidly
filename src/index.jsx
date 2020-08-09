import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "font-awesome/css/font-awesome.css";
import { BrowserRouter } from "react-router-dom";

console.log("ENV APP NAME > ", process.env.REACT_APP_NAME);
console.log("ENV APP VERSION > ", process.env.REACT_APP_VERSION);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
