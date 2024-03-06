import React from "react";
import { Link } from "react-router-dom";

export default function Header(): React.ReactElement {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex space-x-3 justify-center sm:justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>ExploreStay</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to={"/sign-in"}
            className="flex items-center bg-white rounded-md text-blue-600 
                px-3 font-bold hover:bg-gray-300 justify-center min-w-[100px]"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
}
