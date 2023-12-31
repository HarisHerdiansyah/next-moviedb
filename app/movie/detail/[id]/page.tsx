"use client";

import React, { useMemo, useContext, useCallback } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { find } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Context } from "@/context/ContextProvider";
import { Container, DetailSection } from "@/components";
import { getDetailMovie } from "@/http/movies";
import { exportGenre, exportProductionCountries } from "@/utils/data-process";
import { addUserFavourite, deleteUserFavourite } from "@/http/favourite";
import { toastConfig } from "@/utils/contants";

type IProps = {
  params: {
    id: string;
  };
};

export default function Page({ params: { id } }: IProps) {
  const parseId = parseInt(id);
  const { favList } = useContext(Context);
  const currentRoute = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { data: detailMovie } = useQuery({
    queryKey: ["detailMovie", parseId],
    queryFn: () => getDetailMovie(parseId)
  });

  const isFavourite = useMemo(() => {
    const checkFav = find(favList, ["id", parseId]);
    return !!checkFav;
  }, [parseId, favList]);

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

  const addFavourite = useCallback(async () => {
    const response = await addUserFavourite(
      session?.user?.email as string,
      detailMovie
    );
    if (response) toast.success("Added to Favourite", toastConfig);
  }, [session?.user?.email, detailMovie]);

  const removeFavourite = useCallback(async () => {
    const response = await deleteUserFavourite(
      session?.user?.email as string,
      parseId
    );
    if (response) {
      toast.info("Removed from Favourite", toastConfig);
      router.back();
    }
  }, [session?.user?.email, parseId, router]);

  return (
    <>
      <div
        className="w-full h-[700px] lg:h-[500px] bg-indigo-900/80 bg-cover bg-no-repeat bg-center overflow-auto"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${detailMovie?.backdrop_path}")`
        }}
      >
        <div className="bg-black/30 backdrop-blur-sm p-4 sm:py-8 sm:px-8 lg:py-16 lg:px-32 w-full h-full flex justify-center items-center flex-col gap-8 lg:justify-start lg:items-start lg:gap-14 lg:flex-row">
          <Image
            alt="sample"
            src={`https://image.tmdb.org/t/p/original${detailMovie?.poster_path}`}
            width={225}
            height={400}
            className="flex-shrink-0"
          />
          <div className="pr-0 lg:pr-12">
            <p className="text-xl sm:text-2xl md:3xl lg:text-4xl line-clamp-1 text-slate-50 font-semibold mb-5">
              {detailMovie?.title}
            </p>
            <table className="hidden sm:block sm:border-spacing-x-9 sm:border-separate">
              <tbody className="text-slate-50 sm:text-lg md:text-xl">
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
            <div className="sm:hidden text-white">
              <div className="my-2">
                <p className="font-semibold">Original Title :</p>
                <p>{detailMovie?.original_title}</p>
              </div>
              <div className="my-2">
                <p className="font-semibold">Rating :</p>
                <p>{detailMovie?.vote_average.toFixed(1)}</p>
              </div>
              <div className="my-2">
                <p className="font-semibold">Genre :</p>
                <p>{genre}</p>
              </div>
            </div>
            <Link
              className="sm:text-lg md:text-xl line-clamp-1 text-slate-50 my-5"
              href={detailMovie?.homepage ?? currentRoute}
            >
              Visit Homepage Here!
            </Link>
            {isFavourite ? (
              <button
                className="sm:mt-5 lg:mt-10 bg-rose-500 text-rose-50 border-2 border-rose-500 font-semibold rounded px-3 py-2 sm:px-5 sm:py-3 flex items-center"
                onClick={() => removeFavourite()}
              >
                <FaHeart className="mr-2" />
                Added
              </button>
            ) : (
              <button
                className="sm:mt-5 lg:mt-10 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-rose-50 border-2 border-rose-500 font-semibold rounded px-3 py-2 sm:px-5 sm:py-3 flex items-center transition-all"
                onClick={() => addFavourite()}
              >
                <FaHeart className="mr-2" />
                Add to Favourite
              </button>
            )}
          </div>
        </div>
      </div>
      <Container>
        <div className="flex flex-col justify-center lg:justify-between lg:flex-row">
          <div className="mt-10 pr-0 lg:mt-0 lg:pr-16">
            <DetailSection title="Overview">
              <article className="text-justify">
                {detailMovie?.overview}
              </article>
            </DetailSection>
            <DetailSection
              title="Tagline"
              inlineContent={detailMovie?.tagline}
            />
            <DetailSection
              title="Production Countries"
              inlineContent={countries}
            />
            <DetailSection title="Production Companies">
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
            </DetailSection>
          </div>
          <div className="sm:w-full lg:w-[300px] h-fit border-2 border-stone-500 p-5 flex-shrink-0 order-first lg:order-last">
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
