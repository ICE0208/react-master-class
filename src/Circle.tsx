import { useState } from "react";
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
  // useState에 기본값을 주면 자동으로 타입을 추론해준다. (제네릭을 안썼을 때)
  const [counter, setCounter] = useState<number | string>(1);
  setCounter(2); // number
  setCounter("hello"); // string
  // setCounter(true) <-- Error
  return (
    <Container
      bgColor={bgColor}
      // Null 병합 연산자
      borderColor={borderColor ?? bgColor}
    />
  );
}

export default Circle;
