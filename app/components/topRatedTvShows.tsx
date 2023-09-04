"use client";

import React, { useCallback, useState, useMemo } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Section, Card } from "@/components";
import { genreStringify } from "@/utils/data-process";

type IProps = {
  _topRatedTvShows: any;
  _genre: any;
};

export default function Component({ _genre, _topRatedTvShows }: IProps) {
  const [currentShows, setCurrentShows] = useState<number>(0);

  const setPrevShows = useCallback(() => {
    if (currentShows === 0) setCurrentShows(_topRatedTvShows.length - 1);
    setCurrentShows((prevState) => prevState - 1);
  }, [currentShows, _topRatedTvShows.length]);

  const setNextShows = useCallback(() => {
    if (currentShows === _topRatedTvShows.length - 1) setCurrentShows(0);
    setCurrentShows((prevState) => prevState + 1);
  }, [currentShows, _topRatedTvShows.length]);

  const showsCarousel = useMemo(() => {
    const shows = _topRatedTvShows[currentShows];
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
            <Card
              id={shows.id}
              imgSrc={shows.poster_path}
              title={shows.name}
              className="flex-shrink-0 w-1/4"
              isList={false}
              menu="tv"
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
              <button className="bg-cyan-200 my-5 px-6 py-3 rounded-full border-2 border-black font-semibold hover:bg-cyan-400">
                Watch Now
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
  }, [_topRatedTvShows, _genre, currentShows, setNextShows, setPrevShows]);

  const RenderMain = useMemo(() => {
    return <Section title="Top Rated TV Shows">{showsCarousel}</Section>;
  }, [showsCarousel]);

  return RenderMain;
}
