/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Component for rendering a single add-on's information
import type { Addon } from "@polarexpress/types/addon";

import { Link } from "react-router-dom";

/**
 * Defines the properties for the AddonCard component.
 *
 * @property {Addon} addOn - The add-on data to be displayed.
 */
interface AddonCardProperties {
  addOn: Addon;
}

/**
 * Displays the name and summary of a single add-on. Links to addon page when
 * clicked.
 */
const AddonCard = ({ addOn }: AddonCardProperties) => {
  return (
    <div className="size-64 flex-none gap-4 text-center font-sans font-bold leading-7">
      <Link
        className="block h-full rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md"
        data-testid="addon-card"
        to={`/addons/${addOn._id}`}>
        <h1 className="mt-2 text-2xl font-semibold">{addOn.name}</h1>

        {/* TODO: Fetch author name instead of id */}
        <p className="mt-2 text-xs font-thin text-gray-400">
          Author: {addOn.authorId}
        </p>

        <p className="mt-2 overflow-x-hidden text-lg font-normal text-gray-700">
          {addOn.summary.split(" ").slice(0, 15).join(" ")}
        </p>
      </Link>
    </div>
  );
};

export default AddonCard;
