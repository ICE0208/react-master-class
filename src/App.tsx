import styled from "styled-components";
import {
  Variants,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

// motion div에 styled 적용
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants: Variants = {
  click: { scale: 1, borderRadius: "100px" },
  drag: { backgroundColor: "rgb(46, 204, 113)" },
};

function App() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-800, 0, 800], [2, 1, 0]);
  useMotionValueEvent(x, "change", (l) => {
    console.log(scale.get());
  });

  return (
    <Wrapper>
      <Box
        style={{ x, scale }}
        drag="x"
        dragSnapToOrigin
      />
    </Wrapper>
  );
}

export default App;
