/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import AddonList from "../addonPage/addonList/addonList";

/**
 * Renders the primary landing page of the add-ons marketplace.
 */
const HomePage = () => {
  return (
    <section className="flex bg-gray-100 p-12" data-testid="homepage">
      <AddonList />
    </section>
  );
};

export default HomePage;
