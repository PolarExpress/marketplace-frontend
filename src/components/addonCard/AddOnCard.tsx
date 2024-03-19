/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { Link } from "react-router-dom";
import type { Addon } from "../../types/AddOnTypes";
import { InstallButton } from "../installButton/installButton";

interface AddOnCardProps {
  addOn: Addon;
}

/**
 * Displays the name and summary of a single add-on.
 * Links to addon page when clicked.
 */
export default function AddOnCard({ addOn }: AddOnCardProps) {
  return (
    <div className="group rounded border border-neutral-200 p-4">
      <Link to={`/addons/${addOn.id}`} className="" data-testid="addon-card">
        <h3 className="text-lg text-gray-700">{addOn.name}</h3>
        <span className="inline-block mt-2 mb-2 text-xs bg-orange-500 text-white rounded-full py-1 px-2">
          {addOn.category}
        </span>
        <p className="mt-1 text-sm font-medium text-gray-700">
          {addOn.summary}
        </p>
      </Link>
      <InstallButton addon={addOn} />
    </div>
  );
}
