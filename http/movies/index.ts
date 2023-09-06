import { Genre, Movie, MovieDetail, MultiSearchResult, HttpMethod } from "@/types";

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface SearchResponse {
  page: number;
  results: MultiSearchResult[];
  total_pages: number;
  total_results: number;
}

interface GenreResponse {
  genres: Genre[];
}

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

export async function getTrendingMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/day?language=en-US`,
      CONFIG("GET")
    );
    const data: MovieResponse = await response.json();
    return data.results;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}

// i add inClient params also even CONFIG has inClient param and has default value, because this function is called in both server and client
export async function getListsMovie(
  slug: string,
  page: number = 1,
  inClient: boolean = false
) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${slug}language=en-US&page=${page}`,
      CONFIG("GET", inClient)
    );
    const data: MovieResponse = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}

export async function getMovieGenre() {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list`, CONFIG("GET"));
    const data: GenreResponse = await response.json();
    const mappedGenre = data.genres.map((e) => [e.id, e.name]);
    return Object.fromEntries(mappedGenre);
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}

export async function getDetailMovie(id: number) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}`, CONFIG("GET", true));
    const data: MovieDetail = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}

export async function searchMovieAndShows(keyword: string, page: number = 1) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?query=${keyword}&include_adult=false&language=en-US&page=${page}`,
      CONFIG("GET", true)
    );
    const data: SearchResponse = await response.json();

    // response is included person also, in this case we just want to get movie and tv shows only
    const movieAndShows = data.results.filter(
      (data) => data.media_type !== "person"
    );
    return { ...data, results: movieAndShows };
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}
