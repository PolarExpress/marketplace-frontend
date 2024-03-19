/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import AddOnList from "../components/addonList/AddOnList";

/**
 * Represents the primary landing page of the add-ons marketplace.
 * It renders the AddOnList component to display available add-ons.
 */
export default function HomePage() {
  return (
    <div data-testid="homepage">
      <AddOnList />
    </div>
  );
}
