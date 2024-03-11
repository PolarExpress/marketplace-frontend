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
