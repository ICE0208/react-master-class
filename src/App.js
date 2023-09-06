// keyframes import
import React from "react";
import styled, { keyframes } from "styled-components";
import { Reset } from "styled-reset";

const Wrapper = styled.div`
  display: flex;
`;

// keyframes로 애니메이션 만들기
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

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  // 애니메이션 적용
  animation: ${rotateAnimation} 1s linear infinite;
  // styled components의 자식 컴포넌트에 스타일 적용
  span {
    font-size: 36px;
    transition: all 0.5s ease;
    cursor: default;
    // & == span
    &:hover {
      transform: scale(2);
    }
  }
`;

function App() {
  return (
    <React.Fragment>
      <Reset />
      <Wrapper>
        <Box>
          <span>😘</span>
        </Box>
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
