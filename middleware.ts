export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/movie/upcoming",
    "/movie/popular",
    "/movie/top-rated",
    "/movie/now-playing",
    "/tv/airing-today",
    "/tv/on-the-air",
    "/tv/popular",
    "/tv/top-rated",
    "/favourite",
    "/search"
  ]
};
