/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import SearchBar from "./searchBar";
import GpLogo from "../../assets/gp-logo.svg";

/**
 * Renders the main header area of the application, including a search bar.
 */
const Header = () => (
  <nav
    className="relative flex items-center justify-center border-b bg-gray-50 px-6 py-3 shadow-black hover:z-50 hover:shadow-md"
    data-testid="header">
    <a className="absolute left-0 mx-3" href="/">
      {/* It is probably better to just do a reload, instead of manyally resetting everything. */}
      <img className="h-8" src={GpLogo} />
    </a>
    <SearchBar />
  </nav>
);

export default Header;
