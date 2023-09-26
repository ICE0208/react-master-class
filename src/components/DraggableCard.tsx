import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo } from "../atoms";

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const DraggableCard = ({ toDoId, toDoText, index }: IDraggableCardProps) => {
  return (
    <Draggable
      key={toDoId}
      draggableId={String(toDoId)}
      index={index}
    >
      {(magic, snapshot) => (
        <Card
          $isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
};

const Card = styled.div<{ $isDragging: boolean }>`
  border-radius: 5px;
  padding: 14px 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.$isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 10px rgba(0, 0, 0, 0.5)" : "none"};
  font-size: 18px;
`;

// prop이 변하지 않았다면 리렌더링 금지
export default React.memo(DraggableCard);
