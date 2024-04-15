/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Main entry point for the application
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./data-access/store";
import { BrowserRouter as Router } from "react-router-dom";
import "./style.css";

/**
 * Register service worker and msw
 */
async function enableMocking() {
  // Don't enable mocking when in prod or when explicitly disabled
  if (!import.meta.env.DEV || !import.meta.env.VITE_MOCKING) return;

  const { setupWorker } = await import("msw/browser");
  const { handlers } = await import("./test/mswHandlers");
  await setupWorker(...handlers).start();
}

enableMocking().then(() => {
  const container = document.getElementById("root");

  if (container) {
    const root = createRoot(container);

    root.render(
      //</React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
      //<React.StrictMode>
    );
  } else {
    throw new Error(
      "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
    );
  }
});
