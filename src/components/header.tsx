/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import SearchBar from "./searchBar";

/**
 * Renders the main header area of the application, including a search bar.
 */
const Header = () => {
  return (
    <div
      className="relative flex justify-center border-b bg-gray-50 px-6 py-3 shadow-black hover:z-50 hover:shadow-md"
      data-testid="header">
      <SearchBar />
    </div>
  );
};

export default Header;
