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
import { addOnActions } from "../features/addonList/AddOnSlice";
import "../styles/tempStyles.css";
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
    dispatch(addOnActions.updateSearchTerm(searchTerm));

    if (location.pathname !== '/') {
      navigate('/'); 
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="search-bar"
      data-testid="search-form">
      <input
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search add-ons..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
