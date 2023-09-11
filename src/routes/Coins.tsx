import styled from "styled-components";

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
`;

function Coins() {
  return <Title>Coin</Title>;
}

export default Coins;
