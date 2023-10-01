const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const BASE_PATH = "https://api.themoviedb.org/3";

export async function getMovies() {
  const url = `${BASE_PATH}/movie/now_playing?language=en-US&page=1&region=kr`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  };
  const response = await fetch(url, options);
  return await response.json();
}
