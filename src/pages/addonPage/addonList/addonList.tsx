/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { AddonTabs, LoadingSpinner, RTKError } from "@polarexpress/components";
import ReactPaginate from "react-paginate";
import {
  type RootState,
  updateCurrentPage,
  updateSelectedCategory,
  updateSelectedSort,
  useAppDispatch,
  useAppSelector
} from "@polarexpress/dataAccess/store";
import { type Addon, AddonCategory } from "@polarexpress/types/addon";
import AddonCard from "./addonCard";
import { useLazyGetAddonsQuery } from "./addonApi";
import { useEffect } from "react";
import { SortOptions } from "@polarexpress/types/sorting";

import DownArrowIcon from "../../../../assets/down-arrow.svg";

/**
 * Component that renders a grid of add-on cards with pagination.
 *
 * @returns The rendered AddonList component.
 */
const AddonList = () => {
  const dispatch = useAppDispatch();
  const { currentPage, searchTerm, selectedCategory, selectedSort } =
    useAppSelector((state: RootState) => state.addons);

  const [trigger, { data: addOnsToRender, error, isLoading }] =
    useLazyGetAddonsQuery();

  /**
   * Updates the current page in the redux state according to the selected page
   * number.
   *
   * @param data The object containing the selected page index.
   */
  const handlePageClick = (data: { selected: number }) => {
    dispatch(updateCurrentPage(data.selected));
  };

  /**
   * Updates the selected category in the redux state and resets the current
   * page to 0.
   *
   * @param category The newly selected add-on category.
   */
  const handleCategoryChange = (category: AddonCategory) => {
    dispatch(updateSelectedCategory(category));
    dispatch(updateCurrentPage(0));
  };

  /**
   * Updates the selected sorting option in the redux state.
   *
   * @param event Event containing the selected sorting option.
   */
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(updateSelectedSort(event.target.value as SortOptions));
  };

  useEffect(() => {
    trigger({
      category: selectedCategory,
      page: currentPage,
      searchTerm,
      sort: selectedSort
    });
  }, [searchTerm, trigger, currentPage, selectedCategory, selectedSort]);

  if (isLoading)
    return (
      <div className="flex w-full justify-center" data-testid="list-loading">
        <LoadingSpinner>Loading...</LoadingSpinner>
      </div>
    );

  if (error) return <RTKError error={error} />;

  if (addOnsToRender) {
    if (addOnsToRender.addons.length === 0) {
      return (
        <div className="flex w-full flex-col items-center">
          <AddonTabs
            onCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />
          <p className="flex w-full justify-center">
            No Add-ons found with the given search term
          </p>
        </div>
      );
    }

    return (
      <div className="flex w-full flex-col items-center">
        <AddonTabs
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
        <div className="my-5 flex items-center space-x-2">
          <label className="font-medium text-gray-700" htmlFor="sort-select">
            Sort By:
          </label>
          <div className="relative inline-block">
            <select
              className="appearance-none rounded border border-gray-300 bg-white py-2 pl-3 pr-8 leading-tight text-gray-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
              id="sort-select"
              onChange={handleSortChange}
              value={selectedSort}>
              <option value={SortOptions.NONE}>None</option>
              <option value={SortOptions.ALPHABETICAL}>Alphabetical</option>
              <option value={SortOptions.INSTALL_COUNT}>Install Count</option>
              <option value={SortOptions.RELEVANCE} disabled={!searchTerm}>
                Relevance
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
              <img className="size-3" src={DownArrowIcon} />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {addOnsToRender.addons.map((addOn: Addon) => (
            <AddonCard addOn={addOn} key={addOn._id} />
          ))}
        </div>
        <ReactPaginate
          /* eslint-disable perfectionist/sort-jsx-props -- Alphabetic ordering would be illogical  */
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          pageCount={addOnsToRender.totalPages}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          forcePage={currentPage}
          breakClassName="items-center px-5 py-2 text-sm font-semibold text-black ring-1 ring-inset ring-gray-300 hover:bg-white inline-flex"
          containerClassName="flex mt-5"
          pageLinkClassName="items-center px-5 py-2 text-sm font-semibold text-black ring-1 ring-inset ring-gray-300 h-full hover:bg-white inline-flex"
          previousLinkClassName="inline-flex items-center rounded-l-lg border-2 border-orange-400 px-4 py-2 text-sm font-medium text-black hover:bg-orange-400 hover:shadow-md hover:text-white"
          nextLinkClassName="inline-flex items-center rounded-r-lg border-2 border-orange-400 px-4 py-2 text-sm font-medium text-black hover:bg-orange-400 hover:shadow-md hover:text-white"
          activeClassName="bg-orange-400 text-gray-100 pointer-events-none"
          disabledLinkClassName="hidden"
          /* eslint-enable perfectionist/sort-jsx-props */
        />
      </div>
    );
  }
};

export default AddonList;
