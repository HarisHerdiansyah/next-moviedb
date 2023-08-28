"use client";

import React, { useState, useCallback } from "react";
import { IoCaretDownOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { DROPDOWN, DropdownMenu } from "@/utils";

type IState = {
  [key: string]: boolean;
};

export default function Navbar() {
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState<IState>({
    movie: false,
    tv: false
  });

  const toggleDropdown = useCallback((menu: string) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu]
    }));
  }, []);

  const mapMenu = useCallback(
    (menu: DropdownMenu) => {
      return (
        <div className="absolute top-7 left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {DROPDOWN[menu].map((e) => (
              <p
                className="text-gray-700 px-4 py-2 text-sm hover:font-semibold"
                key={e}
                onClick={() =>
                  router.push(
                    `/${menu.toLowerCase()}/${e
                      .toLowerCase()
                      .replace(" ", "-")}`
                  )
                }
              >
                {e}
              </p>
            ))}
          </div>
        </div>
      );
    },
    [router]
  );

  return (
    <nav className="bg-indigo-950 py-4 px-32 flex justify-between items-center">
      <div className="flex items-center gap-12">
        <p
          className="text-2xl text-white font-medium tracking-wide"
          onClick={() => router.replace("/")}
        >
          MovieDB
        </p>
        <div className="flex items-center gap-8">
          <div
            className="cursor-pointer flex items-center gap-2 relative"
            onClick={() => toggleDropdown("movie")}
          >
            <p className="text-base text-white font-semibold">Movie</p>
            <IoCaretDownOutline color="white" />
            {isDropdownOpen.movie && mapMenu("Movie")}
          </div>
          <div
            className="cursor-pointer flex items-center gap-2 relative"
            onClick={() => toggleDropdown("tv")}
          >
            <p className="text-base text-white font-semibold">TV Shows</p>
            <IoCaretDownOutline color="white" />
            {isDropdownOpen.tv && mapMenu("TV")}
          </div>
        </div>
      </div>
      <div className="w-9 h-9 rounded-full bg-white"></div>
    </nav>
  );
}
