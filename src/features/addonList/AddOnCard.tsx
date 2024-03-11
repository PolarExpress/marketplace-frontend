/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

// Component for rendering a single add-on's information
import type React from "react";
import type { Addon } from "../../types/AddOnTypes";
import "../../styles/tempStyles.css";

/**
 * Defines the properties for the AddOnCard component.
 * @prop {Addon} addOn - The add-on data to be displayed.
 */
interface AddOnCardProps {
  addOn: Addon;
}

/**
 * Displays the name and summary of a single add-on.
 */
const AddOnCard: React.FC<AddOnCardProps> = ({ addOn }) => {
  return (
    <div className="addon-card" data-testid="addon-card">
      <h1>{addOn.name}</h1>
      <p>{addOn.summary}</p>
    </div>
  );
};

export default AddOnCard;
