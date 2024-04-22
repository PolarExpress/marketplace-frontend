/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { LoadingSpinner, RTKError } from "@polarexpress/components";
import { type RootState, useAppSelector } from "@polarexpress/dataAccess/store";
import { AddonCategory, type Addon } from "@polarexpress/types/addon";
import AddonCard from "./addonCard";
import { useGetAddonsQuery, useLazySearchAddonsQuery } from "./addonApi";
import { LoadingSpinner, RTKError } from "@polarexpress/components";
import { useEffect } from "react";

const AddonList = () => {
  // Get the current search term from the state
  const { searchTerm } = useAppSelector((state: RootState) => state.addons);

  // Use the RTK Query hook to retrieve addons from the backend
  const {
    data: allAddOns,
    isLoading: allLoading,
    error: allError
  } = useGetAddonsQuery({
    category: AddonCategory.VISUALISATION,
    // Temporary values
    page: 0
  });

  const [
    trigger,
    { data: filteredAddOns, isLoading: filterLoading, error: filterError }
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
  console.log(`TO RENDER: ${JSON.stringify(addOnsToRender)}`);

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
      <div className="relative -z-1 flex flex-wrap gap-4 w-full justify-center">
        {addOnsToRender.map((addOn: Addon) => (
          <AddonCard key={addOn._id} addOn={addOn} />
        ))}
      </div>
    );
  }
};

export default AddonList;
