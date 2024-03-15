/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Should display all add-ons in a grid/list
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import type { RootState } from "../../app/store";
import type { Addon } from "../../types/AddOnTypes";
import AddOnCard from "./AddOnCard";
import "../../styles/tempStyles.css";
import { fetchAddons } from "./AddOnSlice";

const AddOnList = () => {
  const dispatch = useAppDispatch();
  const { allAddOns, searchTerm, status, error } = useAppSelector(
    (state: RootState) => state.addons
  );

  useEffect(() => {
    dispatch(fetchAddons());
  }, [dispatch]);

  const filteredAddOns = allAddOns.filter((addOn: Addon) =>
    addOn.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error fetching add-ons: {error}</div>;

  // Check if searchTerm is present but no add-ons match the search
  if (searchTerm && filteredAddOns.length === 0) {
    return <div className="no-addons-found">No Add-ons found with the given search term</div>;
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
};

export default AddOnList;
