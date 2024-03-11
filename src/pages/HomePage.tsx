/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Should represent the main marketplace landing page.
import AddOnList from "../features/addonList/AddOnList";

/**
 * Represents the primary landing page of the add-ons marketplace.
 * It renders the AddOnList component to display available add-ons.
 */
const HomePage = () => {
  return (
    <div data-testid="homepage">
      <AddOnList />;
    </div>
  );
};

export default HomePage;
