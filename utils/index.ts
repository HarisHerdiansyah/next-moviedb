export function genreStringify(
  genreIds: number[],
  genreObj: { [key: number]: string }
) {
  const genres: string[] = [];
  genreIds.forEach((genreId) => {
    const genre: string = genreObj[genreId];
    genres.push(genre);
  });
  return genres.join(", ");
}

export function exportGenre(genre: any[]) {
  const genres: string[] = [];
  genre.forEach((g) => {
    genres.push(g.name);
  });
  return genres.join(", ");
}

export function exportProductionCountries(datalist: any[]) {
  const countries: string[] = [];
  datalist.forEach((data) => {
    countries.push(data.name);
  });
  return countries.join(", ");
}

export const DROPDOWN = {
  TV: ["Airing Today", "On The Air", "Popular", "Top Rated"],
  Movie: ["Now Playing", "Popular", "Top Rated", "Upcoming"]
};

export type DropdownMenu = keyof typeof DROPDOWN;
