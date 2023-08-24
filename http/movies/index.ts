const { TOKEN } = process.env;
import { Movie } from "@/types";

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function getTrendingMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TOKEN}`
        }
      }
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
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TOKEN}`
        }
      }
    );
    const data: MovieResponse = await response.json();
    return data.results;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
}
