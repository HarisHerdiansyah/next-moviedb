import React from "react";
import UpcomingMovies from "./components/upcomingMovies";
import TopRatedTvShows from "./components/topRatedTvShows";
import SearchBox from "./components/searchBox";

import { Container, Section, Card } from "@/components";
import { getTrendingMovies, getListsMovie, getMovieGenre } from "@/http/movies";
import { movieEndpoint, tvShowsEndpoint } from "@/utils/contants";
import { getListsTVShows, getTVShowsGenre } from "@/http/tv";
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
    getListsMovie(movieEndpoint.popular),
    getListsMovie(movieEndpoint.upcoming),
    getMovieGenre(),
    getListsTVShows(tvShowsEndpoint["on-the-air"]),
    getListsTVShows(tvShowsEndpoint["top-rated"]),
    getTVShowsGenre()
  ]);

  return (
    <Container>
      <SearchBox />
      <UpcomingMovies
        _upcomingMovies={upcomingMovies.results}
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
              imgSrc={movie.poster_path}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
            />
          ))}
        </div>
      </Section>
      <Section title="Movies : Popular on this week">
        <div
          className={`${Styles.customScroll} flex justify-start items-start gap-10 overflow-x-scroll pt-8 pb-5`}
        >
          {popularMovies.results.map((movie) => (
            <Card
              menu="movie"
              key={movie.id}
              id={movie.id}
              title={movie.title}
              imgSrc={movie.poster_path}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
            />
          ))}
        </div>
      </Section>

      <TopRatedTvShows
        _topRatedTvShows={topRatedTvShows.results}
        _genre={tvShowsGenre}
      />
      <Section title="TV Shows : On the air">
        <div
          className={`${Styles.customScroll} flex justify-start items-start gap-10 overflow-x-scroll pt-8 pb-5`}
        >
          {onAirTVShows.results.map((show) => (
            <Card
              menu="tv"
              key={show.id}
              id={show.id}
              title={show.name}
              imgSrc={show.poster_path}
              releaseDate={show.first_air_date}
              rating={show.vote_average}
            />
          ))}
        </div>
      </Section>
    </Container>
  );
}
