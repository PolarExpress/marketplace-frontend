/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";

/**
 * The Header component renders the main header area of the application,
 * including a search bar.
 */
export default function Header() {
  return (
    <header
      className="p-2 w-screen fixed top-0 border-b border-neutral-200 flex justify-between bg-white"
      data-testid="header">
      <Link to="/" className="self-center">
        Marketplace
      </Link>
      <SearchBar />
    </header>
  );
}
