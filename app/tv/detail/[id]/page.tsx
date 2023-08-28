import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getDetailTVShows } from "@/http/tv";
import { exportGenre, exportProductionCountries } from "@/utils";
import { Card, Container } from "@/components";
import { FaStar } from "react-icons/fa";

type IProps = {
  params: {
    id: string;
  };
};

export default async function page({ params: { id } }: IProps) {
  const parseId = parseInt(id);
  const detailTVShows = await getDetailTVShows(parseId);

  return (
    <>
      <div
        className="w-full h-[500px] bg-fuchsia-400 bg-cover bg-no-repeat bg-center overflow-auto"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original${detailTVShows.backdrop_path}")`
        }}
      >
        <div className="bg-black/30 backdrop-blur-sm py-16 px-32 w-full h-full flex items-start gap-14">
          <Image
            alt="sample"
            src={`https://image.tmdb.org/t/p/original${detailTVShows.poster_path}`}
            width={225}
            height={400}
            className="flex-shrink-0"
          />
          <div className="pr-12">
            <p className="text-4xl line-clamp-1 text-slate-50 font-semibold mb-5">
              {detailTVShows.name}
            </p>
            <table className="border-spacing-x-9 border-separate">
              <tbody className="text-slate-50 text-xl">
                <tr>
                  <td>Original Title</td>
                  <td>: {detailTVShows.original_name}</td>
                </tr>
                <tr>
                  <td>First Air Date</td>
                  <td>: {detailTVShows.first_air_date}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>: {detailTVShows.vote_average.toFixed(1)}</td>
                </tr>
                <tr>
                  <td>Genre</td>
                  <td>: {exportGenre(detailTVShows.genres)}</td>
                </tr>
              </tbody>
            </table>
            <Link
              className="text-xl line-clamp-1 text-slate-50 my-5"
              href={detailTVShows.homepage}
            >
              Visit Homepage Here!
            </Link>
          </div>
        </div>
      </div>
      <Container>
        <div className="flex justify-between">
          <div className="pr-16">
            <section className="mb-8">
              <p className="text-2xl font-semibold mb-3">Overview :</p>
              <article className="text-justify">
                {detailTVShows.overview}
              </article>
            </section>
            <section className="mb-8">
              <p className="text-2xl font-semibold mb-3">
                Last Episode to Air :
              </p>
              <article className="text-justify flex flex-col gap-2">
                <p>
                  <span className="font-semibold">Title</span> :{" "}
                  {detailTVShows.last_episode_to_air.name ?? "-"}
                </p>
                <p>
                  <span className="font-semibold">Episode Number</span> :{" "}
                  {detailTVShows.last_episode_to_air.episode_number ?? "-"}
                </p>
                <p>
                  <span className="font-semibold">Season Number</span> :{" "}
                  {detailTVShows.last_episode_to_air.season_number ?? "-"}
                </p>
                <p>
                  <span className="font-semibold">Overview</span> :{" "}
                  {detailTVShows.last_episode_to_air.overview ?? "-"}
                </p>
                <p>
                  <span className="font-semibold">Air Date</span> :{" "}
                  {detailTVShows.last_episode_to_air.air_date ?? "-"}
                </p>
              </article>
            </section>
            <section className="mb-8">
              <p className="text-2xl font-semibold mb-3">
                Next Episode to Air :
              </p>
              <article className="text-justify flex flex-col gap-2">
                <p>
                  <span className="font-semibold">Title</span> :{" "}
                  {detailTVShows.next_episode_to_air.name ?? "-"}
                </p>
                <p>
                  <span className="font-semibold">Episode Number</span> :{" "}
                  {detailTVShows.next_episode_to_air.episode_number ?? "-"}
                </p>
                <p>
                  <span className="font-semibold">Season Number</span> :{" "}
                  {detailTVShows.next_episode_to_air.season_number ?? "-"}
                </p>
                <p>
                  <span className="font-semibold">Overview</span> :{" "}
                  {detailTVShows.next_episode_to_air.overview ?? "-"}
                </p>
                <p>
                  <span className="font-semibold">Air Date</span> :{" "}
                  {detailTVShows.next_episode_to_air.air_date ?? "-"}
                </p>
              </article>
            </section>
            <section className="mb-8">
              <p className="text-2xl font-semibold mb-3">
                Tagline :{" "}
                <span className="font-normal">{detailTVShows.tagline}</span>
              </p>
            </section>
            <section className="mb-8">
              <p className="text-2xl font-semibold mb-3">
                Production Countries :{" "}
                <span className="font-normal">
                  {exportProductionCountries(
                    detailTVShows.production_countries
                  )}
                </span>
              </p>
            </section>
            <section className="mb-8">
              <p className="text-2xl font-semibold mb-3">
                Production Companies :
              </p>
              <div className="flex flex-wrap items-center gap-8">
                {detailTVShows.production_companies.map((e) => {
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
            <section className="mb-8">
              <p className="text-2xl font-semibold mb-3">Season :</p>
              <div className="flex flex-wrap items-center gap-8">
                {detailTVShows.seasons.map((e) => (
                  <Card
                    imgSrc={`https://image.tmdb.org/t/p/original${e.poster_path}`}
                    title={e.name}
                    key={e.id}
                    rating={e.vote_average}
                    isList
                  />
                ))}
              </div>
            </section>
            <section className="my-20"></section>
          </div>
          <div className="w-[300px] h-fit border-2 border-stone-500 p-5 flex-shrink-0">
            <p className="text-xl font-medium text-center">Rating :</p>
            <div className="flex items-center justify-center my-3 gap-3">
              <FaStar size={40} className="text-yellow-400" />
              <p className="text-4xl">
                {detailTVShows.vote_average.toFixed(2)}
              </p>
            </div>
            <table className="border-separate mt-5">
              <tbody>
                <tr>
                  <td>Total vote</td>
                  <td>: {detailTVShows.vote_count}</td>
                </tr>
                <tr>
                  <td>Popularity</td>
                  <td>: {detailTVShows.popularity}</td>
                </tr>
                <tr>
                  <td>Number of Episode</td>
                  <td>: {detailTVShows.number_of_episodes}</td>
                </tr>
                <tr>
                  <td>Number of Seasons</td>
                  <td>: {detailTVShows.number_of_seasons}</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-10">
              <p className="text-xl font-medium mb-3">Available On :</p>
              <div className="flex flex-wrap items-center justify-around gap-8">
                {detailTVShows.networks.map((e) => (
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
