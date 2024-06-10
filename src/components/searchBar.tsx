/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import {
  updateCurrentPage,
  updateSearchTerm,
  updateSelectedSort
} from "@polarexpress/dataAccess/store/searchSlice";
import { useAppDispatch } from "@polarexpress/dataAccess/store/hooks";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SortOptions } from "@polarexpress/types/sorting";

/**
 * Renders an input for searching add-ons.
 */
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Handles submission of the search form. Dispatches an action to update the
   * search term in the Redux store. Navigates back to the homepage.
   *
   * @param event - The React form submission event.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateSearchTerm(searchTerm));
    dispatch(updateCurrentPage(0));

    if (searchTerm.length > 0)
      dispatch(updateSelectedSort(SortOptions.RELEVANCE));

    if (location.pathname !== "/") navigate("/");
  };

  return (
    <form
      className="flex justify-center gap-5"
      data-testid="search-form"
      onSubmit={handleSubmit}>
      <input
        className="rounded-2xl border-none px-3 py-2 font-sans font-semibold text-black ring-2 ring-gray-300 placeholder:text-gray-500 hover:shadow-md focus:ring-1 focus:ring-gray-500"
        data-testid="search-input"
        onChange={event => setSearchTerm(event.target.value)}
        placeholder="Search add-ons..."
        type="text"
        value={searchTerm}
      />
      <button
        className="relative z-[2] flex items-center rounded-full bg-orange-400 px-6 py-2.5 font-sans text-xs font-semibold uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-orange-300  hover:shadow-lg active:bg-orange-400 active:shadow-lg"
        data-testid="search-submit"
        type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
