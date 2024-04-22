/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import { SetupBroker } from "./dataAccess/broker";
import { AddonPage, HomePage } from "./pages";

/**
 * The central application component, responsible for high-level page layout and routing.
 */
const App = () => {
  return (
    <>
      <SetupBroker />
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<AddonPage />} path="/addons/:id" />
      </Routes>
    </>
  );
};

export default App;
