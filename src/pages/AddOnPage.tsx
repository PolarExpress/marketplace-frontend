/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import "../styles/tempStyles.css";
import { Addon } from "../types/AddOnTypes";

/**
 * Represents the individual page of an add-on.
 * It retrieves information about the add-on from the store and displays it.
 */
const AddOnPage = () => {
  // Retrieve URL param
  const { id: thisId } = useParams();

  // Find add-on in state using URL param
  const thisAddOn: Addon | undefined = useAppSelector((state: RootState) =>
    state.addons.allAddOns.find(addon => addon.id === thisId)
  );

  // Render simple error page when URL param not found in state
  if (!thisAddOn) {
    return <div>Add-on not found</div>;
  }

  return (
    <div className="addon-page-container">
      <h1 className="addon-name">{thisAddOn.name}</h1>
      {/* TODO: Add-on Author */}
      <p className="addon-summary">{thisAddOn.summary}</p>{" "}
      {/* TODO: Install Button */}
      {/* TODO: ReadMe */}
    </div>
  );
};

export default AddOnPage;
