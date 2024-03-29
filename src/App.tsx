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
import { EventBus } from "./components/EventBus";

/**
 * The central application component, responsible for high-level page layout and routing.
 */
const App = () => {
  return (
    <>
      <EventBus />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/addons/:id" element={<AddOnPage />} />
      </Routes>
    </>
  );
};

export default App;
