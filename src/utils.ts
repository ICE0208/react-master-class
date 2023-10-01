const IMAGE_BASEURL = "https://image.tmdb.org/t/p";

export function makeImagePath(id: string, format = "original") {
  return `${IMAGE_BASEURL}/${format}/${id}`;
}
