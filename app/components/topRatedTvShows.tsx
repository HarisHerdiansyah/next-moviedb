"use client";

import React, { useCallback, useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Section } from "@/components";
import { genreStringify } from "@/utils/data-process";
import { TVShow } from "@/types";

type IProps = {
  _topRatedTvShows: any;
  _genre: any;
};

export default function Component({ _genre, _topRatedTvShows }: IProps) {
  const [currentShows, setCurrentShows] = useState<number>(0);
  const router = useRouter();
  const { data: session } = useSession();

  const setPrevShows = useCallback(() => {
    if (currentShows === 0) setCurrentShows(_topRatedTvShows.length - 1);
    setCurrentShows((prevState) => prevState - 1);
  }, [currentShows, _topRatedTvShows.length]);

  const setNextShows = useCallback(() => {
    if (currentShows === _topRatedTvShows.length - 1) setCurrentShows(0);
    setCurrentShows((prevState) => prevState + 1);
  }, [currentShows, _topRatedTvShows.length]);

  const showsCarousel = useMemo(() => {
    const shows: TVShow = _topRatedTvShows[currentShows];
    const genre = genreStringify(shows.genre_ids, _genre);
    return (
      <div
        className="w-full bg-cover bg-no-repeat bg-center mt-5 overflow-auto h-[480px]"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${shows.backdrop_path}')`
        }}
      >
        <div className="bg-black/30 backdrop-blur-sm py-16 flex items-center w-full h-full">
          <div
            className="w-32 flex justify-center cursor-pointer"
            onClick={() => setPrevShows()}
          >
            <BsChevronCompactLeft className="text-white text-4xl" />
          </div>
          <div className="flex gap-14 items-center justify-center">
            <Image
              src={`https://image.tmdb.org/t/p/original${shows.poster_path}`}
              alt={shows.name}
              width={171}
              height={260}
            />
            <div className="max-w-[768px]">
              <p className="text-4xl line-clamp-1 text-slate-50 font-semibold my-5">
                {shows.name}
              </p>
              <p className="text-lg break-words line-clamp-2 text-white my-5">
                {shows.overview}
              </p>
              <p className="text-lg text-white inline mr-10">
                Language : {shows.original_language.toUpperCase()}
              </p>
              <p className="text-lg text-white inline">
                Rating : {shows.vote_average}
              </p>
              <p className="text-lg text-white">Genre : {genre}</p>
              <button
                className="bg-cyan-200 my-5 px-6 py-3 rounded-full border-2 border-black font-semibold hover:bg-cyan-400"
                onClick={() => {
                  if (!session) {
                    return router.push("/api/auth/signin");
                  }
                  return router.push(`/tv/detail/${shows.id}`);
                }}
              >
                See Details
              </button>
            </div>
          </div>
          <div
            className="w-32 flex justify-center cursor-pointer"
            onClick={() => setNextShows()}
          >
            <BsChevronCompactRight className="text-white text-4xl" />
          </div>
        </div>
      </div>
    );
  }, [
    _topRatedTvShows,
    _genre,
    currentShows,
    setNextShows,
    setPrevShows,
    router,
    session
  ]);

  const RenderMain = useMemo(() => {
    return <Section title="Top Rated TV Shows">{showsCarousel}</Section>;
  }, [showsCarousel]);

  return RenderMain;
}
