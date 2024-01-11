import { Search, SearchCheck } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

const Searchfield = () => {
  return (
    //------------ FIX: Search field in not working properly
    <div className="relative mx-14">
      {/* <span className="absolute text-xs left-0 w-12 inset-y-0 grid place-items-center text-gray-300">
        <Search />
      </span> */}
      <Input
        type="text"
        placeholder="Search communities..."
        className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
      />
    </div>
  );
};

export default Searchfield;
