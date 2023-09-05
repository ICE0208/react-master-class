import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;
const Box = styled.div`
  background-color: ${(props) => props.bg};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50%;
`;

function App() {
  return (
    <Father>
      <Box bg="teal" />
      <Box bg="tomato" />
      <Circle bg="#b8b8b8" />
    </Father>
  );
}

export default App;
