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
import { useAppSelector } from "./app/hooks";
import { RootState } from "./app/store";
import { useAuth } from "./features/authentication/useAuth";
import { useEffect } from "react";
import { Broker } from "./broker/broker";

/**
 * The central application component, responsible for high-level page layout and routing.
 */
const App = () => {
  const auth = useAppSelector((state: RootState) => state.auth);
  const { login } = useAuth();

  useEffect(() => {
    login();
  }, []);

  // Connects the WebSocket and sets authorisation header for the broker
  useEffect(() => {
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
