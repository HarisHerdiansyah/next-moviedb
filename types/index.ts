interface Collection {
  id: number;
  name: string;
  poster_path: string;
}

interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}

interface Language {
  english_name: string;
  is0_639_1: string;
  name: string;
}

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  profile_path: string;
}

interface LastEpisodeAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

interface Networks {
  id: number;
  logo_path: string;
  name: string;
}

interface Season {
  air_date: string | any;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | any;
  season_number: number;
  vote_average: number;
}

// EXPORTED INTERFACE START HERE
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection[];
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_title: string;
  overview: string;
  poster_path: string;
  popularity: number;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface TVShow {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface TVShowDetail {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy;
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  in_production: true;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeAir;
  name: string;
  next_episode_to_air: LastEpisodeAir;
  networks: Networks[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_countery: string[];
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  popularity: number;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  seasons: Season[];
  spoken_languages: Language[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface MultiSearchResult extends Movie, TVShow {}
