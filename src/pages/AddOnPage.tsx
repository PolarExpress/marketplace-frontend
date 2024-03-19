/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { useParams } from "react-router-dom";
import { useFindAddonByIdQuery } from "../app/services/addonService";
import Markdown from "react-markdown";
import { InstallButton } from "../components/installButton/installButton";

/**
 * Represents the individual page of an add-on.
 * It retrieves information about the add-on from the store and displays it.
 */
export default function AddOnPage() {
  // Retrieve URL param
  const id = useParams().id!;

  // Find add-on in state using URL param
  const { data: addon, isLoading, isError } = useFindAddonByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render simple error page when URL param not found in state
  if (isError || !addon) {
    return <div data-testid="addon-not-found">Add-on not found</div>;
  }

  return (
    <div className="mx-auto py-16 max-w-2xl text-center" data-testid="addon-page">
      <h1 className="text-xl">{addon.name}</h1>
      {/* TODO: Add-on Author */}
      <p className="my-4 text-gray-500 text-sm border-b-2 border-neutral-200">{addon.summary}</p>
      <InstallButton addon={addon} />
      <Markdown>{addon.readme}</Markdown>
    </div>
  );
}
