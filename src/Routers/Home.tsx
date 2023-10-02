import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult, getMovies } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, Variants, motion } from "framer-motion";

const OFFSET = 6;

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      const totalMovies = data.results.length - 1;
      const indexLength = Math.ceil(totalMovies / OFFSET);
      setIndex((prev) => (prev + 1) % indexLength);
    }
  };
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
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
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
                      key={movie.id}
                      $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    ></Box>
                  )) || null}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background: black;
  height: 200vh;
  overflow-x: hidden;
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
  background-image: url(${(props) => props.$bgPhoto});
`;

export default Home;
