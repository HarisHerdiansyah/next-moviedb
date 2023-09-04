"use client";

import React, { useMemo } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { find } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components";
import { getDetailMovie } from "@/http/movies";
import {
  exportGenre,
  exportProductionCountries,
  getSessionData
} from "@/utils/data-process";
import { addUserFavourite, deleteUserFavourite } from "@/http/favourite";

type IProps = {
  params: {
    id: string;
  };
};

export default function Page({ params: { id } }: IProps) {
  const parseId = parseInt(id);
  const { data: sesssion } = useSession();
  const { data: detailMovie } = useQuery({
    queryKey: ["detailMovie", parseId],
    queryFn: () => getDetailMovie(parseId)
  });

  const isFav = useMemo(() => {
    const favList = getSessionData();
    const checkFav = find(favList, ["id", parseId]);
    return !!checkFav;
  }, [parseId]);

  const genre = useMemo(() => {
    if (detailMovie?.genres) {
      return exportGenre(detailMovie?.genres);
    }
    return "";
  }, [detailMovie?.genres]);

  const countries = useMemo(() => {
    if (detailMovie?.production_countries) {
      return exportProductionCountries(detailMovie?.production_countries);
    }
    return "";
  }, [detailMovie?.production_countries]);

  return (
    <>
      <div
        className="w-full h-[500px] bg-fuchsia-400 bg-cover bg-no-repeat bg-center overflow-auto"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${detailMovie?.backdrop_path}")`
        }}
      >
        <div className="bg-black/30 backdrop-blur-sm py-16 px-32 w-full h-full flex items-start gap-14">
          <Image
            alt="sample"
            src={`https://image.tmdb.org/t/p/original${detailMovie?.poster_path}`}
            width={225}
            height={400}
            className="flex-shrink-0"
          />
          <div className="pr-12">
            <p className="text-4xl line-clamp-1 text-slate-50 font-semibold mb-5">
              {detailMovie?.title}
            </p>
            <table className="border-spacing-x-9 border-separate">
              <tbody className="text-slate-50 text-xl">
                <tr>
                  <td>Original Title</td>
                  <td>: {detailMovie?.original_title}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>: {detailMovie?.vote_average.toFixed(1)}</td>
                </tr>
                <tr>
                  <td>Genre</td>
                  <td>: {genre}</td>
                </tr>
              </tbody>
            </table>
            {detailMovie?.homepage && (
              <Link
                className="text-xl line-clamp-1 text-slate-50 my-5"
                href={detailMovie?.homepage}
              >
                Visit Homepage Here!
              </Link>
            )}
            {isFav ? (
              <button
                className="bg-rose-500 text-rose-50 border-2 border-rose-500 font-semibold rounded px-5 py-3 flex items-center"
                onClick={() =>
                  deleteUserFavourite(sesssion?.user?.email as string, parseId)
                }
              >
                <FaHeart className="mr-2" />
                Added
              </button>
            ) : (
              <button
                className="bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-rose-50 border-2 border-rose-500 font-semibold rounded px-5 py-3 flex items-center transition-all"
                onClick={() =>
                  addUserFavourite(sesssion?.user?.email as string, detailMovie)
                }
              >
                <FaHeart className="mr-2" />
                Add to Favourite
              </button>
            )}
          </div>
        </div>
      </div>
      <Container>
        <div className="flex justify-between">
          <div className="pr-16">
            <section className="mb-8">
              <p className="text-2xl font-semibold mb-3">Overview :</p>
              <article className="text-justify">
                {detailMovie?.overview}
              </article>
            </section>
            <section className="mb-8">
              <p className="text-2xl font-semibold mb-3">
                Tagline :{" "}
                <span className="font-normal">{detailMovie?.tagline}</span>
              </p>
            </section>
            <section className="mb-8">
              <p className="text-2xl font-semibold mb-3">
                Production Countries :{" "}
                <span className="font-normal">{countries}</span>
              </p>
            </section>
            <section className="mb-8">
              <p className="text-2xl font-semibold mb-3">
                Production Companies :
              </p>
              <div className="flex flex-wrap items-center gap-8">
                {detailMovie?.production_companies.map((e) => {
                  return (
                    e.logo_path && (
                      <div className="w-[150px]" key={e.id}>
                        <Image
                          src={`https://image.tmdb.org/t/p/original${e.logo_path}`}
                          alt={e.name}
                          width={150}
                          height={150}
                        />
                      </div>
                    )
                  );
                })}
              </div>
            </section>
          </div>
          <div className="w-[300px] h-fit border-2 border-stone-500 p-5 flex-shrink-0">
            <p className="text-center">Rating :</p>
            <div className="flex items-center justify-center my-3 gap-3">
              <FaStar size={40} className="text-yellow-400" />
              <p className="text-4xl">{detailMovie?.vote_average.toFixed(2)}</p>
            </div>
            <table className="border-separate mt-5">
              <tbody>
                <tr>
                  <td>Total vote</td>
                  <td>: {detailMovie?.vote_count}</td>
                </tr>
                <tr>
                  <td>Popularity</td>
                  <td>: {detailMovie?.popularity}</td>
                </tr>
                <tr>
                  <td>Release date</td>
                  <td>: {detailMovie?.release_date}</td>
                </tr>
                <tr>
                  <td>Revenue</td>
                  <td>
                    : $
                    {Intl.NumberFormat("en-US").format(
                      detailMovie?.revenue as number
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  );
}
