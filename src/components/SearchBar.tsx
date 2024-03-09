// SearchBar component
import type React from "react";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addOnActions } from "../features/addonList/AddOnSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const dispatch = useAppDispatch();

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
