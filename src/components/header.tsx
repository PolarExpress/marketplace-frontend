/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import SearchBar from "./searchBar";
import GpLogo from "../../assets/gp-logo.svg";
import { SortOptions } from "@polarexpress/types/sorting";

import DownArrowIcon from "../../assets/down-arrow.svg";
import {
  RootState,
  updateSelectedSort,
  useAppDispatch,
  useAppSelector
} from "@polarexpress/dataAccess/store";

/**
 * Renders the main header area of the application, including a search bar.
 */
const Header = () => {
  const dispatch = useAppDispatch();
  const { searchTerm, selectedSort } = useAppSelector(
    (state: RootState) => state.addons
  );

  /**
   * Updates the selected sorting option in the redux state.
   *
   * @param event Event containing the selected sorting option.
   */
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSelectedSort(event.target.value as SortOptions));
  };

  return (
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
      <div className="mx-6 grow">
        <label className="font-medium text-gray-700" htmlFor="sort-select">
          Sort By:
        </label>
        <div className="relative mx-2 inline-block">
          <select
            className="appearance-none rounded border border-gray-300 bg-white py-2 pl-3 pr-8 leading-tight text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            data-testid="sort-select"
            id="sort-select"
            onChange={handleSortChange}
            value={selectedSort}>
            {Object.values(SortOptions).map(option => (
              <option
                disabled={option === SortOptions.RELEVANCE && !searchTerm}
                key={option}
                value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
            <img className="size-3" src={DownArrowIcon} />
          </div>
        </div>
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
};

export default Header;
