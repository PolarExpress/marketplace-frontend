/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import SearchBar from "./SearchBar";
//import LoginButton from "./LoginButton";

/**
 * The Header component renders the main header area of the application,
 * including a search bar.
 */
const Header = () => {
  return (
    <div data-testid="header">
      <SearchBar />
    </div>
  );
};

export default Header;
