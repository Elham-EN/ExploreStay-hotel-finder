import React from "react";

export default function Hero(): React.ReactElement {
  return (
    <div className="bg-blue-800 pb-16 pt-10">
      <div className="container mx-auto flex flex-col gap-2 justify-center items-center sm:items-start">
        <h1 className="text-3xl sm:text-5xl text-white font-bold min-w-[300px] text-center sm:text-left ">
          Find your next stay
        </h1>
        <p className="text-xl sm:text-2xl text-center sm:text-left text-white min-w-[300px]">
          Search low prices on hotels for your dream vacation...
        </p>
      </div>
    </div>
  );
}
