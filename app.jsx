/* import React */
import React from "react";
import ReactDOM from "react-dom";

/* import default style */
import "./css/reset/resetcss.css";
import "./css/main/main.css";

/* import necessary components */
import { App } from "./components/App/App.jsx"


ReactDOM.render(
  <App />,
  document.querySelector(".wrapper")
);