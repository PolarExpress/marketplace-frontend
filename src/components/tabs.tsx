/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import { AddonCategory } from "@polarexpress/types/addon";

/**
 * Properties for the AddonTabs component.
 */
interface AddonTabsProperties {
  /**
   * Callback function to handle category change.
   */
  onCategoryChange: (category: AddonCategory) => void;

  /**
   * The currently selected add-on category.
   */
  selectedCategory: AddonCategory;
}

/**
 * Renders tabs for each add-on category and allows filtering.
 */
const AddonTabs = ({
  onCategoryChange,
  selectedCategory
}: AddonTabsProperties) => {
  return (
    <div className="mb-4 flex justify-center">
      {Object.values(AddonCategory).map(category => (
        <button
          className={`mx-2 rounded-md px-4 py-2 font-semibold ${
            selectedCategory === category
              ? "bg-orange-400 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          key={category}
          onClick={() => onCategoryChange(category)}>
          {category.replaceAll("_", " ")}
        </button>
      ))}
    </div>
  );
};

export default AddonTabs;
