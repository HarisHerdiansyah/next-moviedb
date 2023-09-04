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

export function getSessionData() {
  const data = window.sessionStorage.getItem("favourite") as string;
  const result = JSON.parse(data);
  return result;
}

export function setFavourite(payload: any) {
  const data = getSessionData();
  data.push(payload);
  return window.sessionStorage.setItem("favourite", JSON.stringify(data));
}

export function removeFavourite(id: number) {
  const data = getSessionData();
  const updateData = data.filter((e: any) => e.id !== id);
  return window.sessionStorage.setItem("favourite", JSON.stringify(updateData));
}
