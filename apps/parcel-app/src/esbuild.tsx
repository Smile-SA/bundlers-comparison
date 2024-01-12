import React from "react"
import ReactDOM from "react-dom/client"
import { Component, mock } from "esbuild-lib"
import "esbuild-lib/dist/esbuild-lib.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Component data={mock} />
  </React.StrictMode>
)
