"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function SearchBox() {
  const { data: session } = useSession();
  const [searchVal, setSearchVal] = useState<string>("");

  return (
    <div className="w-full bg-gradient-to-tr from-indigo-800 to-indigo-600 p-8 rounded">
      <p className="text-white text-4xl font-bold mb-5">
        Welcome{session ? `, ${session?.user?.name}!` : "!"}
      </p>
      <p className="text-white text-xl font-medium">
        Millon movies and TV shows only for you. Explore now!
      </p>
      <div className="mt-10 flex justify-center">
        <div className="max-w-3xl flex-1">
          <input
            type="text"
            name="search"
            id="serach"
            placeholder="Search here"
            className="w-3/4 shadow appearance-none border rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            autoComplete="off"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <Link
            className="w-1/4 py-3 px-4 bg-indigo-950 text-white font-semibold rounded outline-none"
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
