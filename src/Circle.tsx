import styled from "styled-components";

// Container props의 인터페이스
interface ContainerProps {
  bgColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
`;

// Circle props의 인터페이스
interface CircleProps {
  bgColor: string;
}

// == function Circle(props: CircleProps) {
function Circle({ bgColor }: CircleProps) {
  return <Container bgColor={bgColor} />;
}

export default Circle;
