/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Should display all add-ons in a grid/list
import { useAppSelector } from "../../app/hooks";
import AddOnCard from "../addonCard/AddOnCard";
import { useListAddonsQuery } from "../../app/services/addonService";

export default function AddOnList() {
  const { term: searchTerm } = useAppSelector(state => state.search);

  const { data: addons, isLoading, isError } = useListAddonsQuery(0);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !addons) return <div>Error fetching add-ons</div>;

  const filteredAddOns = searchTerm
    ? addons.filter(addon =>
        addon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : addons;

  // Check if searchTerm is present but no add-ons match the search
  if (searchTerm && filteredAddOns.length === 0) {
    return (
      <div className="no-addons-found">
        No Add-ons found with the given search term
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-lg">Addons</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {filteredAddOns.map(addOn => (
          <AddOnCard key={addOn.id} addOn={addOn} />
        ))}
      </div>
    </div>
  );
}
