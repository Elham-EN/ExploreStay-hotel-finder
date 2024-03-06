import React from "react";

export default function Footer(): React.ReactElement {
  return (
    <div className="bg-blue-800 py-10">
      <div className=" container mx-auto flex flex-col md:flex-row space-y-10 md:space-x-0 justify-center sm:justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          ExploreStay.com
        </span>
        <span className="text-white font-bold tracking-tight flex-gap-4 space-y-5">
          <p className=" cursor-pointer">Privacy Policy</p>
          <p className=" cursor-pointer">Terms of Servic</p>
        </span>
      </div>
    </div>
  );
}
