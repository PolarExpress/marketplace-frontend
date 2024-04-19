/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Should represent the main marketplace landing page.
import AddonList from "../addonPage/addonList/addonList";

/**
 * Represents the primary landing page of the add-ons marketplace. It renders
 * the AddonList component to display available add-ons.
 */
const HomePage = () => {
  return (
    <section
      data-testid="homepage"
      className="flex bg-gray-100 justify-left p-12">
      <AddonList />
    </section>
  );
};

export default HomePage;
