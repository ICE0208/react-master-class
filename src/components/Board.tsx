import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            $isDraggingOver={info.isDraggingOver}
            $draggingFromThisWith={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => {
              const key = `${boardId.replace(/\|/g, "")}|${toDo.replace(
                /\|/g,
                ""
              )}|${index}`;

              return (
                // key와 draggableId는 같아야 한다.
                <DraggableCard
                  key={key}
                  draggableId={key}
                  index={index}
                  toDo={toDo}
                />
              );
            })}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 14px;
  padding-top: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
`;

interface IAreaProps {
  $isDraggingOver: boolean;
  $draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.$isDraggingOver
      ? "pink"
      : props.$draggingFromThisWith
      ? "red"
      : "blue"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

const Title = styled.h1`
  text-align: center;
  padding: 6px;
  padding-bottom: 10px;
  font-weight: boldx;
  font-size: 24px;
`;

export default Board;
