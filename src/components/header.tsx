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
    className="relative flex items-center justify-between border-b bg-gray-50 px-6 py-3 shadow-black hover:z-50 hover:shadow-md"
    data-testid="header">
    <div className="flex items-center">
      <a href="/">
        {/* It is probably better to just do a reload, instead of manyally resetting everything. */}
        <img className="h-8" src={GpLogo} />
      </a>
    </div>
    <div className="mx-6 grow">
      <SearchBar />
    </div>
    <div className="flex items-center">
      <a
        className="rounded-md border-2 border-orange-400 px-4 py-2 font-medium text-black hover:bg-orange-400 hover:text-white"
        href={import.meta.env.VITE_GP_URL}
        rel="noopener noreferrer"
        target="_blank">
        Visit Main Site
      </a>
    </div>
  </nav>
);

export default Header;
