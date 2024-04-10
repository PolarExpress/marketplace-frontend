/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type React from "react";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { updateSearchTerm } from "../features/addonList/AddOnSlice";
//import "../style.css";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Provides a user interface for searching add-ons.
 */
const SearchBar = () => {
  // Tracks unsubmitted search term
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Handles submission of the search form.
   * Dispatches an action to update the search term in the Redux store.
   * Navigates back to the homepage.
   * @param event - The React form submission event.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateSearchTerm(searchTerm));

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center gap-5"
      data-testid="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search add-ons..."
        className="px-3 hover:shadow-md py-2 font-sans font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-1"
      />
      <button
        className="relative font-sans font-semibold z-[2] flex items-center rounded-r bg-orange-400 px-6 py-2.5 text-xs uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-orange-300 hover:shadow-lg  active:bg-orange-400 active:shadow-lg"
        type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
