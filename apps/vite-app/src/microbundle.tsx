import React from "react"
import ReactDOM from "react-dom/client"
import { Component, mock } from "microbundle-lib";
// import "microbundle-lib/dist/microbundle-lib.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Component data={mock} />
  </React.StrictMode>
)
