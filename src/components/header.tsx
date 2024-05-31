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
const Header = () => {
  return (
    <nav
      className="flex h-12 w-full flex-row items-center gap-2 px-4 md:gap-3 lg:gap-4"
      // className="relative flex justify-center items-center border-b bg-gray-50 px-6 py-3 shadow-black hover:z-50 hover:shadow-md"
      data-testid="header">
      <img className="h-7" src={GpLogo} />
      <SearchBar />
    </nav>
  );
};

export default Header;
