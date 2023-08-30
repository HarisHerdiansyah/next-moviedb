"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Container, Card } from "@/components";
import { MultiSearchResult } from "@/types";
import { searchMovieAndShows } from "@/http/movies";
import { useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

export default function Page() {
  const searchParams = useSearchParams();
  const [searchResult, setSearchResult] = useState<MultiSearchResult[]>([]);
  const [pageAndResult, setPageAndResult] = useState({
    page: 0,
    result: 0
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getSearchResult = useCallback(async () => {
    const keyword = searchParams.get("keyword") ?? "";
    const response = await searchMovieAndShows(keyword, currentPage);
    setSearchResult(response.results);
    setPageAndResult({
      page: response.total_pages,
      result: response.total_results
    });
  }, [searchParams, currentPage]);

  useEffect(() => {
    getSearchResult();
  }, [getSearchResult]);

  return (
    <Container>
      <p className="text-2xl font-semibold mb-10">
        Search result {pageAndResult.page} pages with {pageAndResult.result}{" "}
        items :
      </p>
      <div className="flex flex-wrap justify-around items-start gap-x-8 gap-y-20">
        {searchResult.map((res) => (
          <Card
            key={res.id}
            id={res.id}
            menu={res.media_type}
            title={res.media_type === "movie" ? res.title : res.name}
            imgSrc={res.poster_path}
            releaseDate={
              res.media_type === "movie" ? res.release_date : res.first_air_date
            }
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
