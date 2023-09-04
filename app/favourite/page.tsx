"use client";

import React, { useCallback, useMemo } from "react";
import { Container, Card } from "@/components";
import { getSessionData } from "@/utils/data-process";
import { MultiSearchResult } from "@/types";

export default function Page() {
  const favList = useMemo(() => getSessionData(), []);

  const setTitle = useCallback((object: MultiSearchResult) => {
    if (object.hasOwnProperty("title")) {
      return object.title;
    }
    return object.name;
  }, []);

  const setDate = useCallback((object: MultiSearchResult) => {
    if (object.hasOwnProperty("release_date")) {
      return object.release_date;
    }
    return object.first_air_date;
  }, []);

  return (
    <Container>
      <p className="text-2xl font-semibold mb-10">Favourite :</p>
      <div className="flex flex-wrap justify-around items-start gap-x-8 gap-y-20">
        {favList.map((res: MultiSearchResult) => {
          const title = setTitle(res);
          const releaseDate = setDate(res);
          return (
            <Card
              key={res.id}
              id={res.id}
              menu={res.media_type}
              title={title}
              imgSrc={res.poster_path}
              releaseDate={releaseDate}
              rating={res.vote_average}
              isList
            />
          );
        })}
      </div>
    </Container>
  );
}
