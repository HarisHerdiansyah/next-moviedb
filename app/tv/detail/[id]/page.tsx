"use client";

import React, { useMemo, useContext, useCallback } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { find } from "lodash";
import { useQuery } from "@tanstack/react-query";
import { Context } from "@/context/ContextProvider";
import { getDetailTVShows } from "@/http/tv";
import { exportGenre, exportProductionCountries } from "@/utils/data-process";
import { TVShowsEpisodeAir, toastConfig } from "@/utils/contants";
import { Card, Container, DetailSection } from "@/components";
import { addUserFavourite, deleteUserFavourite } from "@/http/favourite";

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
  const { data: detailTVShows } = useQuery({
    queryKey: ["detailTVShows", parseId],
    queryFn: () => getDetailTVShows(parseId)
  });

  const isFavourite = useMemo(() => {
    const checkFav = find(favList, ["id", parseId]);
    return !!checkFav;
  }, [parseId, favList]);

  const genre = useMemo(() => {
    if (detailTVShows?.genres) {
      return exportGenre(detailTVShows?.genres);
    }
    return "";
  }, [detailTVShows?.genres]);

  const countries = useMemo(() => {
    if (detailTVShows?.production_countries) {
      return exportProductionCountries(detailTVShows?.production_countries);
    }
    return "";
  }, [detailTVShows?.production_countries]);

  const addFavourite = useCallback(async () => {
    const response = await addUserFavourite(
      session?.user?.email as string,
      detailTVShows
    );
    if (response) toast.success("Added to Favourite", toastConfig);
  }, [session?.user?.email, detailTVShows]);

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
        className="w-full h-[500px] bg-indigo-900/80 bg-cover bg-no-repeat bg-center overflow-auto"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${detailTVShows?.backdrop_path}")`
        }}
      >
        <div className="bg-black/30 backdrop-blur-sm py-16 px-32 w-full h-full flex items-start gap-14">
          <Image
            alt="sample"
            src={`https://image.tmdb.org/t/p/original${detailTVShows?.poster_path}`}
            width={225}
            height={400}
            className="flex-shrink-0"
          />
          <div className="pr-12">
            <p className="text-4xl line-clamp-1 text-slate-50 font-semibold mb-5">
              {detailTVShows?.name}
            </p>
            <table className="border-spacing-x-9 border-separate">
              <tbody className="text-slate-50 text-xl">
                <tr>
                  <td>Original Title</td>
                  <td>: {detailTVShows?.original_name}</td>
                </tr>
                <tr>
                  <td>First Air Date</td>
                  <td>: {detailTVShows?.first_air_date}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>: {detailTVShows?.vote_average.toFixed(1)}</td>
                </tr>
                <tr>
                  <td>Genre</td>
                  <td>: {genre}</td>
                </tr>
              </tbody>
            </table>
            <Link
              className="text-xl line-clamp-1 text-slate-50 my-5"
              href={detailTVShows?.homepage ?? currentRoute}
            >
              Visit Homepage Here!
            </Link>
            {isFavourite ? (
              <button
                className="mt-10 bg-rose-500 text-rose-50 border-2 border-rose-500 font-semibold rounded px-5 py-3 flex items-center"
                onClick={() => removeFavourite()}
              >
                <FaHeart className="mr-2" />
                Added
              </button>
            ) : (
              <button
                className="mt-10 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-rose-50 border-2 border-rose-500 font-semibold rounded px-5 py-3 flex items-center transition-all"
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
        <div className="flex justify-between">
          <div className="pr-16">
            <DetailSection title="Overview">
              <article className="text-justify">
                {detailTVShows?.overview}
              </article>
            </DetailSection>
            <DetailSection title="Last Episode to Air">
              <article className="text-justify flex flex-col gap-2">
                {TVShowsEpisodeAir.map((e) => (
                  <p key={e}>
                    <span className="font-semibold capitalize">
                      {e.replace("_", " ")}
                    </span>{" "}
                    : {detailTVShows?.last_episode_to_air?.[e] ?? "-"}
                  </p>
                ))}
              </article>
            </DetailSection>
            <DetailSection title="Next Episode to Air">
              <article className="text-justify flex flex-col gap-2">
                {TVShowsEpisodeAir.map((e) => (
                  <p key={e}>
                    <span className="font-semibold capitalize">
                      {e.replace("_", " ")}
                    </span>{" "}
                    : {detailTVShows?.next_episode_to_air?.[e] ?? "-"}
                  </p>
                ))}
              </article>
            </DetailSection>
            <DetailSection
              title="Tagline"
              inlineContent={detailTVShows?.tagline}
            />
            <DetailSection
              title="Production Contries"
              inlineContent={countries}
            />
            <DetailSection title="Production Companies">
              <div className="flex flex-wrap items-center gap-8">
                {detailTVShows?.production_companies.map((e) => {
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
            <DetailSection title="Season">
              <div className="flex flex-wrap items-center gap-8">
                {detailTVShows?.seasons.map((e) => (
                  <Card
                    imgSrc={`https://image.tmdb.org/t/p/original${e.poster_path}`}
                    title={e.name}
                    key={e.id}
                    id={e.id}
                    rating={e.vote_average}
                  />
                ))}
              </div>
            </DetailSection>
            <section className="my-20"></section>
          </div>
          <div className="w-[300px] h-fit border-2 border-stone-500 p-5 flex-shrink-0">
            <p className="text-xl font-medium text-center">Rating :</p>
            <div className="flex items-center justify-center my-3 gap-3">
              <FaStar size={40} className="text-yellow-400" />
              <p className="text-4xl">
                {detailTVShows?.vote_average.toFixed(2)}
              </p>
            </div>
            <table className="border-separate mt-5">
              <tbody>
                <tr>
                  <td>Total vote</td>
                  <td>: {detailTVShows?.vote_count}</td>
                </tr>
                <tr>
                  <td>Popularity</td>
                  <td>: {detailTVShows?.popularity}</td>
                </tr>
                <tr>
                  <td>Number of Episode</td>
                  <td>: {detailTVShows?.number_of_episodes}</td>
                </tr>
                <tr>
                  <td>Number of Seasons</td>
                  <td>: {detailTVShows?.number_of_seasons}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-10">
              <p className="text-xl font-medium mb-3">Available On :</p>
              <div className="flex flex-wrap items-center justify-around gap-8">
                {detailTVShows?.networks.map((e) => (
                  <div
                    className="w-[100px] h-[100px] flex items-center p-2"
                    key={e.id}
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/original${e.logo_path}`}
                      alt={e.name}
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
