import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";

const IMAGE_BASEURL = "https://image.tmdb.org/t/p/original";

function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
    retry: false,
    refetchOnWindowFocus: false,
  });

  console.log(data);
  return <div style={{ backgroundColor: "white", height: "200vh" }}>home</div>;
}

export default Home;
