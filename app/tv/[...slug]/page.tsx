"use client";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
import { Container, Card } from "@/components";
import { getListsTVShows } from "@/http/tv";
import { TvShowsEndpointType, tvShowsEndpoint } from "@/utils/contants";

type IProps = {
  params: {
    slug: TvShowsEndpointType[];
  };
};

export default function Page({ params: { slug } }: IProps) {
  const [pageAndResult, setPageAndResult] = useState({
    page: 0,
    result: 0
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isFetching } = useQuery({
    queryKey: [`movie-${slug[0]}`, currentPage],
    queryFn: () => getListsTVShows(tvShowsEndpoint[slug[0]], currentPage, true),
    onSuccess(data) {
      setPageAndResult({
        page: data.total_pages,
        result: data.total_results
      });
    }
  });

  return (
    <Container>
      <p className="text-lg sm:text-2xl font-semibold mb-10">
        {isFetching
          ? "Loading . . . ."
          : `Result for TV Shows (${slug[0].replaceAll("-", " ")}):`}
      </p>
      <div className="flex flex-wrap justify-around items-start gap-x-8 gap-y-20">
        {data?.results?.map((res) => (
          <Card
            key={res.id}
            id={res.id}
            menu="tv"
            title={res.name}
            imgSrc={res.poster_path}
            releaseDate={res.first_air_date}
            rating={res.vote_average}
          />
        ))}
      </div>
      {pageAndResult.page > 1 && (
        <div className="flex justify-center items-center flex-col mt-20 mb-10">
          <p className="sm:hidden">
            Page {currentPage} of {pageAndResult.page}
          </p>
          <ReactPaginate
            pageCount={pageAndResult.page}
            onPageChange={({ selected }) => setCurrentPage(selected + 1)}
            previousLabel="< Prev"
            nextLabel="Next >"
            containerClassName="flex items-center gap-3 sm:text-xl"
            pageClassName="hidden sm:block sm:py-1 sm:px-2 sm:rounded sm:w-fit sm:text-center sm:flex-shrink-0"
            activeClassName="bg-indigo-900 text-white font-medium"
          />
        </div>
      )}
    </Container>
  );
}
