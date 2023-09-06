import React from "react";
import styled, { keyframes } from "styled-components";
import { Reset } from "styled-reset";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 10%;
  } 
  50% {
    border-radius: 50%;
    transform: rotate(120deg);
  }
  100% {
    transform: rotate(360deg);
    border-radius: 10%;
  }
`;

const Emoji = styled.span`
  font-size: 36px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  // 애니메이션 적용
  animation: ${rotateAnimation} 1s linear infinite;
  // styled component의 자식 styled component에 스타일 적용
  ${Emoji} {
    transition: all 0.5s ease;
    cursor: default;
    &:hover {
      font-size: 98px;
    }
  }
`;

function App() {
  return (
    <React.Fragment>
      <Reset />
      <Wrapper>
        <Box>
          <Emoji>😘</Emoji>
        </Box>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
