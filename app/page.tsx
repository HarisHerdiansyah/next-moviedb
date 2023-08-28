import React from "react";
import UpcomingMovies from "./components/upcomingMovies";
import TopRatedTvShows from "./components/topRatedTvShows";

import { Container, Section, Card } from "@/components";
import {
  getTrendingMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMovieGenre
} from "@/http/movies";
import {
  getOnAirTVShows,
  getTopRatedTVShows,
  getTVShowsGenre
} from "@/http/tv";
import Styles from "@/styles/main.module.css";

export default async function page() {
  const [
    trendingMovies,
    popularMovies,
    upcomingMovies,
    movieGenre,
    onAirTVShows,
    topRatedTvShows,
    tvShowsGenre
  ] = await Promise.all([
    getTrendingMovies(),
    getPopularMovies(),
    getUpcomingMovies(),
    getMovieGenre(),
    getOnAirTVShows(),
    getTopRatedTVShows(),
    getTVShowsGenre()
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
      <Section title="Movies : Trending">
        <div
          className={`${Styles.customScroll} flex justify-start items-start gap-10 overflow-x-scroll pt-8 pb-5`}
        >
          {trendingMovies.map((movie) => (
            <Card
              menu="movie"
              key={movie.id}
              id={movie.id}
              title={movie.title}
              lang={movie.original_language}
              imgSrc={movie.poster_path}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
              isList
            />
          ))}
        </div>
      </Section>
      <Section title="Movies : Popular on this week">
        <div
          className={`${Styles.customScroll} flex justify-start items-start gap-10 overflow-x-scroll pt-8 pb-5`}
        >
          {popularMovies.map((movie) => (
            <Card
              menu="movie"
              key={movie.id}
              id={movie.id}
              title={movie.title}
              lang={movie.original_language}
              imgSrc={movie.poster_path}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
              isList
            />
          ))}
        </div>
      </Section>

      <TopRatedTvShows
        _topRatedTvShows={topRatedTvShows}
        _genre={tvShowsGenre}
      />
      <Section title="TV Shows : On the air">
        <div
          className={`${Styles.customScroll} flex justify-start items-start gap-10 overflow-x-scroll pt-8 pb-5`}
        >
          {onAirTVShows.map((show) => (
            <Card
              menu="tv"
              key={show.id}
              id={show.id}
              title={show.name}
              lang={show.original_language}
              imgSrc={show.poster_path}
              rating={show.vote_average}
              isList
            />
          ))}
        </div>
      </Section>
    </Container>
  );
}
