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
import { store } from "./app/store";
import { BrowserRouter as Router } from "react-router-dom";
import "./style.css";

/**
 * Register service worker and msw
 */
async function enableMocking() {
  // Don't enable mocking when in prod or when explicitly disabled
  if (!import.meta.env.DEV || !import.meta.env.VITE_MOCKING) return;

  const { setupWorker } = await import("msw/browser");
  const { handlers } = await import("./test/mocks");
  await setupWorker(...handlers).start();
}

enableMocking().then(() => {
  const container = document.getElementById("root");

  if (container) {
    const root = createRoot(container);

    let poop = <p className="text-blue-600 font-extrabold mb-9">Does it work please</p>;

    root.render(

    <Provider store={store}>    
      <Router>
        <App />
        <p className="text-center text-blue-700 uppercase font-extrabold"> This is a test</p>
        <p className="text-center text-red-700 uppercase font-extrabold"> This is also test</p>
      </Router>
      <p className=" front-bold border border-solid">What if outside router?</p>
    </Provider>
      //<React.StrictMode>
      
      //</React.StrictMode>
    );
  } else {
    throw new Error(
      "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
    );
  }
});
