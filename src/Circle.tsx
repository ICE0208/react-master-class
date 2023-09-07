import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 53px solid ${(props) => props.borderColor};
  box-sizing: border-box;
`;

interface CircleProps {
  bgColor: string;
  // Optional Props
  borderColor?: string;
}

function Circle({ bgColor, borderColor }: CircleProps) {
  return (
    <Container
      bgColor={bgColor}
      // Null 병합 연산자
      borderColor={borderColor ?? bgColor}
    />
  );
}

// OR

// function Circle({ bgColor, borderColor = "black" }: CircleProps) {
//   return (
//     <Container
//       bgColor={bgColor}
//       borderColor={borderColor}
//     />
//   );
// }

export default Circle;
