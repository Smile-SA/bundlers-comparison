import React from "react"
import ReactDOM from "react-dom/client"
import { Component, mock } from "bun-lib";
// import "bun-lib/dist/Component-4ce917d7ccb9f26e.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Component data={mock} />
  </React.StrictMode>
)
