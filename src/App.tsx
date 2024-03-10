<<<<<<< HEAD
// Should handle global routing and overall page layout
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
=======
/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import "./App.css";
import { Counter } from "./features/counter/Counter";
import { Quotes } from "./features/quotes/Quotes";
import logo from "./logo.svg";
>>>>>>> c68b3a0 (Changed eslint config to flat config and added copyright plugin)

/**
 * The central application component, responsible for high-level page layout and routing.
 */
const App = () => {
  return (
    <>
      <Header />
      <HomePage />
    </>
  );
};

export default App;
