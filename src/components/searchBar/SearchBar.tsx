/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { updateTerm } from "./searchSlice";

/**
 * Provides a user interface for searching add-ons.
 */
export default function SearchBar() {
  // Tracks unsubmitted search term
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const term = useAppSelector(state => state.search.term);

  // Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function handleChange(newTerm: string) {
    dispatch(updateTerm(newTerm));

    if (location.pathname !== "/") {
      navigate("/");
    }
  }

  return (
    <input
      type="text"
      value={term}
      onChange={e => handleChange(e.target.value)}
      placeholder="Search add-ons..."
      data-testid="search-bar"
      className="rounded border p-1 text-sm"
    />
  );
}
