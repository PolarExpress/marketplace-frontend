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
