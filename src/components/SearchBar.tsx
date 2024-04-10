/*
 * This program has been developed by students from the bachelor
 * Computer Science at Utrecht University within the Software Project course.
 *
 * © Copyright Utrecht University
 * (Department of Information and Computing Sciences)
 */

import type React from "react";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { updateSearchTerm } from "../features/addonList/AddOnSlice";
//import "../style.css";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Provides a user interface for searching add-ons.
 */
const SearchBar = () => {
  // Tracks unsubmitted search term
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Handles submission of the search form.
   * Dispatches an action to update the search term in the Redux store.
   * Navigates back to the homepage.
   * @param event - The React form submission event.
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(updateSearchTerm(searchTerm));

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  // return (
  //   <form
  //     onSubmit={handleSubmit}
  //     className="search-bar"
  //     data-testid="search-form">
  //     <input
  //       type="text"
  //       value={searchTerm}
  //       onChange={e => setSearchTerm(e.target.value)}
  //       placeholder="Search add-ons..."
  //     />
  //     <button type="submit">Search</button>
  //   </form>
  // );
  return (
    //<div className = "flex justify-center">
    <form
      onSubmit={handleSubmit}
      //className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
      className= " flex justify-center"
      data-testid="search-form">
      <input
        //className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Search add-ons..."
        className= "px-3 hover:shadow-md py-2 font-sans font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-1"
      />
      {/* <button className = "relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg" */}
      <button
        className= "relative font-sans font-semibold z-[2] flex items-center rounded-r bg-orange-400 px-6 py-2.5 text-xs uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-orange-300 hover:shadow-lg  active:bg-orange-400 active:shadow-lg"
        type="submit">
        Search
      </button>
    </form>
    //</div>
  );
  // return (
  //     <div className="mb-3 xl:w-96">
  //         <div className="relative mb-4 flex w-full flex-wrap items-stretch">
  //             <input
  //                 type="search"
  //                 className="relative m-0 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
  //                 placeholder="Search"
  //                 aria-label="Search"
  //                 aria-describedby="button-addon2" />

  //             {/* <!--Search icon--> */}
  //             <span
  //                 className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
  //                 id="basic-addon2">
  //                 <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     viewBox="0 0 20 20"
  //                     fill="currentColor"
  //                     className="h-5 w-5">
  //                     <path
  //                         fillRule="evenodd"
  //                         d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
  //                         clipRule="evenodd" />
  //                 </svg>
  //             </span>
  //         </div>
  //     </div>
  // );
};

export default SearchBar;
