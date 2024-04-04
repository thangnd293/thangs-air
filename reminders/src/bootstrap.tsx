import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

if (process.env.NODE_ENV === "development") {
  const rootEl = document.getElementById("_reminder-root");
  if (rootEl) {
    render(rootEl);
  }
}

export function render(rootEl: HTMLElement) {
  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
