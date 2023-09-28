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
  invisible: {
    x: 500,
    opacity: 0,
    scale: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0.4,
    },
  },
  exit: {
    x: -500,
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function App() {
  const [visible, setVisible] = useState(1);
  const nextPlease = () => setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  return (
    <Wrapper>
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
          (i) =>
            i === visible && (
              <Box
                variants={box}
                initial="invisible"
                animate="visible"
                exit="exit"
                key={i}
              >
                {i}
              </Box>
            )
        )}
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
    </Wrapper>
  );
}

export default App;
