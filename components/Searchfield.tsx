import React from "react";
import { Icons } from "./Icons";

const SearchField = () => {
  return (
    <div className="relative mx-14">
      <input
        type="text"
        className="z-0 h-10 w-full rounded-md  pl-10 pr-20 text-sm font-medium focus:outline-none"
        placeholder="Search communities..."
      />
      <div className="absolute left-2.5 top-2.5 ">
        <Icons.search className="h-5 w-5" />
      </div>
    </div>
  );
};

export default SearchField;
