/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import AddOnPage from "./pages/AddOnPage";
import { useAuthorizationCache } from "./app/hooks";
import { useAuth } from "./features/authentication/useAuth";
import { useEffect } from "react";
import { importBroker } from "./utils/mocking-utils";

/**
 * The central application component, responsible for high-level page layout and routing.
 */
const App = () => {
  // TODO: find a better place for logging in and connecting to the WebSocket
  const auth = useAuthorizationCache();
  const { login } = useAuth();

  /* eslint-disable react-hooks/exhaustive-deps -- everything breaks if login is a dependency */
  useEffect(() => {
    login();
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  // Connects the WebSocket and sets authorisation header for the broker
  useEffect(() => {
    const connect = async () => {
      const { Broker } = await importBroker();
      if (auth.authorized && auth.jwt) {
        console.log("Connecting broker");
        Broker.instance()
          .useAuth(auth)
          .connect(() => {
            console.log("WS connected", window.location.search);
          });
      } else {
        // dispatch(logout());
      }
    };
    connect();
  }, [auth]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addons/:id" element={<AddOnPage />} />
      </Routes>
    </>
  );
};

export default App;
