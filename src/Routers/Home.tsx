import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";

const BoxVariants: Variants = {
  normal: {
    scale: 1,
    transition: {
      duration: 0.3,
      type: "tween",
    },
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

const InfoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.3,
      type: "tween",
    },
  },
};

const OFFSET = 6;

function Home() {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");

  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [rowVariants, setRowVariants] = useState<Variants>({
    hidden: {
      x: windowWidth,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -windowWidth,
    },
  });

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      const totalMovies = data.results.length - 1;
      const indexLength = Math.ceil(totalMovies / OFFSET);
      setIndex((prev) => (prev + 1) % indexLength);
    }
  };

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };
  const onOverlayClick = () => navigate("/");

  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.movieId
    );
  useEffect(() => {
    // 윈도우 너비 변경 시 이벤트 핸들러
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      setWindowWidth(newWindowWidth);

      // rowVariants 업데이트
      setRowVariants({
        hidden: {
          x: newWindowWidth,
        },
        visible: {
          x: 0,
        },
        exit: {
          x: -newWindowWidth,
        },
      });
    };

    // 윈도우 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Wrapper
      $preventScroll={Boolean(bigMovieMatch)}
      // ref={scrollRef}
    >
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <div style={{ overflowX: "hidden" }}>
          <Banner
            onClick={increaseIndex}
            $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false}>
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 0.6 }}
                onAnimationComplete={(status) => {
                  if (status === "exit") {
                    setLeaving(false);
                  }
                }}
              >
                {data?.results
                  ?.slice(1)
                  ?.slice(OFFSET * index, OFFSET * index + OFFSET)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      onClick={() => onBoxClicked(movie.id)}
                      key={movie.id}
                      $bgPhoto={makeImagePath(
                        movie.backdrop_path || movie.poster_path,
                        "w500"
                      )}
                      variants={BoxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ duration: 0.3 }}
                    >
                      <Info variants={InfoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  )) || null}
              </Row>
            </AnimatePresence>
          </Slider>
          <div style={{ height: "100vh" }}></div>

          {bigMovieMatch && (
            <AnimatePresence>
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie layoutId={bigMovieMatch.params.movieId}>
                  {clickedMovie && (
                    <>
                      <BigCover
                        $backgroundImage={makeImagePath(
                          clickedMovie.backdrop_path ||
                            clickedMovie.poster_path,
                          "w500"
                        )}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverView>{clickedMovie.overview}</BigOverView>
                    </>
                  )}
                </BigMovie>
              </>
            </AnimatePresence>
          )}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $preventScroll: boolean }>`
  background: black;
  height: 100vh;
  overflow-y: ${(props) => (props.$preventScroll ? "hidden" : "visible")};
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 28px;
  width: 44%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  height: 200px;
  font-size: 64px;
  cursor: pointer;
  background-image: url(${(props) => props.$bgPhoto});
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0px;
  h4 {
    text-align: center;
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 40vw;
  height: 80vh;
  background-color: ${(props) => props.theme.black.lighter};
  inset: 0;
  margin: auto;
  border-radius: 15px;
  overflow: hidden;
`;

const BigCover = styled.div<{ $backgroundImage: string }>`
  object-fit: cover;
  width: 100%;
  height: 300px;
  background-image: linear-gradient(to top, black, transparent),
    url(${(props) => props.$backgroundImage});
`;

const BigTitle = styled.h3`
  text-align: left;
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 32px;
  position: relative;
  transform: translate(0, -100%);
`;

const BigOverView = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 24px;
  position: relative;
  top: -30px;
`;

export default Home;
