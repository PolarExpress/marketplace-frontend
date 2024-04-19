/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { HomePage, AddonPage } from "./pages";
import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import { SetupBroker } from "./dataAccess/broker";

/**
 * The central application component, responsible for high-level page layout and
 * routing.
 */
const App = () => {
  return (
    <>
      <SetupBroker />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addons/:id" element={<AddonPage />} />
      </Routes>
    </>
  );
};

export default App;
