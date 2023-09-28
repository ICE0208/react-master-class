import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50vw;
  gap: 10px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  height: 300px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [id, setId] = useState<null | string>(null);
  return (
    <Wrapper>
      <Grid>
        {[1, 2, 3, 4].map((n) => (
          <Box
            key={n}
            layoutId={`${n}`}
            onClick={() => setId(n + "")}
            transition={{ duration: 0.3 }}
          />
        ))}
      </Grid>
      {id && (
        <AnimatePresence>
          <Overlay
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            onClick={() => setId(null)}
          >
            <Box
              layoutId={id + ""}
              style={{
                width: 500,
                height: 300,
              }}
              transition={{ duration: 0.3 }}
            />
          </Overlay>
        </AnimatePresence>
      )}
    </Wrapper>
  );
}

export default App;
