/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { Addon } from "@polarexpress/types/addon";
import React from "react";
import GpLogo from "../../assets/favicon-180x180.png";

type AddonItemProperties = {
  addon: Addon;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Renders the icon for a given addon.
 */
function AddonIcon({ addon, ...properties }: AddonItemProperties) {
  const { _id, icon, name } = addon;

  return (
    <div {...properties}>
      <img
        alt={`Icon for ${name}`}
        src={
          icon
            ? `${import.meta.env.VITE_API_BASE}/store/addons/${_id}/${icon}`
            : GpLogo
        }
      />
    </div>
  );
}

export default AddonIcon;
