"use client";

import React, { useCallback, useContext } from "react";
import { Context } from "@/context/ContextProvider";
import { Container, Card } from "@/components";
import { MultiSearchResult } from "@/types";

export default function Page() {
  const { favList } = useContext(Context);

  // movie have "title" prop as a title of film, in other case tv shows have "name" property as a title
  // so if there is "title" prop then the data is movie object, else is tv shows
  const checkIsMovie = useCallback(
    (object: MultiSearchResult) => object.hasOwnProperty("title"),
    []
  );

  return (
    <Container>
      <p className="text-lg sm:text-2xl font-semibold mb-10">Favourite :</p>
      <div className="flex flex-wrap justify-around items-start gap-x-8 gap-y-20">
        {favList.map((res: MultiSearchResult) => {
          const isMovie = checkIsMovie(res);
          return (
            <Card
              key={res.id}
              id={res.id}
              menu={isMovie ? "movie" : "tv"}
              title={isMovie ? res.title : res.name}
              imgSrc={res.poster_path}
              releaseDate={isMovie ? res.release_date : res.first_air_date}
              rating={res.vote_average}
            />
          );
        })}
      </div>
    </Container>
  );
}
