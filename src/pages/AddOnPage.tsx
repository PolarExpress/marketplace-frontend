/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useParams } from "react-router-dom";
import "../styles/tempStyles.css";
import {
  useGetAddonByIdQuery,
  useGetAddonReadmeByIdQuery
} from "../features/addonList/AddOnApi";
import RTKError from "../components/RTKError";
import Markdown from "react-markdown";

/**
 * Represents the individual page of an add-on.
 * It retrieves information about the add-on from the store and displays it.
 */
const AddOnPage = () => {
  // Retrieve URL param
  const { id: thisId } = useParams();

  // Use the RTK Query hooks to retrieve addon and readme from the backend
  // If retrieved id param is undefined or empty, use the empty string in the query
  const {
    data: addon,
    isLoading: isAddonLoading,
    error: addonError
  } = useGetAddonByIdQuery(thisId ?? "");
  // Fetching of the readme is skipped if the addon is not yet retrieved
  const {
    data: readMe,
    isLoading: isReadmeLoading,
    error: readmeError
  } = useGetAddonReadmeByIdQuery(thisId ?? "", {
    skip: !addon
  });

  if (isAddonLoading) return <div>Loading...</div>;

  if (addonError) return <RTKError error={addonError} />;

  // Data might still be empty or undefined
  if (addon != null) {
    return (
      <div className="addon-page-container" data-testid="addon-page">
        <h1 className="addon-name">{addon.name}</h1>
        {/* TODO: Add-on Author */}
        <p className="addon-summary">{addon.summary}</p>{" "}
        {/* TODO: Install Button */}
        {isReadmeLoading && <div>Loading...</div>}
        {/* Do not display error if the status is 400 (readme not found in backend). In that case, render an empty div.
            TODO: Update if structured errors are implemented.
        */}
        {readmeError &&
          ("status" in readmeError && readmeError.status === 400 ? (
            <div></div>
          ) : (
            <RTKError error={readmeError} />
          ))}
        {readMe != null && <Markdown>{readMe}</Markdown>}
      </div>
    );
  }
};

export default AddOnPage;
