/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useParams } from "react-router-dom";
import "../styles/tempStyles.css";
import { useGetAddonByIdQuery } from "../features/addonList/AddOnApi";
import Error from "../components/Error";

/**
 * Represents the individual page of an add-on.
 * It retrieves information about the add-on from the store and displays it.
 */
const AddOnPage = () => {
  // Retrieve URL param
  const { id: thisId } = useParams();

  // Use the RTK Query hook to retrieve addon from the backend
  // If retrieved id param is undefined or empty, use the empty string in the query
  const { data: addon, isLoading, error } = useGetAddonByIdQuery(thisId ?? "");

  if (isLoading) return <div>Loading...</div>;

  if (error) return <Error error={error} />;

  // Data might still be empty or undefined
  if (addon) {
    return (
      <div className="addon-page-container" data-testid="addon-page">
        <h1 className="addon-name">{addon.name}</h1>
        {/* TODO: Add-on Author */}
        <p className="addon-summary">{addon.summary}</p>{" "}
        {/* TODO: Install Button */}
        {/* TODO: ReadMe */}
      </div>
    );
  }
};

export default AddOnPage;
