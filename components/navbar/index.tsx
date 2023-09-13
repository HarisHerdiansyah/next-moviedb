"use client";

import React, { useState, useCallback } from "react";
import { IoCaretDownOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useSpring, animated } from "@react-spring/web";
import { DROPDOWN, DropdownMenu } from "@/utils/contants";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [springs, api] = useSpring(() => ({
    from: {
      height: 0,
      paddingBlock: 0
    }
  }));

  const toggleDropdown = useCallback((menu: string) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu]
    }));
  }, []);

  const toggleDrawer = useCallback(() => {
    api.start({
      from: {
        height: isDrawerOpen ? 350 : 0,
        paddingBlock: isDrawerOpen ? 8 : 0
      },
      to: {
        height: isDrawerOpen ? 0 : 350,
        paddingBlock: isDrawerOpen ? 0 : 8
      }
    });
    setIsDrawerOpen((prevState) => !prevState);
  }, [isDrawerOpen, api]);

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
                      .replaceAll(" ", "-")}`
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
    <>
      <nav className="bg-indigo-950 py-4 px-8 lg:py-4 lg:px-16 xl:py-4 xl:px-32 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <aside className="flex items-center justify-center gap-4">
            <FaBars
              className="text-white text-2xl cursor-pointer md:hidden"
              onClick={() => toggleDrawer()}
            />
            <p
              className="text-2xl text-white font-medium tracking-wide cursor-pointer"
              onClick={() => router.replace("/")}
            >
              MovieDB
            </p>
          </aside>
          <div className="hidden md:flex items-center gap-8">
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
            <Link
              href="/favourite"
              className="text-base text-white font-semibold"
            >
              Favourite
            </Link>
          </div>
        </div>
        {session ? (
          <button
            className="bg-white font-semibold hidden sm:block sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded"
            onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
          >
            Sign Out
          </button>
        ) : (
          <Link
            className="bg-white font-semibold hidden sm:block sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded"
            href="/api/auth/signin"
          >
            Sign In
          </Link>
        )}
      </nav>
      <animated.div
        className="bg-indigo-950 w-full px-8"
        style={{ ...springs }}
      >
        {isDrawerOpen ? (
          <>
            <div className="text-white mb-6">
              <p className="text-lg">Movie</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {DROPDOWN.Movie.map((e) => (
                  <button
                    className="bg-white text-black py-1 px-4 hover:bg-sky-300 transition-all flex-shrink-0"
                    key={e}
                    onClick={() =>
                      router.push(
                        `/movie/${e.toLowerCase().replaceAll(" ", "-")}`
                      )
                    }
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-white mb-6">
              <p className="text-lg">TV Shows</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {DROPDOWN.TV.map((e) => (
                  <button
                    className="bg-white text-black py-1 px-4 hover:bg-sky-300 transition-all flex-shrink-0"
                    key={e}
                    onClick={() =>
                      router.push(`/tv/${e.toLowerCase().replaceAll(" ", "-")}`)
                    }
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-white mb-6">
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  className="bg-white text-black py-1 px-4 hover:bg-sky-300 transition-all flex-shrink-0"
                  onClick={() => router.push("/favourite")}
                >
                  Favourite
                </button>
                {session ? (
                  <button
                    className="bg-white text-black py-1 px-4 hover:bg-sky-300 transition-all flex-shrink-0"
                    onClick={() =>
                      signOut({ callbackUrl: "http://localhost:3000/" })
                    }
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    className="bg-white text-black py-1 px-4 hover:bg-sky-300 transition-all flex-shrink-0"
                    href="/api/auth/signin"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </>
        ) : null}
      </animated.div>
    </>
  );
}
