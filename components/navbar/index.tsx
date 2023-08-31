"use client";

import React, { useState, useCallback } from "react";
import { IoCaretDownOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { DROPDOWN, DropdownMenu } from "@/utils";

type IState = {
  [key: string]: boolean;
};

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

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
                onClick={() => {
                  if (!session) {
                    return router.push("/api/auth/signin");
                  }
                  return router.push(
                    `/${menu.toLowerCase()}/${e
                      .toLowerCase()
                      .replaceAll(" ", "-")}`
                  );
                }}
              >
                {e}
              </p>
            ))}
          </div>
        </div>
      );
    },
    [router, session]
  );

  return (
    <nav className="bg-indigo-950 py-4 px-32 flex justify-between items-center">
      <div className="flex items-center gap-12">
        <p
          className="text-2xl text-white font-medium tracking-wide cursor-pointer"
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
      {session ? (
        <button
          className="bg-white font-semibold px-4 py-2 rounded"
          onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
        >
          Sign Out
        </button>
      ) : (
        <Link
          className="bg-white font-semibold px-4 py-2 rounded"
          href="/api/auth/signin"
        >
          Sign In
        </Link>
      )}
    </nav>
  );
}
