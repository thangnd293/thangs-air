import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

let root: ReactDOM.Root = null;

if (process.env.NODE_ENV === "development") {
  const rootEl = document.getElementById("_reminder-root");
  if (rootEl) {
    render(rootEl);
  }
}

export function render(rootEl: HTMLElement) {
  if (!root) root = ReactDOM.createRoot(rootEl);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
