import { ToastOptions } from "react-toastify";

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

export const TVShowsEpisodeAir = [
  "title",
  "episode_number",
  "season_number",
  "overview",
  "air_date"
];

export const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored"
};
