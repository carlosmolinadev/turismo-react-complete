import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import reducer, { initialState } from "../src/reducers/reducer";
import { StateProvider } from "./StateProvide";

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <Router>
      <App />
    </Router>
  </StateProvider>,
  document.getElementById("root")
);
