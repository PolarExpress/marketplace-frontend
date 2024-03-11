import type React from "react";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addOnActions } from "../features/addonList/AddOnSlice";

/**
 * Provides a user interface for searching add-ons.
 */
const SearchBar = () => {
  // Tracks unsubmitted search term
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useAppDispatch();

  /**
   * Handles submission of the search form. Dispatches an action to update the search term in the Redux store.
   *
   * @param event - The React form submission event.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addOnActions.updateSearchTerm(searchTerm));
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
