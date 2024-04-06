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
//import "../../style.css";
import { Link } from "react-router-dom";

/**
 * Defines the properties for the AddOnCard component.
 * @prop {Addon} addOn - The add-on data to be displayed.
 */
interface AddOnCardProps {
  addOn: Addon;
}

/**
 * Displays the name and summary of a single add-on.
 * Links to addon page when clicked.
 */
const AddOnCard: React.FC<AddOnCardProps> = ({ addOn }) => {
  return (
    <Link
      to={`/addons/${addOn.id}`}
      className="addon-card no-underline-link"
      data-testid="addon-card">
      <h1>{addOn.name}</h1>
      <p>Author: {addOn.author.user.name}</p>
      <p>{addOn.summary}</p>
    </Link>
  );
};

export default AddOnCard;
