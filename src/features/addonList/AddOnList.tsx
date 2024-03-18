/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";
import { AddonCategory, type Addon } from "../../types/AddOnTypes";
import AddOnCard from "./AddOnCard";
import "../../styles/tempStyles.css";
import { useGetAddonsQuery } from "./AddOnApi";
import RTKError from "../../components/RTKError";

const AddOnList = () => {
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

  if (isLoading) return <div>Loading...</div>;

  if (error) return <RTKError error={error} />;

  // Data might still be empty or undefined
  if (allAddOns) {
    // Filter addons according to current searchTerm
    const filteredAddOns = allAddOns.filter((addOn: Addon) =>
      addOn.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if searchTerm is present and no add-ons match the search
    if (searchTerm && filteredAddOns.length === 0) {
      return (
        <div className="no-addons-found">
          No Add-ons found with the given search term
        </div>
      );
    }

    return (
      <div className="addons-list">
        {searchTerm
          ? filteredAddOns.map((addOn: Addon) => (
              <AddOnCard key={addOn.id} addOn={addOn} />
            ))
          : allAddOns.map((addOn: Addon) => (
              <AddOnCard key={addOn.id} addOn={addOn} />
            ))}
      </div>
    );
  }
  return null;
};

export default AddOnList;
