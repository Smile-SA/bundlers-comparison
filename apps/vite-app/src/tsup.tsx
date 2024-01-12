import React from "react"
import ReactDOM from "react-dom/client"
import { Component, mock } from "tsup-lib";
import "tsup-lib/dist/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Component data={mock} />
  </React.StrictMode>
)
