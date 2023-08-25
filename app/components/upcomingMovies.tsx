"use client";

import React, { useCallback, useState, useMemo } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Section, Card } from "@/components";
import { genreStringify } from "@/utils";

type IProps = {
  _upcomingMovies: any;
  _movieGenre: any;
};

export default function Component({ _movieGenre, _upcomingMovies }: IProps) {
  // const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<number>(0);

  const setPrevMovie = useCallback(() => {
    if (currentMovie === 0) setCurrentMovie(_upcomingMovies.length - 1);
    setCurrentMovie((prevState) => prevState - 1);
  }, [currentMovie, _upcomingMovies.length]);

  const setNextMovie = useCallback(() => {
    if (currentMovie === _upcomingMovies.length - 1) setCurrentMovie(0);
    setCurrentMovie((prevState) => prevState + 1);
  }, [currentMovie, _upcomingMovies.length]);

  const movieCarousel = useMemo(() => {
    const movie = _upcomingMovies[currentMovie];
    const genre = genreStringify(movie.genre_ids, _movieGenre);
    return (
      <div
        className="w-full bg-cover bg-no-repeat bg-center mt-5 overflow-auto h-[480px]"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
        }}
      >
        <div className="bg-black/30 backdrop-blur-sm py-16 flex items-center w-full h-full">
          <div
            className="w-32 flex justify-center cursor-pointer"
            onClick={() => setPrevMovie()}
          >
            <BsChevronCompactLeft className="text-white text-4xl" />
          </div>
          <div className="flex gap-14 items-center justify-center">
            <Card
              id={movie.id}
              imgSrc={movie.poster_path}
              alt={movie.title}
              className="flex-shrink-0 w-1/4"
            />
            <div className="max-w-[768px]">
              <p className="text-4xl line-clamp-1 text-slate-50 font-semibold my-5">
                {movie.title}
              </p>
              <p className="text-lg break-words line-clamp-2 text-white my-5">
                {movie.overview}
              </p>
              <p className="text-lg text-white inline mr-10">
                Language : {movie.original_language.toUpperCase()}
              </p>
              <p className="text-lg text-white inline">
                Total Vote : {movie.vote_count}
              </p>
              <p className="text-lg text-white">Genre : {genre}</p>
              <button className="bg-cyan-200 my-5 px-6 py-3 rounded-full border-2 border-black font-semibold hover:bg-cyan-400">
                Watch Now
              </button>
            </div>
          </div>
          <div
            className="w-32 flex justify-center cursor-pointer"
            onClick={() => setNextMovie()}
          >
            <BsChevronCompactRight className="text-white text-4xl" />
          </div>
        </div>
      </div>
    );
  }, [_upcomingMovies, _movieGenre, currentMovie, setNextMovie, setPrevMovie]);

  const RenderMain = useMemo(() => {
    return <Section title="Upcoming movies">{movieCarousel}</Section>;
  }, [movieCarousel]);

  return RenderMain;
}
