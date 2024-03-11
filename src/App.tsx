/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Should handle global routing and overall page layout
import HomePage from "./pages/HomePage";
import Header from "./components/Header";

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
