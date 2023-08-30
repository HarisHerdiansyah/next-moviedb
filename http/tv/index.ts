import { TVShow, Genre, TVShowDetail } from "@/types";
interface TVShowResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

interface GenreResponse {
  genres: Genre[];
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const BASE_URL = "https://api.themoviedb.org/3";

const CONFIG = (method: HttpMethod, inClient: boolean = false) => {
  return {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${
        inClient ? process.env.NEXT_PUBLIC_TOKEN : process.env.TOKEN
      }`
    }
  };
};

export async function getListsTVShows(
  slug: string,
  page: number = 1,
  inClient: boolean = false
) {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${slug}language=en-US&page=${page}`,
      CONFIG("GET", inClient)
    );
    const data: TVShowResponse = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}

// export async function getTopRatedTVShows() {
//   try {
//     const response = await fetch(`${BASE_URL}/tv/top_rated`, CONFIG("GET"));
//     const data: TVShowResponse = await response.json();
//     return data.results;
//   } catch (error: any) {
//     throw new Error(error.message as string);
//   }
// }

// export async function getOnAirTVShows() {
//   try {
//     const response = await fetch(
//       `${BASE_URL}/tv/on_the_air?language=en-US&page=5`,
//       CONFIG("GET")
//     );
//     const data: TVShowResponse = await response.json();
//     return data.results;
//   } catch (error: any) {
//     throw new Error(error.message as string);
//   }
// }

export async function getTVShowsGenre() {
  try {
    const response = await fetch(`${BASE_URL}/genre/tv/list`, CONFIG("GET"));
    const data: GenreResponse = await response.json();
    const mappedGenre = data.genres.map((e) => [e.id, e.name]);
    return Object.fromEntries(mappedGenre);
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}

export async function getDetailTVShows(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/tv/${id}`, CONFIG("GET"));
    const data: TVShowDetail = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}
