"use client";

import React, { useCallback, useState, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { Section } from "@/components";
import { genreStringify } from "@/utils/data-process";
import { Movie } from "@/types";

type IProps = {
  _upcomingMovies: any;
  _movieGenre: any;
};

export default function Component({ _movieGenre, _upcomingMovies }: IProps) {
  const [currentMovie, setCurrentMovie] = useState<number>(0);
  const router = useRouter();
  const { data: session } = useSession();

  const setPrevMovie = useCallback(() => {
    if (currentMovie === 0) setCurrentMovie(_upcomingMovies.length - 1);
    setCurrentMovie((prevState) => prevState - 1);
  }, [currentMovie, _upcomingMovies.length]);

  const setNextMovie = useCallback(() => {
    if (currentMovie === _upcomingMovies.length - 1) setCurrentMovie(0);
    setCurrentMovie((prevState) => prevState + 1);
  }, [currentMovie, _upcomingMovies.length]);

  const movieCarousel = useMemo(() => {
    const movie: Movie = _upcomingMovies[currentMovie];
    const genre = genreStringify(movie.genre_ids, _movieGenre);
    return (
      <div
        className="w-full bg-cover bg-no-repeat bg-center mt-5 overflow-auto sm:h-[580px] lg:h-[480px]"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
        }}
      >
        <div className="bg-black/30 backdrop-blur-sm sm:py-8 lg:py-16 flex items-center w-full h-full">
          <div
            className="w-32 flex justify-center cursor-pointer"
            onClick={() => setPrevMovie()}
          >
            <BsChevronCompactLeft className="text-white text-4xl" />
          </div>
          <div className="flex sm:gap-2 lg:gap-14 items-center justify-center sm:flex-col lg:flex-row">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              width={171}
              height={260}
              className="hidden sm:block"
            />
            <div className="max-w-[768px]">
              <p className="sm:text-2xl lg:text-4xl line-clamp-1 text-slate-50 font-semibold my-5">
                {movie.title}
              </p>
              <p className="sm:text-base lg:text-lg break-words line-clamp-2 text-white my-5">
                {movie.overview}
              </p>
              <p className="sm:text-base lg:text-lg text-white inline mr-10">
                Language : {movie.original_language.toUpperCase()}
              </p>
              <p className="sm:text-base lg:text-lg text-white sm:inline line-clamp-1">Genre : {genre}</p>
              <button
                className="bg-cyan-200 my-5 px-4 py-2 lg:px-6 lg:py-3 rounded-full border-2 border-black font-semibold hover:bg-cyan-400 block"
                onClick={() => {
                  if (!session) {
                    return router.push("/api/auth/signin");
                  }
                  return router.push(`/movie/detail/${movie.id}`);
                }}
              >
                See Details
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
  }, [
    _upcomingMovies,
    _movieGenre,
    currentMovie,
    setNextMovie,
    setPrevMovie,
    router,
    session
  ]);

  const RenderMain = useMemo(() => {
    return <Section title="Upcoming movies">{movieCarousel}</Section>;
  }, [movieCarousel]);

  return RenderMain;
}
