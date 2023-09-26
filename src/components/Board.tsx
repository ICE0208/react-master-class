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
        {(magic) => (
          <div
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
          </div>
        )}
      </Droppable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px 14px;
  padding-top: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
`;

const Title = styled.h1`
  text-align: center;
  padding: 6px;
  padding-bottom: 10px;
  font-weight: boldx;
  font-size: 24px;
`;

export default Board;
