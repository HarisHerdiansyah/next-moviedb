import path from "path";

export const DROPDOWN = {
  TV: ["Airing Today", "On The Air", "Popular", "Top Rated"],
  Movie: ["Now Playing", "Popular", "Top Rated", "Upcoming"]
};

export type DropdownMenu = keyof typeof DROPDOWN;

export const movieEndpoint = {
  upcoming: "/upcoming?",
  popular: "/popular?",
  "top-rated": "/top_rated?",
  "now-playing": "/now_playing?"
};

export type MovieEndpointType = keyof typeof movieEndpoint;

export const tvShowsEndpoint = {
  "airing-today": "/airing_today?",
  "on-the-air": "/on_the_air?",
  popular: "/popular?",
  "top-rated": "/top_rated?"
};

export type TvShowsEndpointType = keyof typeof tvShowsEndpoint;

export const localPath = (fileName: string) =>
  path.join(process.cwd(), "local", fileName);
