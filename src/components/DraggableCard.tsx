import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
  toDo: string;
  index: number;
  draggableId: string;
}

const DraggableCard = ({ toDo, index, draggableId }: IDraggableCardProps) => {
  return (
    <Draggable
      key={toDo}
      draggableId={draggableId}
      index={index}
    >
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
};

const Card = styled.div`
  border-radius: 5px;
  padding: 14px 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.cardColor};
  font-size: 18px;
`;

// prop이 변하지 않았다면 리렌더링 금지
export default React.memo(DraggableCard);
