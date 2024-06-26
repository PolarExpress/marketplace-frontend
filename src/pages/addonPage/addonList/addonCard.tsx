/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type { Addon } from "@polarexpress/types/addon";

import { Link } from "react-router-dom";
import InstallIcon from "../../../../assets/install.svg";
import AddonIcon from "@polarexpress/components/addonIcon";

/**
 * Defines the properties for the AddonCard component.
 *
 * @property {Addon} addOn - The add-on data to be displayed.
 */
interface AddonCardProperties {
  addOn: Addon;
}

/**
 * Renders the name and summary of a single add-on. Links to addon page when
 * clicked.
 */
const AddonCard = ({ addOn }: AddonCardProperties) => {
  return (
    <div className="size-64 flex-none gap-4 font-sans font-bold leading-7">
      <Link
        className="flex h-full flex-col rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md"
        data-testid="addon-card"
        to={`/addons/${addOn._id}`}>
        <div className="flex flex-col">
          <AddonIcon
            addon={addOn}
            className="mb-2 aspect-square w-1/4 self-center"
          />
          <h1 className="truncate border-t-2 pt-2 text-2xl font-semibold">
            {addOn.name}
          </h1>

          {/* TODO: Fetch author name instead of id */}
          <p className="truncate text-xs font-thin text-gray-400">
            Author: {addOn.authorId}
          </p>

          <p className="line-clamp-3 text-ellipsis text-sm font-normal leading-snug text-gray-700">
            {addOn.summary}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <img className="mr-2 h-6 text-gray-600" src={InstallIcon} />
          <div className="text-lg font-semibold text-gray-800">
            {addOn.installCount}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AddonCard;
