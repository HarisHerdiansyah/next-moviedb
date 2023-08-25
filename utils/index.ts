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
