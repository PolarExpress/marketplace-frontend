/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { type RootState, useAppSelector } from "@polarexpress/dataAccess/store";
import { AddonCategory, type Addon } from "@polarexpress/types/addon";
import AddonCard from "./addonCard";
import { useGetAddonsQuery } from "./addonApi";
import { LoadingSpinner, RTKError } from "@polarexpress/components";

const AddonList = () => {
  // Get the current search term from the state
  const { searchTerm } = useAppSelector((state: RootState) => state.addons);

  // Use the RTK Query hook to retrieve addons from the backend
  const {
    data: allAddOns,
    isLoading,
    error
  } = useGetAddonsQuery({
    // Temporary values
    page: 0,
    category: AddonCategory.VISUALISATION
  });

  if (isLoading)
    return (
      <div className="flex w-full justify-center">
        <LoadingSpinner>Loading...</LoadingSpinner>
      </div>
    );

  if (error) return <RTKError error={error} />;

  // Data might still be undefined
  if (allAddOns != null) {
    // Filter addons according to current searchTerm
    const filteredAddOns = allAddOns.filter((addOn: Addon) =>
      addOn.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if searchTerm is present and no add-ons match the search
    if (searchTerm.length > 0 && filteredAddOns.length === 0) {
      return <div>No Add-ons found with the given search term</div>;
    }

    return (
      <div className="relative -z-1 flex flex-wrap gap-4 w-full justify-center">
        {searchTerm
          ? filteredAddOns.map((addOn: Addon) => (
              <AddonCard key={addOn._id} addOn={addOn} />
            ))
          : allAddOns.map((addOn: Addon) => (
              <AddonCard key={addOn._id} addOn={addOn} />
            ))}
      </div>
    );
  }
};

export default AddonList;
