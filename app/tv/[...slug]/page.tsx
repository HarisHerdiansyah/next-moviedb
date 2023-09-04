"use client";

import React, { useState, useCallback, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Container, Card } from "@/components";
import { getListsTVShows } from "@/http/tv";
import { TvShowsEndpointType, tvShowsEndpoint } from "@/utils/contants";
import { TVShow } from "@/types";

type IProps = {
  params: {
    slug: TvShowsEndpointType[];
  };
};

export default function Page({ params: { slug } }: IProps) {
  const [requestResult, setRequestResult] = useState<TVShow[]>([]);
  const [pageAndResult, setPageAndResult] = useState({
    page: 0,
    result: 0
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getRequestResult = useCallback(async () => {
    const endpoint: TvShowsEndpointType = slug[0];
    const response = await getListsTVShows(
      tvShowsEndpoint[endpoint],
      currentPage,
      true
    );
    setRequestResult(response.results);
    setPageAndResult({
      page: response.total_pages,
      result: response.total_results
    });
  }, [slug, currentPage]);

  useEffect(() => {
    getRequestResult();
  }, [getRequestResult]);

  return (
    <Container>
      <p className="text-2xl font-semibold mb-10">
        TV Shows result {pageAndResult.page} pages with {pageAndResult.result}{" "}
        items :
      </p>
      <div className="flex flex-wrap justify-around items-start gap-x-8 gap-y-20">
        {requestResult.map((res) => (
          <Card
            key={res.id}
            id={res.id}
            menu="tv"
            title={res.name}
            imgSrc={res.poster_path}
            releaseDate={res.first_air_date}
            rating={res.vote_average}
            isList
          />
        ))}
      </div>
      {pageAndResult.page > 1 && (
        <ReactPaginate
          pageCount={pageAndResult.page}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          previousLabel="< Prev"
          nextLabel="Next >"
          containerClassName="flex items-center mt-20 mb-10 gap-3 text-xl"
          pageClassName="py-1 px-2 rounded w-fit text-center flex-shrink-0"
          activeClassName="bg-indigo-900 text-white font-medium"
        />
      )}
    </Container>
  );
}
