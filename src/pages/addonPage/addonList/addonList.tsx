/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { LoadingSpinner, RTKError } from "@polarexpress/components";
import ReactPaginate from "react-paginate";
import { type RootState, useAppSelector } from "@polarexpress/dataAccess/store";
import { type Addon, AddonCategory } from "@polarexpress/types/addon";
import AddonCard from "./addonCard";
import { useGetAddonsQuery, useLazyGetAddonsQuery } from "./addonApi";
import { useEffect, useState } from "react";

/**
 * Component that renders a grid of add-on cards with pagination.
 *
 * @returns The rendered AddonList component.
 */
const AddonList = () => {
  const { searchTerm } = useAppSelector((state: RootState) => state.addons);

  const [currentPage, setCurrentPage] = useState(0);

  const {
    data: allAddOns,
    error: allError,
    isLoading: allLoading
  } = useGetAddonsQuery({
    category: AddonCategory.VISUALISATION,
    page: currentPage
  });

  const [
    trigger,
    { data: filteredAddOns, error: filterError, isLoading: filterLoading }
  ] = useLazyGetAddonsQuery();

  /**
   * Handles the page click event in the pagination component.
   *
   * @param data The object containing the selected page index.
   */
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  useEffect(() => {
    trigger({ page: currentPage, searchTerm });
  }, [searchTerm, trigger, currentPage]);

  if (allLoading || filterLoading)
    return (
      <div className="flex w-full justify-center" data-testid="list-loading">
        <LoadingSpinner>Loading...</LoadingSpinner>
      </div>
    );

  if (allError || filterError)
    return <RTKError error={allError || filterError!} />;

  const addOnsToRender = searchTerm ? filteredAddOns : allAddOns;

  if (addOnsToRender) {
    if (addOnsToRender.addons.length === 0) {
      return (
        <p className="flex w-full justify-center">
          No Add-ons found with the given search term
        </p>
      );
    }

    return (
      <div className="flex w-full flex-col items-center">
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
          breakClassName="items-center px-5 py-2 text-sm font-semibold text-black ring-1 ring-inset ring-gray-300 hover:bg-white inline-flex"
          containerClassName="flex mt-5"
          pageClassName="items-center px-5 py-2 text-sm font-semibold text-black ring-1 ring-inset ring-gray-300 hover:bg-white inline-flex"
          previousLinkClassName="inline-flex items-center rounded-l-lg border-2 border-orange-400 px-4 py-2 text-sm font-medium text-black hover:bg-orange-400 hover:shadow-md hover:text-white"
          nextLinkClassName="inline-flex items-center rounded-r-lg border-2 border-orange-400 px-4 py-2 text-sm font-medium text-black hover:bg-orange-400 hover:shadow-md hover:text-white"
          activeClassName="bg-orange-400 text-gray-100 pointer-events-none"
          disabledLinkClassName="hidden"
          /* eslint-disable perfectionist/sort-jsx-props */
        />
      </div>
    );
  }
};

export default AddonList;
