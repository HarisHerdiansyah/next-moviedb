"use client";

import React from "react";
import { IoCaretDownOutline } from "react-icons/io5";

export default function Navbar() {
  return (
    <nav className="bg-indigo-950 py-4 px-32 flex justify-between items-center">
      <div className="flex items-center gap-12">
        <p className="text-2xl text-white font-medium tracking-wide">MovieDB</p>
        <div className="flex items-center gap-8">
          <div
            className="cursor-pointer flex items-center gap-2 relative"
            onClick={() => console.log("test")}
          >
            <p className="text-base text-white font-semibold">Movie</p>
            <IoCaretDownOutline color="white" />
            {/* <div className="absolute top-7 left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <p className="text-gray-700 px-4 py-2 text-sm hover:font-semibold">
                  Account settings
                </p>
                <p className="text-gray-700 px-4 py-2 text-sm hover:font-semibold">
                  Support
                </p>
                <p className="text-gray-700 px-4 py-2 text-sm hover:font-semibold">
                  License
                </p>
              </div>
            </div> */}
          </div>
          <div
            className="cursor-pointer flex items-center gap-2 relative"
            onClick={() => console.log("test")}
          >
            <p className="text-base text-white font-semibold">TV Shows</p>
            <IoCaretDownOutline color="white" />
            {/* <div className="absolute top-7 left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <p className="text-gray-700 px-4 py-2 text-sm hover:font-semibold">
                  Account settings
                </p>
                <p className="text-gray-700 px-4 py-2 text-sm hover:font-semibold">
                  Support
                </p>
                <p className="text-gray-700 px-4 py-2 text-sm hover:font-semibold">
                  License
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="w-9 h-9 rounded-full bg-white"></div>
    </nav>
  );
}
