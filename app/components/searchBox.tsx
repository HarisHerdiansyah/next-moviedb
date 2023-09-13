"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SearchBox() {
  const { data: session } = useSession();
  const [searchVal, setSearchVal] = useState<string>("");

  return (
    <div className="w-full bg-indigo-900/80 p-6 sm:p-8 rounded">
      <p className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-5">
        Welcome{session ? `, ${session?.user?.name}!` : "!"}
      </p>
      <p className="text-white sm:text-lg md:text-xl font-medium">
        Millon movies and TV shows only for you. Explore now!
      </p>
      <div className="mt-4 sm:mt-10">
        <div className="flex justify-center items-center">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search here"
            className="w-full lg:w-2/4 shadow appearance-none border rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            autoComplete="off"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <Link
            className="py-2 px-4 bg-indigo-950 text-white font-semibold rounded outline-none"
            href={{
              pathname: session ? "/search" : "/api/auth/signin",
              query: { keyword: searchVal }
            }}
          >
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}
