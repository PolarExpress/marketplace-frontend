// Should represent the main marketplace landing page.
import AddOnList from "../features/addonList/AddOnList";

const HomePage = () => {
  return (
    <div data-testid="homepage">
      <AddOnList />;
    </div>
  );
};

export default HomePage;
