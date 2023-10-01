const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

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
