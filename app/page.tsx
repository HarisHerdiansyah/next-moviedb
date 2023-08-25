import React from "react";
import UpcomingMovies from "./components/upcomingMovies";

import { Container, Section, Card } from "@/components";
import {
  getTrendingMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMovieGenre
} from "@/http/movies";
import Styles from "@/styles/main.module.css";

export default async function page() {
  const [trendingMovies, popularMovies, upcomingMovies, movieGenre] =
    await Promise.all([
      getTrendingMovies(),
      getPopularMovies(),
      getUpcomingMovies(),
      getMovieGenre()
    ]);

  return (
    <Container>
      <div className="w-full bg-gradient-to-tr from-indigo-800 to-indigo-600 p-8 rounded">
        <p className="text-white text-4xl font-bold mb-5">Welcome!</p>
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
            />
            <button className="w-1/4 py-2 px-3 bg-indigo-950 text-white font-semibold rounded outline-none">
              Search
            </button>
          </div>
        </div>
      </div>

      <UpcomingMovies
        _upcomingMovies={upcomingMovies}
        _movieGenre={movieGenre}
      />

      <Section title="Trending">
        <div
          className={`${Styles.customScroll} flex justify-start items-start gap-10 overflow-x-scroll pt-8 pb-5`}
        >
          {trendingMovies.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              title={movie.title}
              lang={movie.original_language}
              imgSrc={movie.poster_path}
              releaseDate={movie.release_date}
              alt={movie.title}
            />
          ))}
        </div>
      </Section>

      <Section title="Popular on this week">
        <div
          className={`${Styles.customScroll} flex justify-start items-start gap-10 overflow-x-scroll pt-8 pb-5`}
        >
          {popularMovies.map((movie) => (
            <Card
              key={movie.id}
              id={movie.id}
              title={movie.title}
              lang={movie.original_language}
              imgSrc={movie.poster_path}
              releaseDate={movie.release_date}
              alt={movie.title}
            />
          ))}
        </div>
      </Section>
    </Container>
  );
}
