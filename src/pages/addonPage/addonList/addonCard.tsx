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
 * @prop {Addon} addOn - The add-on data to be displayed.
 */
interface AddonCardProps {
  addOn: Addon;
}

/**
 * Displays the name and summary of a single add-on.
 * Links to addon page when clicked.
 */
const AddonCard = ({ addOn }: AddonCardProps) => {
  return (
    <div className="size-64 flex-none gap-4 font-sans font-bold leading-7">
      <Link
        to={`/addons/${addOn._id}`}
        className="block h-full rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md"
        data-testid="addon-card">
        <div className="border-solid px-3 py-2">
          <h1 className="text-2xl font-semibold">{addOn.name}</h1>
        </div>

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
