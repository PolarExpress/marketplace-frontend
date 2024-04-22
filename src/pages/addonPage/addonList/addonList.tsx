/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { LoadingSpinner, RTKError } from "@polarexpress/components";
import { type RootState, useAppSelector } from "@polarexpress/dataAccess/store";
import { type Addon, AddonCategory } from "@polarexpress/types/addon";
import AddonCard from "./addonCard";
import { useGetAddonsQuery, useLazySearchAddonsQuery } from "./addonApi";
import { useEffect } from "react";

const AddonList = () => {
  // Get the current search term from the state
  const { searchTerm } = useAppSelector((state: RootState) => state.addons);

  // Use the RTK Query hook to retrieve addons from the backend
  const {
    data: allAddOns,
    error: allError,
    isLoading: allLoading
  } = useGetAddonsQuery({
    category: AddonCategory.VISUALISATION,
    // Temporary values
    page: 0
  });

  const [
    trigger,
    { data: filteredAddOns, error: filterError, isLoading: filterLoading }
  ] = useLazySearchAddonsQuery();

  useEffect(() => {
    trigger({ searchTerm });
  }, [searchTerm, trigger]);

  if (allLoading || filterLoading)
    return (
      <div className="flex w-full justify-center" data-testid="list-loading">
        <LoadingSpinner>Loading...</LoadingSpinner>
      </div>
    );

  if (allError || filterError)
    return <RTKError error={allError || filterError!} />;

  const addOnsToRender = searchTerm ? filteredAddOns : allAddOns;

  // Data might still be undefined
  if (addOnsToRender) {
    // Check if searchTerm is present and no add-ons match the search
    if (
      searchTerm.length > 0 &&
      filteredAddOns &&
      filteredAddOns.length === 0
    ) {
      return <div>No Add-ons found with the given search term</div>;
    }

    return (
      <div className="relative flex w-full flex-wrap justify-center gap-4">
        {addOnsToRender.map((addOn: Addon) => (
          <AddonCard addOn={addOn} key={addOn._id} />
        ))}
      </div>
    );
  }
};

export default AddonList;
