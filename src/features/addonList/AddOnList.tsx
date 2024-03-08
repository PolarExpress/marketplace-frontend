// Should display all add-ons in a grid/list
import AddOnCard from "./AddOnCard";
import "../../styles/tempStyles.css";
import { useAppSelector } from "../../app/hooks";
import type { RootState } from "../../app/store";

const AddOnList = () => {
  const { allAddOns, searchTerm } = useAppSelector(
    (state: RootState) => state.addons
  );

  const filteredAddOns = allAddOns.filter(addOn =>
    addOn.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="addons-list">
      {searchTerm
        ? filteredAddOns.map(addOn => <AddOnCard addOn={addOn} />)
        : allAddOns.map(addOn => <AddOnCard addOn={addOn} />)}
    </div>
  );
};

export default AddOnList;
