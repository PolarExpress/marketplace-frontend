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

const AddOnPage = () => {
  const { id: thisId } = useParams();

  const thisAddOn = useAppSelector(
    (state: RootState) => state.addons.allAddOns.find(addon => addon.id === thisId)
  );

  if (!thisAddOn) {
    return (
      <div>Add-on not found</div>
    );
  }

  return (
    <div>
      <h1>{thisAddOn.name}</h1>       {/* Add-on Name */}
                                      {/* Add-on Author */}
      <p>{thisAddOn.summary}</p>      {/* Add-on Summary */}
                                      {/* Install Button */}
                                      {/* ReadMe */}
    </div>
  );
};

export default AddOnPage;