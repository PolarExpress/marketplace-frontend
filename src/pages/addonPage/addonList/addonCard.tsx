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
interface AddonCardProps {
  addOn: Addon;
}

/**
 * Displays the name and summary of a single add-on. Links to addon page when
 * clicked.
 */
const AddonCard = ({ addOn }: AddonCardProps) => {
  return (
    <div className="flex-none gap-4 font-sans font-bold leading-7 h-64 w-64">
      <Link
        to={`/addons/${addOn._id}`}
        className="addon-card block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md h-full"
        data-testid="addon-card">
        <div className="pb-2 px-3 pt-2 border- border-solid">
          <h1 className="font-semibold text-2xl">{addOn.name}</h1>
        </div>

        {/* TODO: Fetch author name instead of id */}
        <p className="text-xs font-thin text-gray-400 mt-2">
          Author: {addOn.authorId}
        </p>
        <p className="text-gray-700 overflow-x-hidden font-normal text-lg mt-2">
          {addOn.summary.split(" ").slice(0, 15).join(" ")}
        </p>
      </Link>
    </div>
  );
};

export default AddonCard;
