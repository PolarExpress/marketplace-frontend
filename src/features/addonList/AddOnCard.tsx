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
const AddOnCard = ({ addOn }: AddOnCardProps) => {
  return (
    //<div className= " w-30 h-30 p-2">
    <div className= "flex-none gap-4 font-sans font-bold leading-7 h-64 w-64">
      <Link
      to={`/addons/${addOn._id}`}
      className="addon-card block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md h-full"
      data-testid="addon-card">
      <div className= " pb-2 px-3 pt-2 border- border-solid">
       <h1 className= "font-semibold text-2xl">{addOn.name}</h1>
      </div>
    
      {/* TODO: Fetch author name instead of id */}
      <p className=" text-xs font-thin text-gray-400 mt-2 ">Author: {addOn.author.userId}</p>
      <p className="text-gray-700 overflow-x-hidden font-normal text-lg mt-2">{addOn.summary.split(" ").slice(0, 20).join(" ")}...</p>
    </Link>
    </div>
    // <div className= " border-l-2 mx-2">
    //   <Link
    //   to={`/addons/${addOn._id}`}
    //   className="addon-card no-underline-link"
    //   data-testid="addon-card">
    //   <div className= " pb-2 border-1 border-solid">
    //     <h1 className= "flex py-2 px-3 font-sans font-semibold">{addOn.name}</h1>
    //   </div>
      
      /* TODO: Fetch author name instead of id */
    //   <p>Author: {addOn.author.userId}</p>
    //   <p>{addOn.summary}</p>
    // </Link>
    // </div>
    
  );
};

export default AddOnCard;
