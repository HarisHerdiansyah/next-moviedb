const { TOKEN } = process.env;
import { Genre, Movie, MovieDetail } from "@/types";

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface GenreResponse {
  genres: Genre[];
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const BASE_URL = "https://api.themoviedb.org/3";

const CONFIG = (method: HttpMethod) => {
  return {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`
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

export async function getPopularMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?language=en-US&page=1`,
      CONFIG("GET")
    );
    const data: MovieResponse = await response.json();
    return data.results;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}

export async function getUpcomingMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/upcoming?language=en-US&page=1`,
      CONFIG("GET")
    );
    const data: MovieResponse = await response.json();
    return data.results;
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
    const response = await fetch(`${BASE_URL}/movie/${id}`, CONFIG("GET"));
    const data: MovieDetail = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}
