/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import SearchBar from "./searchBar";
import GpLogo from "../../assets/gp-logo.svg";
import { Link } from "react-router-dom";

/**
 * Renders the main header area of the application, including a search bar.
 */
const Header = () => {
  return (
    <nav
      className="relative flex items-center justify-center border-b bg-gray-50 px-6 py-3 shadow-black hover:z-50 hover:shadow-md"
      data-testid="header">
      <Link className="absolute left-0 mx-3" to="/">
        <img className="h-8" src={GpLogo} />
      </Link>
      <SearchBar />
    </nav>
  );
};

export default Header;
