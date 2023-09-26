import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import styled from "styled-components";

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(magic) => (
        <Wrapper
          ref={magic.innerRef}
          {...magic.droppableProps}
        >
          {toDos.map((toDo, index) => (
            // key와 draggableId는 같아야 한다.
            <DraggableCard
              key={`${boardId}|${toDo}`}
              draggableId={`${boardId}|${toDo}`}
              index={index}
              toDo={toDo}
            />
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
};

const Wrapper = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 200px;
`;

export default Board;
