import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutBtn from "./SignOutBtn";

export default function Header(): React.ReactElement {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex space-x-3 justify-center sm:justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>ExploreStay</Link>
        </span>
        <span className="flex flex-col sm:flex-row justify-center space-y-5 sm:space-y-0 space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 font-semibold text-lg 
                  hover:text-gray-300"
                to={"/my-bookings"}
              >
                My Bookings
              </Link>
              <Link
                className="flex items-center text-white px-3 font-semibold text-lg 
                  hover:text-gray-300"
                to={"/my-hotels"}
              >
                My Hotels
              </Link>
              <SignOutBtn />
            </>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center bg-white rounded-md text-blue-600 mt-1
                px-3 font-bold hover:bg-gray-300 justify-center min-w-[100px]"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
}
