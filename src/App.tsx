import React from "react";
import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 32px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
`;

// Button 컴포넌트 추가
const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

function App({ toggleTheme }: { toggleTheme: () => void }) {
  // props로 toggle function 받기
  return (
    <React.Fragment>
      <Wrapper>
        <Title>Hello</Title>
        <Button onClick={toggleTheme}>Toggle Theme</Button>{" "}
        {/* 버튼 클릭시 테마 변경 */}
      </Wrapper>
    </React.Fragment>
  );
}

export default App;
