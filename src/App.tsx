import styled from "styled-components";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  position: absolute;
  top: 50px;
`;

const box: Variants = {
  entry: (isBack: number) => ({
    x: isBack < 0 ? -500 : 500,
    opacity: 0,
    scale: 0,
    zIndex: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.4,
    },
  },
  exit: (isBack: number) => ({
    x: isBack < 0 ? 500 : -500,
    opacity: 0,
    scale: 0,
    zIndex: 0,
    transition: {
      duration: 0.5,
    },
  }),
};

function App() {
  const [[visible, direction], setVisible] = useState([0, 1]);
  const move = (direction: number) => {
    setVisible((prev) =>
      prev[0] + direction >= 0 && prev[0] + direction <= 100
        ? [prev[0] + direction, direction]
        : prev
    );
  };
  return (
    <Wrapper>
      <AnimatePresence custom={direction}>
        <Box
          custom={direction}
          variants={box}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={() => move(1)}>next</button>
      <button onClick={() => move(-1)}>prev</button>
    </Wrapper>
  );
}

export default App;
